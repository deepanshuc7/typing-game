# Changelog

## [Unreleased]

### Added

- Project planning documents
- Initial project documentation
- Repository templates
- GitHub issue templates
- Pull request template
- CI workflow placeholder
- Add frontend setup changes
- Base typing game layout
- Header and footer components
- Static typing controls
- Statistics display
- Initial typing area
- Random word list
- Tested word-generation utility
- Dynamically generated typing text
- Initial typing state model
- First TDD test for the typing engine
- Initial `useTypingTest` hook
- Typing test start action
- State transition from idle to running
- Character input handling in the typing engine
- Automatic test start on the first typed character
- Validation for single-character input
- Character validation against generated typing text
- Mistake tracking for incorrect input
- Protection against input beyond the target text
- Active word tracking
- Word progression after correctly typed separators
- Tests for multiple-word progression
- Typing test reset action
- Reusable initial-state factory
- Tests for resetting and restarting a typing session
- Reusable countdown timer hook
- Timer start, stop, and reset actions
- Timer completion callback
- Unit tests using fake timers
- Typing session lifecycle hook
- Automatic timer start on first input
- Automatic test completion when time expires
- Combined reset behavior for timer and typing state
- Typing statistics utility functions
- WPM calculation
- Accuracy calculation
- Correct and incorrect character counts
- Combined typing statistics result
- Live typing statistics exposed by the typing session
- Dynamic statistics bar
- Component tests for typing statistics display
- Global keyboard input handling
- Live character feedback while typing
- Keyboard interaction test coverage
- Backspace support
- Correction of mistake counts after deletion
- Word index rollback when deleting separators
- Functional test duration controls
- 15, 30, and 60 second test options
- Active duration state
- Disabled duration controls during active tests
- Restart button
- Full typing session reset
- Fresh word generation on restart
- Typing results dialog
- Final WPM and accuracy display
- Character summary
- Restart action from results
- Responsive application layout
- Accessible keyboard focus states
- Improved typing feedback styles
- Responsive statistics layout
- Typing instructions for assistive technology

### Changed

- Extracted typing validation into reusable utility functions.
- TypingArea now receives session text through props instead of generating its own words.
- Character feedback is derived from the current typing session.

### Fixed

- Prevented stopping the timer from resetting the remaining time.
- Added explicit timer reset support for duration changes.
