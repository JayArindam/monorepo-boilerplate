# Monorepo Boilerplate

A production-ready monorepo scaffold to help you skip the boring setup and get straight to building. This boilerplate wires together a modern TypeScript stack with sensible defaults for tooling, code quality, and local infrastructure — so your team can onboard fast and stay consistent from day one.

## What Is This?

This is an opinionated but flexible monorepo foundation built on **Nx**, designed to house multiple apps and shared packages under one roof. It comes pre-configured with everything a real project needs before the first line of feature code gets written.

## Who Is This For?

This boilerplate is a good fit if you are:

- A **solo developer or small team** starting a new full-stack TypeScript project
- Someone who wants a **monorepo structure** (backend + frontend + dashboard) without spending days configuring tooling
- A developer who cares about **code quality from the start** — consistent formatting, conventional commits, and linting baked in
- Someone deploying to **Google Cloud** or using **Docker** for local development
- Tired of copy-pasting the same Nx + ESLint + Prettier + Husky setup across projects

## Purpose

The goal of this boilerplate is to give you a **professional starting point**, not a toy example. Every config file here reflects decisions made for real-world maintainability:

- Shared tooling is defined once at the root and inherited by all apps
- Git hooks enforce quality gates before anything hits the remote
- Local infrastructure (Postgres via Docker) is ready with a single command
- The workspace is structured to scale — add more apps or packages without restructuring
