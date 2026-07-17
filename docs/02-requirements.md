# Software Requirements Specification (SRS)

## 1. Introduction

### 1.1 Purpose

This document defines the functional and non-functional requirements for the Typing Game application.

It serves as the primary reference for development, testing, and future enhancements.

---

## 2. Project Scope

The Typing Game is a web application that enables users to complete timed typing tests using randomly generated words. During a test, the application measures typing speed and accuracy while providing immediate visual feedback on typed characters.

The initial release (MVP) focuses on delivering a smooth and responsive typing experience without requiring user accounts or a backend service.

---

## 3. Functional Requirements

### FR-001 Display Words

The system shall display a sequence of randomly selected words before the typing test begins.

---

### FR-002 Start Test

The typing test shall begin automatically when the user types the first character.

---

### FR-003 Capture Input

The system shall capture keyboard input in real time.

---

### FR-004 Character Validation

Each typed character shall be compared against the expected character.

Correct characters shall be visually distinguished from incorrect characters.

---

### FR-005 Word Progression

The application shall automatically advance through words as the user types.

---

### FR-006 Timer

The application shall support configurable test durations.

Initial durations:

* 15 seconds
* 30 seconds
* 60 seconds

---

### FR-007 Statistics

During the test the system shall calculate:

* Words Per Minute (WPM)
* Accuracy
* Characters Typed
* Correct Characters
* Incorrect Characters

---

### FR-008 Test Completion

The typing test shall end when either:

- The configured timer reaches zero, or
- The user reaches the end of the generated target text.

After completion, the application shall stop accepting input and display the results.

---

### FR-009 Restart

The user shall be able to restart the typing test without refreshing the page.

---

### FR-010 Performance Graph

After a test finishes, the application shall display a responsive graph of WPM and raw WPM over time, with mistake indicators and a textual summary.

Performance samples shall reset when a new test begins.

---

## 4. Non-Functional Requirements

### Performance

* Keyboard input should feel instantaneous.
* UI updates should remain smooth at 60 FPS where practical.
* Typing calculations should complete in real time.

### Usability

* Clean interface
* Responsive layout
* Accessible color contrast
* Keyboard-first interaction
* Result visualizations with an accessible text alternative

### Maintainability

* Modular component architecture
* Reusable hooks
* Strong TypeScript typing
* Consistent coding standards

### Reliability

* Typing calculations must produce consistent and accurate results.
* Restarting the test must always reset the application state.

---

## 5. Constraints

* Frontend-only for MVP
* No authentication
* No backend
* No database
* Local browser execution only

---

## 6. Assumptions

* Users have a physical keyboard.
* JavaScript is enabled.
* Modern browser support (Chrome, Firefox, Edge, Safari).

---

## 7. Acceptance Criteria

The MVP is complete when a user can:

* Start a typing test.
* Complete the test.
* View typing statistics.
* Restart the test.
* Use the application on desktop and mobile browsers.

---

## 8. Future Enhancements

* User accounts
* Online leaderboard
* Custom themes
* Multiplayer races
* Daily challenges
* Personal statistics
* Backend API
* Persistent user profiles
