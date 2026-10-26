//! Build the `ot-solve` wasm bundle.
//!
//! One kernel is one wasm module. For each kernel in the registry this tool:
//!
//! 1. asks Cargo for a release build with that kernel's feature;
//! 2. runs the kernel natively over its selftest cases;
//! 3. writes `kernel.wasm`, `kernel.js` (the manifest and the wasm as base64),
//!    `manifest.json` and `selftest.json`;
//! 4. writes the bundle manifest, the README and one `SHA256SUMS`.
//!
//! The output is deterministic: sorted files, no timestamps, and the only version
//! strings are the crate version and the compiler the build actually used.

use std::env;
use std::fs;
use std::path::{Path, PathBuf};
use std::process::{Command, Stdio};

use ot_solve::abi::{self, Arena, Block, Kernel, Status};
use ot_solve::kernels;

fn main() {
    let out = match arguments() {
        Ok(out) => out,
        Err(message) => {
            eprintln!("ot-solve-build: {message}");
            std::process::exit(2);
        }
    };
    if let Err(message) = build(&out) {
        eprintln!("ot-solve-build: {message}");
        std::process::exit(1);
    }
}

fn arguments() -> Result<PathBuf, String> {
    let mut args = env::args().skip(1);
    let mut out: Option<PathBuf> = None;
    while let Some(arg) = args.next() {
        match arg.as_str() {
            "--out" => {
                let value = args.next().ok_or("--out needs a directory")?;
                out = Some(PathBuf::from(value));
            }
            "-h" | "--help" => {
                println!("usage: ot-solve-build [--out <dir>]");
                std::process::exit(0);
            }
            other => return Err(format!("unknown argument '{other}'")),
        }
    }
    Ok(out.unwrap_or_else(|| repo().join("assets/data/solvers")))
}

fn workspace() -> PathBuf {
    PathBuf::from(env!("CARGO_MANIFEST_DIR"))
        .parent()
        .expect("ot-solve-build lives inside the solvers workspace")
        .to_path_buf()
}

fn repo() -> PathBuf {
    workspace()
        .parent()
        .expect("solvers lives inside the repository")
        .to_path_buf()
}

/// One built kernel, for the bundle manifest.
struct Entry {
    id: &'static str,
    bytes: usize,
    gzip: usize,
    sha256: String,
}

fn build(out: &Path) -> Result<(), String> {
    let workspace = workspace();
    let wasm_path = workspace.join("target/wasm32-unknown-unknown/release/ot_solve.wasm");
    if out.exists() {
        fs::remove_dir_all(out)
            .map_err(|error| format!("cannot clear {}: {error}", out.display()))?;
    }
    fs::create_dir_all(out).map_err(|error| format!("cannot create {}: {error}", out.display()))?;

    let mut entries = Vec::new();
    for kernel in kernels::ALL {
        let id = kernel.meta.id;
        build_wasm(&workspace, id)?;
        let wasm = fs::read(&wasm_path)
            .map_err(|error| format!("cannot read {}: {error}", wasm_path.display()))?;
        let directory = out.join(id);
        fs::create_dir_all(&directory)
            .map_err(|error| format!("cannot create {}: {error}", directory.display()))?;

        let manifest = manifest_json(kernel);
        let selftest = selftest_json(kernel)?;
        let module = module_js(&manifest, &wasm);
        fs::write(directory.join("kernel.wasm"), &wasm)
            .map_err(|error| format!("cannot write kernel.wasm: {error}"))?;
        fs::write(directory.join("manifest.json"), &manifest)
            .map_err(|error| format!("cannot write manifest.json: {error}"))?;
        fs::write(directory.join("selftest.json"), &selftest)
            .map_err(|error| format!("cannot write selftest.json: {error}"))?;
        fs::write(directory.join("kernel.js"), module)
            .map_err(|error| format!("cannot write kernel.js: {error}"))?;

        let path = directory.join("kernel.wasm");
        entries.push(Entry {
            id,
            bytes: wasm.len(),
            gzip: gzip_size(&path)?,
            sha256: sha256_file(&path)?,
        });
        println!(
            "  {id:20} {:6} bytes  {:5} gzip",
            wasm.len(),
            entries.last().map(|e| e.gzip).unwrap_or(0)
        );
    }

    fs::write(out.join("bundle.json"), bundle_json(&entries))
        .map_err(|error| format!("cannot write bundle.json: {error}"))?;
    fs::write(out.join("README.md"), readme())
        .map_err(|error| format!("cannot write README.md: {error}"))?;
    write_sums(out)?;
    println!("wrote {}", out.display());
    Ok(())
}

