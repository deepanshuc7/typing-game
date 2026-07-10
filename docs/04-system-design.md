# System Design

## 1. Overview

The Typing Game is a client-side web application that provides a responsive typing experience. The MVP is built entirely in React and TypeScript, with all state managed in the browser.

The architecture emphasizes modularity, separation of concerns, and maintainability.

---

# 2. High-Level Architecture

```text
User
   │
   ▼
Browser
   │
   ▼
React Application
   │
   ├── UI Components
   ├── Custom Hooks
   ├── Business Logic
   ├── Utility Functions
   └── Local Storage
```

Future versions may introduce a backend for user accounts, leaderboards, and persistent statistics.

```text
User
   │
   ▼
Frontend (React)
   │
 REST API
   │
Backend (Go)
   │
PostgreSQL
```

---

# 3. Architectural Principles

The project follows these principles:

* Single Responsibility Principle (SRP)
* Separation of Concerns
* Reusable Components
* Predictable State Management
* Testable Business Logic
* Progressive Enhancement

---

# 4. Application Layers

## Presentation Layer

Responsible for rendering the user interface.

Examples:

* Typing Area
* Header
* Timer
* Statistics
* Results Screen

---

## State Layer

Responsible for storing application state.

Examples:

* Current words
* Current input
* Timer
* Test status
* Statistics

Initially, React state and custom hooks will be sufficient. If the application grows significantly, a dedicated state management library may be introduced.

---

## Business Logic Layer

Contains all calculation and validation logic.
Typing-related calculations and validation are implemented as pure utility functions. React hooks coordinate state updates while delegating business rules to the utility layer.

Examples:

* WPM calculation
* Accuracy calculation
* Character validation
* Word generation
* Test completion logic

This layer should remain independent of UI components so it can be tested in isolation.

---

## Utility Layer

Contains reusable helper functions.

Examples:

* Random word generation
* Time formatting
* Character comparison
* Statistics helpers

---

# 5. Data Flow

The application follows a one-way data flow.

```text
Keyboard Input
        │
        ▼
Typing Logic
        │
        ▼
Application State
        │
        ▼
React Components
        │
        ▼
Updated User Interface
```

---

# 6. State Management

The MVP will use React hooks.

Primary state includes:

* Test status
* Current word index
* Current character index
* Typed characters
* Time remaining
* WPM
* Accuracy
* Error count

As the application grows, state should remain localized where possible. Shared state should only be introduced when necessary.

---

# 7. Error Handling

The application should gracefully handle:

* Invalid keyboard input
* Empty word lists
* Timer expiration
* Unexpected application state

Errors should not cause the application to crash.

---

# 8. Future Backend Integration

A future backend may provide:

* User authentication
* Online leaderboards
* User profiles
* Typing history
* Statistics synchronization

The frontend should be designed so these features can be added without major architectural changes.

---

# 9. Quality Goals

The system should be:

* Responsive
* Maintainable
* Modular
* Accessible
* Easy to test
* Easy to extend
