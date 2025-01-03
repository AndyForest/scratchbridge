# ScratchBridge
A system that helps Scratchers utilize AI to bring their ideas to life by converting JavaScript code to and from into Scratch projects.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Database**: [Postgres](https://www.postgresql.org/)
- **ORM**: [Drizzle](https://orm.drizzle.team/)
- LangFuse for observability and analytics
- Vercel AI SDK

## Getting Started

Install [Docker Desktop](https://www.docker.com/products/docker-desktop/)

```bash
pnpm install
```

Optional upgrade modules
```bash
pnpm upgrade
```

## Running Locally

Use the included setup script to create your `.env` file with the Postgres server address:

```bash
pnpm db:setup
```

Then, run the database migrations and seed the database:

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:seed
```

Finally, run the Next.js development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the app in action.
