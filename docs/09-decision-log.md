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

# ADR-009: Adopt Vitest for Frontend Testing

**Status:** Accepted  
**Date:** 2026-07-10

## Context

The project requires a testing framework that integrates well with React, TypeScript, and Vite. Since the project follows Test-Driven Development (TDD), the testing solution should provide fast feedback during development while supporting unit and component testing.

## Decision

Use Vitest as the primary testing framework, together with:

- React Testing Library
- JSDOM
- ```@testing-library/jest-dom```

## Alternatives Considered

* Jest
* Cypress Component Testing
* Playwright Component Testing

## Rationale

Vitest was chosen because:

* It is built for Vite and integrates seamlessly with the existing build tool.
* It offers significantly faster startup and test execution compared to Jest.
* Its API is largely compatible with Jest, making it familiar to many developers.
* React Testing Library complements Vitest by encouraging tests that focus on user behavior rather than implementation details.
* It supports the project's TDD workflow with rapid feedback during development.

## Consequences

* All unit and component tests will use Vitest.
* Test files will follow the *.test.ts or *.test.tsx naming convention.
* The CI workflow will execute the Vitest suite on every push and pull request.
* New business logic should be accompanied by corresponding unit tests before implementation whenever practical.

---

# ADR-010: Character and Word Position Semantics

**Status:** Accepted  
**Date:** 2026-07-10

## Context

The typing engine needs to track both the user's position in the complete target text and the currently active word.

Resetting the character index after each word would make character validation against the complete target text unreliable.

## Decision

Use `currentCharacterIndex` as the absolute position in the complete target text and `currentWordIndex` as the index of the active word.

## Rationale

This keeps character lookup simple while allowing the interface to highlight the active word independently.

## Consequences

- `currentCharacterIndex` does not reset between words.
- `currentWordIndex` advances only when the expected space is typed correctly.
- A more explicit name such as `currentTextIndex` may be introduced during a future refactor.

---

# ADR-011: Result Performance Visualization

**Status:** Accepted
**Date:** 2026-07-17

## Context

The results experience needs to show how typing speed changed during a test, including WPM, raw WPM, and mistake points. Building responsive axes, tooltips, legends, and line rendering from scratch would add substantial presentation logic. Loading a complete charting library with the initial typing interface would also increase startup cost for functionality used only after a test finishes.

## Decision

Record chart-ready `TypingSample` values once per timer second in `useTypingSession`. Render the result with Recharts in a standalone `PerformanceChart` component that is lazy-loaded by `ResultModal`.

## Rationale

- Session ownership ensures samples reset and finish with the typing test.
- A pure sampling utility keeps WPM and raw-WPM calculations independently testable.
- Recharts provides responsive SVG charts, axes, tooltips, and legends using React components.
- Lazy loading keeps Recharts out of the initial application bundle.
- A textual summary and empty state keep the visualization understandable without relying exclusively on the SVG or color.

## Consequences

- Recharts is a production dependency.
- The performance chart is delivered as a separate build chunk after results are shown.
- Result-modal tests must account for asynchronous chart loading.
- Chart calculations and sampling behavior remain covered independently from third-party rendering internals.

---

# Future Decisions

This document should be updated whenever a significant architectural or technical decision is made.
