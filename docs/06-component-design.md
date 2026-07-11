# Component Design

## 1. Overview

This document defines the planned React components for the Typing Game frontend.

Each component should have a clear responsibility and should remain reusable where possible.

---

## 2. Component Tree

```text
App
├── Header
├── DurationSelector
├── StatsBar
├── TypingArea
├── ResultModal
└── Footer
```

---

## 3. Components

## App

The root component of the frontend application.

Responsibilities:

* Manage application layout
* Connect hooks with UI components
* Pass data and callbacks to child components

---

## Header

Displays the application title and basic navigation.

Responsibilities:

* Show app name
* Show optional theme/settings controls in the future

---

## DurationSelector

Allows the user to choose the test duration.

Props:

```ts
interface DurationSelectorProps {
  selectedDuration: number;
  onChangeDuration: (duration: number) => void;
  disabled: boolean;
}
```

---

## StatsBar

Displays live typing statistics.

Props:

```ts
interface StatsBarProps {
  wpm: number;
  accuracy: number;
  mistakes: number;
  timeRemaining: number;
}
```

---

## TypingArea

Displays the generated words and character feedback.

Props:

```ts
interface TypingAreaProps {
  targetText: string;
  typedText: string;
  status: TestStatus;
}
```

Responsibilities:

* Render target text
* Highlight correct characters
* Highlight incorrect characters
* Show current cursor position

---

## ResultModal

Displays the final result after the test finishes.

Props:

```ts
interface ResultModalProps {
  isOpen: boolean;
  wpm: number;
  accuracy: number;
  mistakes: number;
  onRestart: () => void;
}
```

---

## RestartButton

Responsibilities:

- Trigger a new typing session
- Reset the current typing state
- Reset the timer
- Generate a fresh word list

---

## Footer

Displays small project information.

Responsibilities:

* Show project name
* Show GitHub link in the future

---

## 4. Component Rules

* Components should not contain complex business logic.
* Business logic should live in hooks or utility functions.
* Components should receive data through props.
* Components should be easy to test.
* Components should be small and focused.

---

## 5. Future Components

Possible future components:

* ThemeToggle
* KeyboardShortcutsModal
* WordListSelector
* LeaderboardTable
* UserStatsCard

---

## Implementation Status

- [x] Header
- [x] Footer
- [x] TestControls
- [x] StatsBar
- [x] TypingArea
- [ ] ResultModal