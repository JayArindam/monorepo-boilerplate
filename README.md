# Production-Ready Monorepo Boilerplate

**Skip the "Boring 40 Hours" of configuration. Ship feature code on Day 1.**

This is an opinionated, high-velocity monorepo scaffold designed for teams who need to go from zero to a production-grade TypeScript environment in minutes. Built on **Nx**, it wires together a modern stack with strict quality gates, containerized local infrastructure, and automated CI/CD patterns—all following industry best practices for maintainability and scale.

## The Problem

Setting up a production-ready monorepo usually involves a week of "config hell":

- Fighting with **Nx workspace migrations** and shared library linking.
- Aligning **ESLint, Prettier, and TypeScript** across disparate apps.
- Configuring **Husky and Commitlint** for consistent team standards.
- Hand-rolling **Docker** files and **Cloud Build** triggers for deployment.

**This boilerplate does that work for you.**

## Core Technical Benefits

### 🚀 Immediate Developer Velocity

Leverage Nx's computation caching and task orchestration. Whether you have 2 apps or 20, adding shared logic or new services is a standard, seconds-long process.

### 🛡️ Hardened Quality Gates

Pre-configured **Husky** hooks, **Commitlint**, and **Strict ESLint** rules ensure that your repository stays clean. Low-quality code never hits your remote.

### 🐳 "Cloned-to-Coding" in < 2 Minutes

With a single `docker-compose` command, you have a local PostgreSQL instance and the entire environment ready. No more "it works on my machine" debugging.

### ☁️ Cloud-Native Foundation

Pre-wired with **Google Cloud Build** configurations and multi-stage **Docker** builds, taking you from local development to a deployed environment without rewriting infra.

---

## Technical Stack

- **Monorepo Manager:** [Nx](https://nx.dev/) (Task orchestration, caching, workspace-wide graph)
- **Backend:** [NestJS](https://nestjs.com/) (Modular architecture, TypeScript-first)
- **Frontend:** [React](https://reactjs.org/) + [Vite](https://vitejs.dev/) (Lightning-fast HMR and bundling)
- **Tooling:** ESLint (Flat Config), Prettier, Husky, Commitlint
- **Infrastructure:** Docker, Docker Compose, PostgreSQL
- **CI/CD:** Google Cloud Build

---

## Quick Start

### 1. Initialize the Workspace

```bash
npm install
```

### 2. Launch Infrastructure

Starts the PostgreSQL database and any required local services.

```bash
docker-compose up -d
```

### 3. Spin Up the Full Stack

Runs the Backend, Frontend, and Dashboard in parallel with hot reloading.

```bash
npx nx run-many -t serve
```

---

## Repository Structure

```text
├── apps/
│   ├── backend/      # NestJS API
│   ├── dashboard/    # React/Vite Admin UI
│   └── frontend/     # React/Vite Client UI
├── packages/
│   ├── config/       # Shared ESLint, TS, and Vite configs
│   ├── types/        # Shared API and Data schemas
│   └── utils/        # Shared logic and helpers
└── .cloudbuild/      # Deployment triggers for GCP
```

## Contributing & Development

For detailed information on adding new applications, managing shared packages, or customizing the CI/CD pipeline, please refer to the [Project Setup Guide](docs/project_setup.md).
