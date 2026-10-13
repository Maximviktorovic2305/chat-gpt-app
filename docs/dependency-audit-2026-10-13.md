# Dependency update — 2026-10-13

Compatible production dependencies and security overrides have been updated and lockfiles regenerated. Node 24.21.0 and the declared npm 12.0.1 were used for reproducible `npm ci` verification.

Server lint, type checks, tests, full dependency audit and production build pass. Client lint, type checks, FSD checks and production build pass. Both production dependency audits (`npm audit --omit=dev --audit-level=low`) report zero vulnerabilities.

The full client audit remains blocked by [GHSA-vfj7-8cjw-p6xm](https://github.com/advisories/GHSA-vfj7-8cjw-p6xm), a stack-exhaustion issue in `braces` used by development globbing/lint tools. There is no patched upstream release at the time of verification. The audit reports seven high-severity entries including dependent tools. Do not accept untrusted glob patterns as tooling input.

CI continues to audit development dependencies and will reject a release until upstream tooling provides a fix. Its security gate has not been relaxed. Re-run the full audit when a patched dependency becomes available.