fn build_wasm(workspace: &Path, id: &str) -> Result<(), String> {
    // The wasm build enables one kernel feature; the library API in the same crate
    // is unused here, and LTO drops it.
    let status = Command::new("cargo")
        .current_dir(workspace)
        .args([
            "build",
            "--locked",
            "--release",
            "--target",
            "wasm32-unknown-unknown",
            "-p",
            "ot-solve",
            "--no-default-features",
            "--features",
            id,
        ])
        .status()
        .map_err(|error| format!("cannot run cargo: {error}"))?;
    if !status.success() {
        return Err(format!("cargo build failed for {id}"));
    }
    Ok(())
}

fn block_name(block: Block) -> &'static str {
    match block {
        Block::Params => "params",
        Block::State => "state",
        Block::Out => "out",
        Block::Diag => "diag",
    }
}

fn manifest_json(kernel: &Kernel) -> String {
    let meta = &kernel.meta;
    let mut json = String::new();
    json.push_str(&format!(
        "{{\"abi\":{},\"exact\":{},\"id\":{},\"title\":{},\"summary\":{},",
        abi::ABI,
        meta.exact,
        quote(meta.id),
        quote(meta.title),
        quote(meta.summary)
    ));

    json.push_str("\"capacity\":{");
    for (index, (name, value)) in meta.capacity.iter().enumerate() {
        if index > 0 {
            json.push(',');
        }
        json.push_str(&format!("{}:{}", quote(name), value));
    }
    json.push_str("},");

    json.push_str(&format!(
        "\"layout\":{{\"slots\":{},\"hash\":{},\"blocks\":{{",
        meta.slots(),
        meta.layout_hash()
    ));
    for (index, (name, block)) in [
        ("params", Block::Params),
        ("state", Block::State),
        ("out", Block::Out),
        ("diag", Block::Diag),
    ]
    .iter()
    .enumerate()
    {
        if index > 0 {
            json.push(',');
        }
        json.push_str(&format!(
            "{}:{{\"offset\":{},\"size\":{}}}",
            quote(name),
            meta.offset(*block),
            meta.sizes[*block as usize]
        ));
    }
    json.push_str("}},");

    json.push_str("\"params\":[");
    for (index, param) in meta.params.iter().enumerate() {
        if index > 0 {
            json.push(',');
        }
        json.push_str(&format!(
            "{{\"name\":{},\"label\":{},\"default\":{},\"min\":{},\"max\":{},\"step\":{},\"unit\":{}}}",
            quote(param.name),
            quote(param.label),
            number(param.default),
            number(param.min),
            number(param.max),
            number(param.step),
            quote(param.unit)
        ));
    }
    json.push_str("],\"outputs\":[");
    for (index, output) in meta.outputs.iter().enumerate() {
        if index > 0 {
            json.push(',');
        }
        json.push_str(&format!(
            "{{\"name\":{},\"label\":{},\"block\":{},\"offset\":{},\"length\":{},\"unit\":{}}}",
            quote(output.name),
            quote(output.label),
            quote(block_name(output.block)),
            output.offset,
            output.length,
            quote(output.unit)
        ));
    }
    json.push_str("],\"selftest\":\"selftest.json\"}");
    json
}

