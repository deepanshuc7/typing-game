# Product Backlog & User Stories

## Overview

This document captures the features of the Typing Game from the user's perspective. Each story represents a piece of functionality that delivers value to the user.

Stories are prioritized using the **MoSCoW** method:

* **Must Have** – Required for the MVP.
* **Should Have** – Important but not required for the MVP.
* **Could Have** – Nice-to-have features.
* **Won't Have (Now)** – Deferred to future releases.

---

# Must Have

## US-001 Start a Typing Test

**Priority:** Must Have

**User Story**

As a user, I want the typing test to start automatically when I begin typing so that I can immediately focus on the test.

### Acceptance Criteria

* Words are displayed before typing begins.
* Timer starts on the first keystroke.
* Only one timer is active.

---

## US-002 Type Words

**Priority:** Must Have

**User Story**

As a user, I want to type the displayed words so that I can complete the typing test.

### Acceptance Criteria

* Keyboard input is captured.
* Characters appear instantly.
* Input remains responsive.

---

## US-003 Receive Visual Feedback

**Priority:** Must Have

**User Story**

As a user, I want correct and incorrect characters to be highlighted so that I know when I make mistakes.

### Acceptance Criteria

* Correct characters are highlighted.
* Incorrect characters are highlighted.
* Current typing position is clearly visible.

---

## US-004 View Typing Statistics

**Priority:** Must Have

**User Story**

As a user, I want to see my typing speed and accuracy so that I can evaluate my performance.

### Acceptance Criteria

* WPM is displayed.
* Accuracy is displayed.
* Mistake count is displayed.
* Remaining time is displayed.

---

## US-005 Restart the Test

**Priority:** Must Have

**User Story**

As a user, I want to restart the typing test so that I can immediately try again.

### Acceptance Criteria

* Timer resets.
* Words are regenerated.
* Statistics reset.
* Typing position resets.

---

# Should Have

## US-006 Select Test Duration

The user can choose between multiple test durations.

Suggested durations:

* 15 seconds
* 30 seconds
* 60 seconds
* 120 seconds

---

## US-007 Dark and Light Theme

Allow users to switch between themes.

---

## US-008 Save Best Score

Store personal best scores using Local Storage.

---

## US-009 Keyboard Shortcuts

Provide shortcuts for common actions such as restarting the test.

---

# Could Have

## US-010 Custom Word Lists

Allow users to practice specific categories of words.

---

## US-011 Sound Effects

Play optional sounds for typing events.

---

## US-012 Typing History

Display previous typing sessions.

---

## US-013 Daily Challenge

Provide a daily typing challenge.

---

# Won't Have (Initial Release)

The following features are intentionally excluded from the MVP:

* User authentication
* Online accounts
* Multiplayer races
* Global leaderboard
* Cloud synchronization
* Social sharing

These features may be considered for future releases after the MVP is complete.
