"""The solvers build refuses a compiler that is not the one the repository pins.

`solvers/rust-toolchain.toml` pins the compiler because the `.wasm` bytes are
the compiler's. It was not enough: `rustup` lets `RUSTUP_TOOLCHAIN` win over
that file, and `mise` exports it as `stable`, so `--check` rebuilt with 1.100.0,
disagreed with the committed bundle and printed *"commit what it writes"* — the
one instruction that would replace the repository's bytes with another
compiler's. A gate that is wrong about *why* it failed is worse than a gate that
fails.

The fix is twofold and both halves are pinned here: the script exports the
pinned channel for the build (so an environment variable cannot win), and it
stops before compiling when the compiler that answers is not that channel (so a
toolchain that is missing, or a `rustc` that ignores the pin, is named rather
than compiled with).

These tests never need Rust: they put a fake `rustc` and a failing `cargo` on
`PATH`, which is enough to reach every branch of the guard.
"""

from __future__ import annotations

import os
import re
import stat
import subprocess

from textbook.book import repo_root

SCRIPT = repo_root() / "scripts" / "build-solvers.sh"
TOOLCHAIN = repo_root() / "solvers" / "rust-toolchain.toml"


def pinned_channel() -> str:
    """The channel in the file the script reads, so the test cannot drift from it."""
    match = re.search(r'^channel\s*=\s*"([^"]+)"', TOOLCHAIN.read_text(encoding="utf-8"), re.M)
    assert match, "solvers/rust-toolchain.toml no longer pins a channel"
    return match.group(1)


def fake_toolchain(tmp_path, rustc_version: str, cargo_exit: int = 1):
    """A `rustc` that reports `rustc_version`, and a `cargo` that stops the build."""
    bin_dir = tmp_path / "bin"
    bin_dir.mkdir()
    rustc = bin_dir / "rustc"
    rustc.write_text(f"#!/bin/sh\necho 'rustc {rustc_version} (deadbeef 2026-01-01)'\n")
    cargo = bin_dir / "cargo"
    cargo.write_text("#!/bin/sh\nexit 1\n" if cargo_exit else "#!/bin/sh\nexit 0\n")
    for tool in (rustc, cargo):
        tool.chmod(tool.stat().st_mode | stat.S_IXUSR)
    return bin_dir


def run_script(tmp_path, bin_dir, *args, rustup_toolchain="stable"):
    """Run the script with the fake tools first on `PATH`.

    `RUSTUP_TOOLCHAIN=stable` is what `mise` exports, and it is the condition that
    produced the wrong build, so it is the condition the tests run under.
    """
    env = {
        **os.environ,
        "PATH": f"{bin_dir}:{os.environ['PATH']}",
        "RUSTUP_TOOLCHAIN": rustup_toolchain,
    }
    return subprocess.run(
        [str(SCRIPT), *args], capture_output=True, text=True, check=False, env=env
    )


def test_a_compiler_that_is_not_the_pin_is_named_and_refused(tmp_path):
    """The defect: the gate said "commit what it writes" when the compiler was wrong."""
    pinned = pinned_channel()
    result = run_script(tmp_path, fake_toolchain(tmp_path, "1.100.0"), "--check")

    assert result.returncode != 0, (
        "the script built with the wrong compiler and exited 0\n" + result.stdout
    )
    opened = result.stdout + result.stderr
    assert "not the one this repository pins" in opened, opened
    assert "1.100.0" in opened, f"the compiler actually used is not named: {opened}"
    assert pinned in opened, f"the pin is not named: {opened}"
    assert f"rustup toolchain install {pinned}" in opened, (
        "the message does not say how to get the compiler the repository pins"
    )
    assert "commit what it writes" not in opened, (
        "the refusal still advises committing bytes from another compiler"
    )


def test_a_build_that_cannot_run_is_not_reported_as_a_mismatch(tmp_path):
    """A missing toolchain is a different failure from a wrong one.

    The message has to distinguish them: "install the pin" and "your toolchain is
    being overridden" are different fixes.
    """
    bin_dir = tmp_path / "bin"
    bin_dir.mkdir()
    rustc = bin_dir / "rustc"
    rustc.write_text("#!/bin/sh\necho 'error: toolchain is not installed' >&2\nexit 1\n")
    rustc.chmod(rustc.stat().st_mode | stat.S_IXUSR)

    result = run_script(tmp_path, bin_dir, "--check")
    opened = result.stdout + result.stderr
    assert result.returncode != 0, opened
    assert "pinned toolchain is not usable here" in opened, opened
    assert f"rustup toolchain install {pinned_channel()}" in opened, opened


def test_the_pin_is_exported_so_the_environment_cannot_win(tmp_path):
    """With the pinned channel answering, the guard passes and the build is attempted.

    The fake `cargo` then fails, which is how the test sees the script get past the
    guard without a real compiler: the failure is cargo's, not the guard's.
    """
    pinned = pinned_channel()
    result = run_script(tmp_path, fake_toolchain(tmp_path, pinned), "--check")
    opened = result.stdout + result.stderr

    assert "not the one this repository pins" not in opened, opened
    assert "not usable here" not in opened, opened
    assert result.returncode != 0, (
        "the fake cargo is supposed to stop the build, so a 0 exit means the guard "
        "did not reach it\n" + opened
    )


def test_verify_needs_no_rust_at_all(tmp_path):
    """The offline path is the deploy's and the local gate's, and it must stay Rust-free."""
    empty = tmp_path / "empty"
    empty.mkdir()
    env = {**os.environ, "PATH": f"{empty}:/usr/bin:/bin"}
    result = subprocess.run(
        [str(SCRIPT), "--verify"], capture_output=True, text=True, check=False, env=env
    )
    assert result.returncode == 0, result.stdout + result.stderr
    assert "verified from SHA256SUMS, offline" in result.stdout


def test_help_prints_the_header_and_no_shell():
    """`--help` printed `set -euo pipefail` and the ROOT assignment.

    It read a fixed line range, so the usage text grew into the code. It now stops at
    the first line that is not a comment.
    """
    result = subprocess.run(
        [str(SCRIPT), "--help"], capture_output=True, text=True, check=False
    )
    assert result.returncode == 0, result.stderr
    assert "Build, check or verify" in result.stdout
    for line in ("set -euo pipefail", "ROOT=", "usage()"):
        assert line not in result.stdout, f"--help printed the script's code: {line}"
