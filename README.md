# Monorepo Project with Turborepo, pnpm, and TypeScript

This monorepo is built using **Turborepo** and **pnpm** workspaces to manage multiple packages and applications efficiently, all written in **TypeScript**.

## 🧰 Technologies

- [TypeScript](https://www.typescriptlang.org/)
- [pnpm](https://pnpm.io/) – Fast, disk space efficient package manager
- [Turborepo](https://turbo.build/repo) – High-performance build system for monorepos
- [Prisma ORM + PostgreSQL](https://www.prisma.io/) – Database ORM and relational database
- [Fastify](https://www.fastify.io/) – Fast and low overhead web framework
- [dotenv](https://github.com/motdotla/dotenv) – Loads environment variables from `.env` file
- [ts-node-dev](https://github.com/wclr/ts-node-dev) – TypeScript execution with automatic restarts for development

## 📁 Monorepo Structure

├── apps/
│ └── api/ # REST API (Fastify)
├── packages/
│ ├── db/ # Database connection/operation and Prisma setup
│ └── fastify-auth-jwt/ # JWT Auth plugin for Fastify
├── turbo.json # Turborepo configuration
├── pnpm-workspace.yaml # pnpm workspace configuration
└── tsconfig.json # Base TypeScript config for all packages

### Workspaces

This project is organized into two main workspaces:

- `apps/*`: Applications (e.g., `api`)
- `packages/*`: Shared packages used across applications

### Packages Overview

#### `apps/api`

REST API built with Fastify that provides CRUD endpoints for `Users` and `Posts` entities.

#### `packages/db`

Encapsulates Prisma database connection and client setup. Provides out-of-the-box integration for database operations.

#### `packages/fastify-auth-jwt`

Fastify plugin for JWT-based authentication. Can be plugged into any Fastify server to provide authentication functionality out-of-the-box.

### 🔗 Package Dependencies

The `apps/api` app depends on:

- `packages/db`: To connect and operate on the Prisma database
- `packages/fastify-auth-jwt`: To handle JWT authentication

## 🚀 Getting Started

Ensure environment variables are configured correctly in the `.env` file in `/apps/api` path before starting:

- `DATABASE_URL` The `packages/db` depends on this env variable to establish connection with the database
- `JWT_SECRET` The `packages/fastify-auth-jwt` depends on this env variable to configure JWT secret

### Development

```bash
pnpm install
pnpm dev
```

### Production

```bash
pnpm install
cd apps/api && pnpm start
```
