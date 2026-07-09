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

# ADR-008: Configure TypeScript Path Aliases

**Status:** Accepted  
**Date:** 2026-07-09

## Context

As the project grows, the folder structure will become deeper, resulting in long and difficult-to-read relative import paths.

Example:
```
import TypingArea from "../../../components/typing/TypingArea";
```

Deep relative imports reduce readability and make refactoring more difficult because moving files often requires updating numerous import statements.

## Decision

Configure a path alias (@) that maps to the src directory.

Example:
```
import TypingArea from "@/components/typing/TypingArea";
```

## Alternatives Considered

* Continue using relative imports (../../..)
* Use multiple aliases (e.g., @components, @hooks, @utils)
* Introduce a module resolution plugin later in the project

## Rationale

Using a single root alias provides several benefits:

* Improves code readability by reducing long relative paths.
* Simplifies refactoring, as file moves within src require fewer import changes.
* Establishes a consistent import style across the project.
* Aligns with common practices in modern React and TypeScript applications.
* Keeps the configuration simple while allowing additional aliases to be introduced in the future if needed.

## Consequences

* All internal imports should use the @ alias instead of long relative paths.
* Both TypeScript and Vite must be configured to resolve the alias.
* New contributors only need to learn a single import convention.

---

# Future Decisions

This document should be updated whenever a significant architectural or technical decision is made.
