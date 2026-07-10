# Frontend Architecture

## 1. Overview

The frontend is a React and TypeScript application built with Vite.

The application will be organized around reusable components, custom hooks, utility functions, and strongly typed data models.

---

## 2. Frontend Folder Structure

```text
frontend/
├── src/
│   ├── components/
│   │   ├── TypingArea/
│   │   ├── StatsBar/
│   │   ├── Timer/
│   │   ├── ResultModal/
│   │   └── DurationSelector/
│   │
│   ├── hooks/
│   │   ├── useTypingTest.ts
│   │   └── useTimer.ts
│   │
│   ├── utils/
│   │   ├── calculateStats.ts
│   │   ├── generateWords.ts
│   │   └── compareCharacters.ts
│   │
│   ├── data/
│   │   └── words.ts
│   │
│   ├── types/
│   │   └── typing.ts
│   │
│   ├── App.tsx
│   └── main.tsx
│
├── package.json
└── vite.config.ts
```

---

## 3. Components

### TypingArea

Responsible for displaying the words and showing character-level feedback.

### StatsBar

Displays live typing statistics such as WPM, accuracy, mistakes, and time remaining.

### Timer

Displays the remaining test time.

### ResultModal

Shows the final result after the test ends.

### DurationSelector

Allows the user to select the test duration.

---

## 4. Hooks

### useTypingTest

Manages the main typing test state.

Responsibilities:

* Store generated words
* Track typed input
* Track current character position
* Start and stop the test
* Reset the test
* Calculate typing status

### useTimer

Manages countdown behavior.

Responsibilities:

* Start timer
* Stop timer
* Reset timer
* Detect when time reaches zero

---

## 5. Utilities

### calculateStats

Calculates:

* WPM
* Accuracy
* Correct characters
* Incorrect characters

### generateWords

Generates a random list of words for the test.

### compareCharacters

Compares expected text with typed text.

### typing.ts

- getTargetText()
- isCorrectCharacter()

---

## 6. Types

The application will use shared TypeScript types for typing test state and statistics.

Example:

```ts
export type TestStatus = "idle" | "running" | "finished";

export interface TypingStats {
  wpm: number;
  accuracy: number;
  correctCharacters: number;
  incorrectCharacters: number;
  totalCharacters: number;
}
```

---

## 7. State Ownership

State should live as close as possible to where it is used.

Global state is not needed for the MVP.

The main typing state will be managed inside `useTypingTest`.

---

## 8. Naming Conventions

* Components use PascalCase.
* Hooks start with `use`.
* Utility functions use camelCase.
* Types and interfaces use PascalCase.
* Files should use clear, descriptive names.

---

## 9. Testing Strategy

Business logic should be tested separately from UI components.

Priority test targets:

* WPM calculation
* Accuracy calculation
* Character comparison
* Word generation
* Reset behavior
