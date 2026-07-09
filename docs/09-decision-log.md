# Architecture Decision Log (ADR)

## Overview

This document records important architectural and technical decisions made throughout the development of the Typing Game project.

Each decision includes the context, the chosen solution, alternatives considered, and the expected impact.

---

# ADR-001: Frontend Framework

**Status:** Accepted

## Context

The project requires a modern frontend framework that supports reusable components, excellent TypeScript integration, and a strong ecosystem.

## Decision

Use **React** with **TypeScript**.

## Alternatives Considered

* Vue
* Svelte
* Angular

## Rationale

React provides:

* Excellent TypeScript support
* Large ecosystem
* Strong community
* Component-based architecture
* Valuable experience for frontend and full-stack roles

## Consequences

The project will follow React best practices and use functional components with hooks.

---

# ADR-002: Build Tool

**Status:** Accepted

## Context

The project needs a modern frontend build tool with fast development feedback.

## Decision

Use **Vite**.

## Alternatives Considered

* Create React App
* Webpack

## Rationale

Vite offers:

* Fast startup
* Instant hot module replacement
* Simple configuration
* Excellent TypeScript support

---

# ADR-003: Styling

**Status:** Accepted

## Context

The application requires a clean, maintainable styling approach.

## Decision

Start with standard CSS and CSS Modules, with the option to introduce Tailwind CSS if the project grows.

## Alternatives Considered

* Tailwind CSS from the start
* Styled Components

## Rationale

Keeping styling simple at the beginning allows us to focus on functionality. Tailwind can be added later if it provides clear benefits.

---

# ADR-004: State Management

**Status:** Accepted

## Context

The MVP has a limited amount of shared state.

## Decision

Use React state and custom hooks.

## Alternatives Considered

* Redux Toolkit
* Zustand
* Context API

## Rationale

Additional state management libraries would introduce unnecessary complexity for the MVP. Custom hooks keep the application simple and testable.

---

# ADR-005: Backend Strategy

**Status:** Accepted

## Context

The long-term vision includes user accounts and leaderboards.

## Decision

Develop the MVP as a frontend-only application. Introduce a Go backend after the frontend is complete.

## Rationale

This allows us to validate the user experience first while keeping the initial scope manageable.

---

# ADR-006: Testing Strategy

**Status:** Accepted

## Context

Typing statistics directly affect the user's results.

## Decision

Prioritize testing of business logic before UI.

## Rationale

Core calculations such as WPM and accuracy must remain correct regardless of future UI changes.

---

# ADR-007: Git Workflow

**Status:** Accepted

## Decision

Follow Conventional Commits.

Examples:

* feat:
* fix:
* docs:
* refactor:
* test:
* chore:

## Rationale

A consistent commit history improves readability and supports future automation.

---

# Future Decisions

This document should be updated whenever a significant architectural or technical decision is made.