fn selftest_json(kernel: &Kernel) -> Result<String, String> {
    let meta = &kernel.meta;
    let mut cases = String::new();
    for (index, case) in kernel.cases.iter().enumerate() {
        let mut buffer = vec![0.0; meta.slots()];
        let mut arena = Arena::from_slice(&mut buffer, meta);
        for (name, value) in case.params {
            let slot = meta
                .param_index(name)
                .ok_or_else(|| format!("{}: unknown param '{name}'", meta.id))?;
            arena.params_mut()[slot] = *value;
        }
        (case.setup)(&mut arena);
        let state = arena.state().to_vec();
        let mut status = (kernel.init)(&mut arena);
        if status == Status::Ok {
            status = abi::run(kernel, &mut arena, case.steps);
        }
        let params = case
            .params
            .iter()
            .map(|(name, value)| format!("{}:{}", quote(name), number(*value)))
            .collect::<Vec<_>>()
            .join(",");
        if index > 0 {
            cases.push(',');
        }
        cases.push_str(&format!(
            "{{\"name\":{},\"params\":{{{}}},\"state\":{},\"steps\":{},\"status\":{},\"out\":{},\"diag\":{}}}",
            quote(case.name),
            params,
            array(&state),
            case.steps,
            status.code(),
            array(arena.out()),
            array(arena.diag())
        ));
    }
    Ok(format!(
        "{{\"abi\":{},\"kernel\":{},\"cases\":[{}]}}",
        abi::ABI,
        quote(meta.id),
        cases
    ))
}

fn module_js(manifest: &str, wasm: &[u8]) -> String {
    format!(
        "// Generated by ot-solve-build from solvers/ot-solve. Do not edit.\n\
         // The wasm is inlined so the page makes one request and the module is a value.\n\
         import {{ define }} from \"../../../figures/kernel.js\";\n\
         export default await define({manifest}, \"{}\");\n",
        base64(wasm)
    )
}

fn bundle_json(entries: &[Entry]) -> String {
    let rustc = Command::new("rustc")
        .arg("--version")
        .output()
        .ok()
        .and_then(|output| String::from_utf8(output.stdout).ok())
        .map(|text| text.trim().to_string())
        .unwrap_or_else(|| "unknown".to_string());
    let mut kernels_json = String::new();
    for (index, entry) in entries.iter().enumerate() {
        if index > 0 {
            kernels_json.push(',');
        }
        kernels_json.push_str(&format!(
            "{{\"id\":{},\"bytes\":{},\"gzip\":{},\"sha256\":{}}}",
            quote(entry.id),
            entry.bytes,
            entry.gzip,
            quote(&entry.sha256)
        ));
    }
    format!(
        "{{\"abi\":{},\"generator\":{},\"rustc\":{},\"kernels\":[{}]}}",
        abi::ABI,
        quote(&format!("ot-solve {}", env!("CARGO_PKG_VERSION"))),
        quote(&rustc),
        kernels_json
    )
}

fn readme() -> &'static str {
    "# The `ot-solve` bundle\n\n\
Written by `scripts/build-solvers.sh` from `solvers/ot-solve`. Do not edit anything here:\n\
change the Rust, run the script, and commit what it writes.\n\n\
Every directory is one kernel, and every kernel is one wasm module:\n\n\
- `kernel.wasm` — the artifact the digest names, for provenance and for a non-JS consumer;\n\
- `kernel.js` — the module a figure imports; the wasm is inlined as base64;\n\
- `manifest.json` — parameters, outputs, layout and capacity, generated from the Rust;\n\
- `selftest.json` — inputs and expected outputs from the native run, replayed in Node.\n\n\
`bundle.json` records the compiler, the ABI and each kernel's digest. `SHA256SUMS` covers\n\
every file; `sha256sum -c SHA256SUMS` verifies the tree without a Rust toolchain.\n"
}

