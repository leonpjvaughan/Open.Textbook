# A GitHub Actions runner for this repository, on this machine.
#
# **Why a container.** The gate needs a browser: `scripts/preview-themes.sh` measures
# every figure in both schemes at two viewports. A runner whose Chrome comes from
# whatever the host happens to have is a runner that works on one machine, so the
# browser is in the image and nothing else about the host matters.
#
# Everything the workflow installs for itself is left to the workflow — Node through
# `actions/setup-node`, uv through `astral-sh/setup-uv`, the Playwright client through
# npm — because a second copy here would be a second version to keep in step. What is
# here is only what those steps cannot provide.
#
# **Pinned by version and checksum**, like every action in the workflow. The checksum is
# verified before the tarball is unpacked, so a changed download fails the build rather
# than producing a runner nobody inspected.

FROM ubuntu:24.04

ARG RUNNER_VERSION=2.338.0
ARG RUNNER_SHA256=af4b794c1bc41d73d40535e3fe092a39f9679cd8d965954c2aca25a05ca41d32

ENV DEBIAN_FRONTEND=noninteractive

RUN apt-get update && apt-get install -y --no-install-recommends \
      ca-certificates curl git gnupg jq tar unzip xz-utils \
      libicu74 libssl3 zlib1g libatomic1 \
      # The fonts matter: a headless browser with no fonts measures text at the wrong
      # size, and the whole point of the preview job is that it measures the size.
      fonts-liberation fonts-dejavu-core fontconfig \
    && rm -rf /var/lib/apt/lists/*

# Chrome, from Google's own repository. The harness defaults to `channel: "chrome"`, and
# the workflow asserts `google-chrome --version`, so a Chromium build would not do.
RUN install -d -m 0755 /etc/apt/keyrings \
    && curl -fsSL https://dl.google.com/linux/linux_signing_key.pub \
       | gpg --dearmor -o /etc/apt/keyrings/google-chrome.gpg \
    && printf '%s\n' \
       'deb [arch=amd64 signed-by=/etc/apt/keyrings/google-chrome.gpg] https://dl.google.com/linux/chrome/deb/ stable main' \
       > /etc/apt/sources.list.d/google-chrome.list \
    && apt-get update \
    && apt-get install -y --no-install-recommends google-chrome-stable \
    && rm -rf /var/lib/apt/lists/*

# The runner itself.
RUN curl -fsSL -o /tmp/runner.tar.gz \
      "https://github.com/actions/runner/releases/download/v${RUNNER_VERSION}/actions-runner-linux-x64-${RUNNER_VERSION}.tar.gz" \
    && echo "${RUNNER_SHA256}  /tmp/runner.tar.gz" | sha256sum -c - \
    && mkdir -p /home/runner \
    && tar xzf /tmp/runner.tar.gz -C /home/runner \
    && rm /tmp/runner.tar.gz \
    && /home/runner/bin/installdependencies.sh \
    && useradd --uid 1001 --home-dir /home/runner --shell /bin/bash --no-create-home runner \
    && chown -R runner:runner /home/runner

COPY --chmod=0755 entrypoint.sh /entrypoint.sh

USER runner
WORKDIR /home/runner
ENTRYPOINT ["/entrypoint.sh"]
