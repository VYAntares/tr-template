# template-app

A monorepo template for a web application: a Next.js frontend and a NestJS API
served from a single TLS origin, with Postgres, Redis, a shared contract
package, and the full build/test/CI pipeline already wired up.

This repository is a **starting point, not a product**. It ships a home page
that performs an API handshake and two placeholder legal pages, and nothing
else. Everything in it is infrastructure you would otherwise spend a week
assembling.

## What is in the box

| Piece                    | Choice                                                          |
| ------------------------ | --------------------------------------------------------------- |
| `apps/web`               | Next.js 16, React 19, Tailwind 4. Presentation and SSR only.    |
| `apps/api`               | NestJS 11. All business logic and data access.                  |
| `packages/shared`        | Zod schemas shared by both runtimes: one rule, two consumers.   |
| `packages/ui`            | React components shared across frontends.                       |
| `packages/tsconfig`      | Base TypeScript configs.                                        |
| `packages/eslint-config` | Flat ESLint configs per runtime.                                |
| `infra/caddy`            | Reverse proxy, TLS, security headers, one origin for both apps. |
| `e2e`                    | Playwright against the production stack, console gate included. |

Postgres and Redis run as compose services. The API reaches them by service
name; neither is published outside the docker network.

## Requirements

Docker with the compose plugin, and `make`. Everything else — Node, pnpm, the
toolchain — runs inside containers. To work natively as well, see
[docs/VERSIONS.md](docs/VERSIONS.md) for the pinned versions and run
`make doctor` to check your machine.

## Getting started

```sh
make run     # build, start, migrate, export the local root CA
```

Then open <https://localhost>. The certificate is minted by Caddy's own local
CA; `make certs` prints how to trust it in each browser.

```sh
make         # every CI check, then the app, then Playwright against it
make dev     # hot-reload development stack
make test    # unit tests across the workspace
make down    # stop the stack, keep the volumes
make help    # every target
```

`make` is the one command to run before pushing: green there means green CI.

## Making it yours

The rename is deliberately mechanical. In order:

1. **Names.** Replace `template-app` / `template_app` throughout: the compose
   project name in `compose.yml`, `POSTGRES_DB` and `DATABASE_URL` in
   `.env.example`, the package `name` fields, and the `@ft/*` workspace scope in
   `pnpm-workspace.yaml` and every `package.json`.
2. **The database.** `apps/api/prisma/schema.prisma` ships one placeholder
   `Example` model so the migration pipeline has something to run. Replace it
   with your own, delete `apps/api/prisma/migrations/`, and generate a fresh
   initial migration with `make migrate`.
3. **The home page.** `apps/web/app/page.tsx` describes the template. Say what
   your application does instead.
4. **The legal pages.** `apps/web/lib/legal-content.ts` is placeholder text
   describing a service that stores almost nothing. It is a realistic skeleton,
   not a policy for your product — rewrite it, and set real contact addresses,
   before anything goes public.
5. **Ownership.** `.github/CODEOWNERS` lists one owner. Add collaborators there,
   and see the note in that file before enabling "Require review from Code
   Owners".

## Publishing container images

`.github/workflows/images.yml` builds and vulnerability-scans the production
images for amd64 and arm64 on every push. **Publishing them to GHCR is off by
default**, because a fresh repository cannot create a package until it is told
to. Both steps are required to turn it on:

1. **Settings → Actions → General → Workflow permissions** → select
   _Read and write permissions_. A repository left on the read-only default
   strips `packages: write` from `GITHUB_TOKEN` regardless of what the workflow
   asks for, and the first push fails with
   `denied: permission_denied: read_package`.
2. **Settings → Secrets and variables → Actions → Variables** → add a repository
   variable `PUBLISH_IMAGES` set to `true`.

The first successful push creates the package as private and links it to the
repository; make it public from the package's own settings page if you want
anonymous pulls. Note that the arm64 job runs on `ubuntu-24.04-arm`, which is
free on public repositories but needs a paid plan on a private one.

## Layout

```
apps/web        Next.js: pages, components, SSR
apps/api        NestJS: controllers, services, Prisma
packages/       shared code: contracts, UI, tsconfig, eslint config
infra/caddy     reverse proxy configuration
e2e/            Playwright suite, run against the production stack
docs/           architecture notes and pinned versions
scripts/        environment and hygiene checks used by make and CI
```

## Conventions

- **The API owns the domain.** `apps/web` renders and calls the API; it never
  touches the database. `apps/api` never renders HTML.
- **Contracts live in `packages/shared`.** A payload that crosses the network is
  declared once as a Zod schema, and both sides derive their types from it.
- **One origin.** Caddy routes `/api/*` to NestJS and everything else to Next,
  so there is no CORS and cookies stay first-party.
- **Commits follow Conventional Commits**, enforced by `.github/commitlint.config.mjs`.

## License

UNLICENSED. Use it as the base for your own project.
