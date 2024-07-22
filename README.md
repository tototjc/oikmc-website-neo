# Oikmc Website (Neo)

## Environment Variables

Add the following values to the environment variables:

| Value                       | Description                        |
| :-------------------------- | :--------------------------------- |
| `AUTH_SECRET`               | Secret for authentication          |
| `AUTH_BLESSING_SKIN_ID`     | Blessing Skin Oauth2 Client ID     |
| `AUTH_BLESSING_SKIN_SECRET` | Blessing Skin Oauth2 Client Secret |
| `DATABASE_URL`              | PostgreSQL URL                     |
| `SENTRY_AUTH_TOKEN`         | Sentry auth token                  |

## Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                       |
| :------------------------ | :------------------------------------------- |
| `pnpm install`            | Installs dependencies                        |
| `pnpm prisma migrate dev` | Migrates the database to the latest version  |
| `pnpm prisma generate`    | Generates Prisma client code                 |
| `pnpm dev`                | Starts local dev server at `localhost:4321`  |
| `pnpm build`              | Build the production site to `./dist/`       |
| `pnpm preview`            | Preview your build locally, before deploying |
| `pnpm check`              | Check the `.astro` file and Typescript       |
| `pnpm lint`               | Lint the code using ESLint                   |
| `pnpm prepare`            | Prepares the project for commit              |
