# Development Roadmap

## Overview

This roadmap outlines the planned development phases for the Typing Game project. The project follows an incremental approach, where each phase builds upon the previous one.

---

# Phase 1 — Project Planning

## Objectives

* Define project goals
* Gather requirements
* Create user stories
* Design the system architecture
* Plan testing strategy
* Set up the repository

### Deliverables

* Documentation
* Git repository
* Initial project structure

**Status:** Complete

---

# Phase 2 — Frontend Setup

## Objectives

* Initialize React with TypeScript using Vite
* Configure ESLint and Prettier
* Configure Vitest
* Create the application folder structure
* Verify the development environment

### Deliverables

* React application
* Development tooling
* Base folder structure

**Status:** Complete

---

# Phase 3 — Core Typing Experience

## Objectives

* Display random words
* Capture keyboard input
* Highlight typed characters
* Track current position
* Implement restart functionality

### Deliverables

* Functional typing interface

**Status:** Complete

---

# Phase 4 — Statistics Engine

## Objectives

* Implement timer
* Calculate WPM
* Calculate accuracy
* Count mistakes
* Display live statistics

### Deliverables

* Live statistics dashboard

**Status:** Complete

---

# Phase 5 — Results

## Objectives

* Display final results
* Restart the test
* Improve user experience

### Deliverables

* Results screen
* Improved interactions

**Status:** Complete

---

# Phase 6 — Testing

## Objectives

* Add unit tests
* Add component tests
* Increase test coverage
* Fix discovered issues

### Deliverables

* Reliable and tested application

**Status:** Complete

---

# Phase 7 — UI Polish

## Objectives

* Improve layout
* Add responsive design
* Improve accessibility
* Refine animations

### Deliverables

* Production-ready user interface

**Status:** Complete

---

# Phase 8 — Future Enhancements

Possible future work:

* User authentication
* Online leaderboards
* Daily challenges
* Typing history
* Themes
* Multiplayer races
* Go backend
* PostgreSQL database

**Status:** Future

---

# Phase 9 — Deployment

## Objectives

- Verify the production build
- Configure continuous integration
- Deploy the frontend
- Test the production environment
- Add the live application URL to the repository

## Deliverables

- Public production deployment
- Automated CI validation
- Production-ready project documentation

**Status:** Complete

---

# ADR-011: Deploy the Frontend with Vercel

**Status:** Accepted

## Context

The frontend requires a hosting platform that supports Vite applications, Git-based deployments, production hosting, and preview environments for pull requests.

## Decision

Deploy the React and Vite frontend using Vercel.

## Alternatives Considered

- Netlify
- Cloudflare Pages
- GitHub Pages

## Rationale

Vercel was selected because it provides:

- Native support for Vite applications
- GitHub repository integration
- Automatic production deployments
- Preview deployments for pull requests
- Minimal deployment configuration

The platform also fits the project's branch-based development and pull request workflow.

## Consequences

- The `frontend` directory is configured as the deployment root.
- Production deployments are created from the `main` branch.
- Pull requests may be tested using preview deployments.
- The application is currently coupled to Vercel for hosting configuration, although the generated Vite build remains portable to other static hosting platforms.

---

# Success Criteria

The MVP will be considered complete when users can:

* Complete a typing test
* View accurate statistics
* Restart the test
* Use the application on desktop and mobile devices

The application should also be well-documented, tested, and maintainable.
