# Farm.js Better Auth Starter

A standalone authentication starter built with Farm.js, Better Auth, React, and SQLite.

Current starter baseline: Farm.js `0.1.0-beta.3` and Better Auth `1.6.25`.

## Included

- email and password sign-up and sign-in
- Better Auth session cookies
- a server-middleware-protected `/dashboard`
- local SQLite persistence and automatic Better Auth migrations
- pending, error, unauthorized, loading, and not-found states
- responsive starter UI
- exact Farm.js beta dependencies for reproducible installs

## Quick start

```bash
git clone https://github.com/YOUR_GITHUB_USERNAME/farmjs-better-auth-starter.git
cd farmjs-better-auth-starter
cp .env.example .env.local
```

Generate a secret and place it in `BETTER_AUTH_SECRET`:

```bash
openssl rand -base64 32
```

Then install and start the app:

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000), create an account, and continue to the protected dashboard.

## How it is wired

- [`src/lib/auth.ts`](./src/lib/auth.ts) creates the Better Auth instance and runs local migrations.
- [`farm.config.ts`](./farm.config.ts) mounts that instance through `@farm.js/better-auth`.
- [`src/lib/auth-client.ts`](./src/lib/auth-client.ts) exposes the browser client.
- [`src/lib/session.ts`](./src/lib/session.ts) resolves the current request session on the server.
- [`src/app/dashboard/middleware.ts`](./src/app/dashboard/middleware.ts) redirects unauthenticated requests before the dashboard route runs.
- [`src/app/dashboard/page.tsx`](./src/app/dashboard/page.tsx) reads the already-authorized session and renders the account UI.

Farm owns the catch-all integration route, so the starter does not need a manual API route:

```text
/api/auth/[...auth]
```

## Environment

| Variable | Purpose |
| --- | --- |
| `BETTER_AUTH_URL` | Public origin used by Better Auth |
| `BETTER_AUTH_SECRET` | Secret used to sign and encrypt auth data |
| `BETTER_AUTH_DATABASE_PATH` | Local SQLite database location |

Never commit `.env.local` or the SQLite database.

## Deployment note

SQLite is ideal for local development and a single persistent Node server. Most serverless platforms use ephemeral filesystems, so replace `better-sqlite3` with a persistent Better Auth database adapter before deploying there.

The Farm deployment target is configured in [`farm.config.ts`](./farm.config.ts). Update it for your hosting environment after choosing persistent storage.

## Commands

```bash
pnpm dev         # start the development server
pnpm type-check  # run TypeScript checks
pnpm build       # create the production build
pnpm check       # type-check and build
```

## License

MIT
