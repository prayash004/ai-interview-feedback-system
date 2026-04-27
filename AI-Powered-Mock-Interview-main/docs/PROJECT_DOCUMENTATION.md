# AI Mock Interview - Complete Project Documentation

## 1. Project Overview

AI Mock Interview is a React + TypeScript web application that helps users practice technical interviews using AI-generated questions, voice-based answers, and automated feedback scoring.

Primary user journey:
1. User signs in via Clerk.
2. User creates a mock interview with role, description, experience, and tech stack.
3. App generates short interview-style questions and expected answers using Google Gemini.
4. User records spoken answers per question.
5. App evaluates each answer using AI, stores rating and feedback, and calculates an overall score.
6. User reviews detailed feedback and expected answers.

## 2. Current Architecture

### 2.1 High-level Architecture

- Frontend: React + Vite + TypeScript
- Authentication: Clerk
- Database: Firebase Firestore
- AI Model Access: Google Generative AI SDK
- Hosting config: Firebase Hosting

### 2.2 Important Clarification

This repository currently implements a frontend-first architecture where the client directly communicates with Firestore and Gemini SDK. There is no Node.js/Express backend in this codebase yet.

## 3. Tech Stack

### 3.1 Runtime and Build

- Node.js
- Vite
- TypeScript
- ESLint

### 3.2 Frontend Framework and UI

- React 18
- React Router
- Tailwind CSS
- Radix UI primitives
- Sonner (toast notifications)
- Lucide React icons

### 3.3 Forms and Validation

- react-hook-form
- zod
- @hookform/resolvers

### 3.4 Integrations

- @clerk/clerk-react
- firebase
- @google/generative-ai
- react-hook-speech-to-text
- react-webcam

## 4. Directory Structure

Top-level folders:

- public: static assets
- src: all application source code
- dist: production build output
- docs: project documentation artifacts

Key src folders:

- src/components: reusable and feature components
- src/routes: route-level pages
- src/layouts: layout wrappers and route guards
- src/config: Firebase setup
- src/scripts: Gemini model setup
- src/handlers: auth side-effects (user sync)
- src/provider: global providers (toaster)
- src/types: TypeScript interfaces
- src/lib: helper utilities

## 5. Environment Variables

Defined in .env.example:

- VITE_CLERK_PUBLISHABLE_KEY
- VITE_FIREBASE_API_KEY
- VITE_FIREBASE_AUTH_DOMAIN
- VITE_FIREBASE_PROJECT_ID
- VITE_FIREBASE_STORAGE_BUCKET
- VITE_FIREBASE_MESSAGING_SENDER_ID
- VITE_FIREBASE_APP_ID
- VITE_GEMINI_API_KEY

Also used in code:

- VITE_GEMINI_MODEL (optional, defaults to gemini-2.5-flash)

Recommended local setup file: .env.local

## 6. Application Bootstrap Flow

### 6.1 App Startup

1. src/main.tsx reads VITE_CLERK_PUBLISHABLE_KEY.
2. If key exists, it renders ClerkProvider, App, and global ToasterProvider.
3. If key is missing, app displays an in-browser setup instruction panel.

### 6.2 Routing Setup

src/App.tsx defines three route groups:

1. Public routes
   - / -> Home page