fn write_sums(out: &Path) -> Result<(), String> {
    let mut files = Vec::new();
    collect(out, out, &mut files)?;
    files.sort();
    let mut sums = String::new();
    for file in files {
        if file == Path::new("SHA256SUMS") {
            continue;
        }
        let hash = sha256_file(&out.join(&file))?;
        sums.push_str(&format!("{hash}  {}\n", file.display()));
    }
    fs::write(out.join("SHA256SUMS"), sums)
        .map_err(|error| format!("cannot write SHA256SUMS: {error}"))
}

fn collect(root: &Path, directory: &Path, files: &mut Vec<PathBuf>) -> Result<(), String> {
    let entries = fs::read_dir(directory)
        .map_err(|error| format!("cannot read {}: {error}", directory.display()))?;
    for entry in entries {
        let entry = entry.map_err(|error| format!("cannot read a directory entry: {error}"))?;
        let path = entry.path();
        if path.is_dir() {
            collect(root, &path, files)?;
        } else if let Ok(relative) = path.strip_prefix(root) {
            files.push(relative.to_path_buf());
        }
    }
    Ok(())
}

fn sha256_file(path: &Path) -> Result<String, String> {
    let output = Command::new("sha256sum")
        .arg(path)
        .output()
        .map_err(|error| format!("cannot run sha256sum: {error}"))?;
    if !output.status.success() {
        return Err(format!("sha256sum failed for {}", path.display()));
    }
    let text =
        String::from_utf8(output.stdout).map_err(|error| format!("sha256sum output: {error}"))?;
    text.split_whitespace()
        .next()
        .map(|hash| hash.to_string())
        .ok_or_else(|| format!("sha256sum printed nothing for {}", path.display()))
}

fn gzip_size(path: &Path) -> Result<usize, String> {
    let output = Command::new("gzip")
        .args(["-9", "-c"])
        .arg(path)
        .stdin(Stdio::null())
        .output()
        .map_err(|error| format!("cannot run gzip: {error}"))?;
    if !output.status.success() {
        return Err(format!("gzip failed for {}", path.display()));
    }
    Ok(output.stdout.len())
}

fn number(value: f64) -> String {
    if value.is_nan() || value.is_infinite() {
        "null".to_string()
    } else {
        format!("{value}")
    }
}

fn array(values: &[f64]) -> String {
    let mut text = String::from("[");
    for (index, value) in values.iter().enumerate() {
        if index > 0 {
            text.push(',');
        }
        text.push_str(&number(*value));
    }
    text.push(']');
    text
}

fn quote(value: &str) -> String {
    let mut text = String::from("\"");
    for character in value.chars() {
        match character {
            '"' => text.push_str("\\\""),
            '\\' => text.push_str("\\\\"),
            '\n' => text.push_str("\\n"),
            '\r' => text.push_str("\\r"),
            '\t' => text.push_str("\\t"),
            character if (character as u32) < 0x20 => {
                text.push_str(&format!("\\u{:04x}", character as u32));
            }
            character => text.push(character),
        }
    }
    text.push('"');
    text
}

fn base64(bytes: &[u8]) -> String {
    const TABLE: &[u8; 64] = b"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    let mut text = String::with_capacity(bytes.len().div_ceil(3) * 4);
    for chunk in bytes.chunks(3) {
        let first = chunk[0];
        let second = *chunk.get(1).unwrap_or(&0);
        let third = *chunk.get(2).unwrap_or(&0);
        text.push(TABLE[(first >> 2) as usize] as char);
        text.push(TABLE[(((first & 0x03) << 4) | (second >> 4)) as usize] as char);
        if chunk.len() > 1 {
            text.push(TABLE[(((second & 0x0f) << 2) | (third >> 6)) as usize] as char);
        } else {
            text.push('=');
        }
        if chunk.len() > 2 {
            text.push(TABLE[(third & 0x3f) as usize] as char);
        } else {
            text.push('=');
        }
    }
    text
}
