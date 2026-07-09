# Testing Strategy

## 1. Overview

This document outlines the testing approach for the Typing Game project.

The goal is to ensure that the application's core functionality is reliable, maintainable, and easy to extend. Testing will focus on business logic first, followed by component behavior.

---

## 2. Testing Goals

The testing strategy aims to:

* Verify that typing calculations are correct.
* Prevent regressions when new features are added.
* Ensure reusable functions behave consistently.
* Support confident refactoring.

---

## 3. Testing Pyramid

The project will follow a simplified testing pyramid.

```text
           End-to-End Tests (Future)
                  ▲
                  │
          Component Tests
                  ▲
                  │
             Unit Tests
```

### Unit Tests

Unit tests will cover individual functions and business logic.

Examples:

* WPM calculation
* Accuracy calculation
* Character comparison
* Word generation
* Timer utilities

### Component Tests

Component tests will verify UI behavior and interactions.

Examples:

* TypingArea renders correctly.
* StatsBar displays current values.
* ResultModal opens when the test ends.
* DurationSelector updates the selected duration.

### End-to-End Tests (Future)

Future versions may include browser-based tests to validate complete user flows.

Examples:

* Start a typing test.
* Complete a typing test.
* Restart the test.
* Verify results are displayed.

---

## 4. Testing Tools

The project will use:

* Vitest
* React Testing Library
* Jest DOM

Future:

* Playwright (optional)
* GitHub Actions for automated test execution

---

## 5. Test Coverage Priorities

### High Priority

Critical logic that directly affects user results.

* WPM calculation
* Accuracy calculation
* Character validation
* Timer behavior
* Test completion
* Restart logic

### Medium Priority

Component rendering and user interactions.

* Statistics display
* Result modal
* Duration selector

### Low Priority

Static presentation components.

* Header
* Footer

---

## 6. What We Will Not Test

The following are outside the scope of the MVP:

* Browser rendering differences
* CSS styling
* Third-party library internals

---

## 7. Definition of Done

A feature is considered complete when:

* Functional requirements are met.
* Manual testing passes.
* Relevant unit tests pass.
* Existing tests remain green.
* Code is reviewed and documented.

---

## 8. Continuous Improvement

As the project grows, the testing strategy should evolve to include:

* Integration tests
* End-to-end testing
* Automated CI pipelines
* Performance testing