2. Auth routes
   - /signin/*
   - /signup/*
3. Protected routes
   - /generate (dashboard and nested interview flows)

### 6.3 Auth Guard

src/layouts/protected-routes.tsx:

- Blocks protected routes until Clerk is loaded.
- Redirects unauthenticated users to /signin.

## 7. Feature Modules and Responsibilities

### 7.1 Public and Auth Module

- src/layouts/public-layout.tsx renders Header, Footer, and AuthHandler.
- src/handlers/auth-handler.tsx syncs signed-in Clerk users into Firestore users collection if absent.

### 7.2 Interview Creation and Editing

- src/routes/create-edit-page.tsx fetches existing interview by ID for edit mode.
- Handles not found, offline, and Firebase-specific errors with Sonner toasts.
- Renders src/components/form-mock-interview.tsx.

### 7.3 AI Question Generation

In src/components/form-mock-interview.tsx:

1. User submits role metadata.
2. Prompt is sent to chatSession from src/scripts/index.ts.
3. Response is sanitized and parsed into JSON.
4. Output is normalized to short interview format:
   - max 20 words per question
   - max 30 words per answer
   - max 5 items
5. Data is saved in Firestore interviews collection.

### 7.4 Dashboard

src/routes/dashboard.tsx:

- Uses Firestore onSnapshot real-time listener.
- Filters interviews by current userId.
- Shows loading skeletons and empty-state UI.
- Uses InterviewPin cards for each interview.

### 7.5 Interview Preparation and Start

- src/routes/mock-load-page.tsx: pre-interview instructions, webcam toggle, start action.
- src/routes/mock-interview-page.tsx: interview instructions and question rendering.
- src/components/question-section.tsx:
  - Vertical question tabs
  - Text-to-speech for question playback
  - RecordAnswer integration

### 7.6 Answer Recording and AI Feedback

src/components/record-answer.tsx:

1. Captures speech using react-hook-speech-to-text.
2. Requires minimum answer length.
3. Sends question, expected answer, and user answer to AI.
4. Expects JSON with ratings and feedback.
5. Saves result to userAnswers collection.
6. Prevents duplicate saves per user/question.

### 7.7 Feedback and Ratings

src/routes/feedback.tsx:

- Loads interview metadata and related userAnswers.
- Computes overall rating as average of individual ratings.
- Displays expected answer, user answer, and AI feedback per question.

## 8. Data Model

Interfaces are defined in src/types/index.ts.

### 8.1 User

- id
- name
- email
- imageUrl
- createdAt
- updateAt

### 8.2 Interview

- id
- position
- description
- experience
- userId
- techStack
- questions: array of { question, answer }
- createdAt
- updateAt

### 8.3 UserAnswer

- id
- mockIdRef
- question
- correct_ans
- user_ans
- feedback
- rating
- userId
- createdAt
- updateAt

## 9. Firestore Collections and Access Patterns

### 9.1 users

- Created on first sign-in by AuthHandler.
- Document ID equals Clerk user.id.

### 9.2 interviews

- Created/updated from FormMockInterview.
- Queried in dashboard by where(userId == currentUserId).
- Loaded by ID for edit/start/feedback flows.

### 9.3 userAnswers

- Created when user confirms saving evaluated answer.
- Queried by (userId + mockIdRef) for feedback page.
- Queried by (userId + question) to avoid duplicates.

## 10. AI Integration Details

### 10.1 Gemini Setup

src/scripts/index.ts:

- Instantiates GoogleGenerativeAI with VITE_GEMINI_API_KEY.
- Uses model from VITE_GEMINI_MODEL or default gemini-2.5-flash.
- Applies generation config and safety settings.
- Exports chatSession for reuse.

### 10.2 Prompt Design

Question generation prompt constraints include:

- Exactly 5 technical interview questions
- One sentence per question
- Short, concrete answers
- JSON-only output

Post-processing enforces additional hard limits to reduce verbose outputs and rating distortion.

### 10.3 Feedback Evaluation Prompt

record-answer.tsx sends:

- Question
- User answer
- Correct answer

Expected AI output JSON:

- ratings: number (1-10)
- feedback: string

## 11. UI and UX Notes

- Uses Sonner for all toast feedback.
- Uses loaders/skeletons on async operations.
- Includes webcam and microphone interaction UX.
- Uses breadcrumb navigation through nested flows.
- TooltipButton was fixed to avoid nested button DOM warnings using asChild trigger pattern.

## 12. Error Handling Strategy

Implemented patterns:

- Try/catch around all Firestore and AI operations.
- User-visible toasts for failures.
- Offline handling in create/edit load path.
- Fallback responses for AI failure in answer evaluation.

Recommended improvements:

1. Centralized error mapper utility for Firebase + AI errors.
2. Retry support for transient failures.
3. Firestore security rules documentation and testing.

## 13. Security and Privacy Considerations

Current state:

- Auth handled by Clerk.
- Client-side Firestore operations rely on Firebase security rules (not included in this repo).
- Camera feed is used live and not stored by app logic.

Recommendations:

1. Restrict Firestore read/write with userId ownership checks.
2. Add server-side proxy for Gemini calls to avoid exposing API key in browser.
3. Add request quotas/rate limits when backend is introduced.

## 14. Build, Run, and Deploy

### 14.1 Install Dependencies

- npm install

### 14.2 Local Development

- npm run dev

### 14.3 Production Build

- npm run build

### 14.4 Preview Build

- npm run preview

### 14.5 Firebase Hosting

firebase.json config indicates Hosting with frameworks backend region us-central1.

## 15. End-to-End Functional Flow

### 15.1 Create Interview

1. User opens /generate/create.
2. Fills role form.
3. AI generates short interview Q/A set.
4. Interview document saved to interviews.
5. UI redirects to dashboard.

### 15.2 Take Interview

1. User opens interview detail page.
2. Enables webcam (optional display behavior).
3. Starts interview.
4. Records spoken answer per question.
5. AI evaluates and returns rating + feedback.
6. User confirms save.

### 15.3 Review Feedback

1. Feedback page loads all saved answers for the interview.
2. Computes average rating.
3. Displays question-wise expected answer, user answer, and feedback.

## 16. Known Gaps and Technical Debt

1. README is still default Vite template and does not describe this product.
2. Some typos in naming and messages (for example: disbaled, ansewer).
3. Firestore schema and indexes are not documented in repo.
4. No backend API layer currently despite fullstack workflow requirements.
5. AI prompts and parsing are string-based and can be further hardened.

## 17. Proposed Backend (Node/Express) Integration Plan

If you want to move to a proper React -> Express -> DB pipeline:

1. Add backend service with routes:
   - POST /api/interviews
   - PUT /api/interviews/:id
   - GET /api/interviews
   - POST /api/answers
2. Move Gemini calls to backend service layer.
3. Use Firebase Admin SDK or a separate database from backend.
4. Replace direct Firestore calls in frontend with fetch/axios API clients.
5. Keep Clerk auth on frontend and verify Clerk tokens in backend middleware.
6. Return normalized payloads and status codes to frontend.

## 18. Testing Strategy (Recommended)

1. Unit tests for:
   - prompt normalization
   - JSON response cleaning
   - rating average calculations
2. Integration tests for route pages with mocked Firebase and AI calls.
3. E2E test path:
   - sign in
   - create interview
   - answer questions
   - view feedback

## 19. Quick File Reference

Core flow files:

- src/main.tsx
- src/App.tsx
- src/config/firebase.config.ts
- src/scripts/index.ts
- src/components/form-mock-interview.tsx
- src/components/question-section.tsx
- src/components/record-answer.tsx
- src/routes/dashboard.tsx
- src/routes/create-edit-page.tsx
- src/routes/mock-load-page.tsx
- src/routes/mock-interview-page.tsx
- src/routes/feedback.tsx
- src/handlers/auth-handler.tsx
- src/types/index.ts

## 20. Documentation Metadata

- Generated on: 2026-03-27
- Source repository: ai-mock-interview
- Documentation format: Markdown + PDF
- Prepared by: GitHub Copilot (GPT-5.3-Codex)
