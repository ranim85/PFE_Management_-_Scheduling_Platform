# Frontend

This is the React frontend for the PFE Management & Scheduling Platform. It contains the screens used to manage students, professors, projects, classrooms, availability, and the scheduling workflow.

The scheduling itself is solved on the backend with a Python service using Google OR-Tools. The frontend provides the workflow and data entry screens that feed that scheduling process.

## Stack

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit
- Radix UI based components
- TanStack Table
- DnD Kit
- Recharts
- XLSX

## Getting Started

```bash
npm install
npm run dev
```

The development server usually starts at:

```text
http://localhost:5173
```

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run preview
```

## Folder Structure

```text
src/
  app/
  assets/
  components/
  constant/
  context/
  hooks/
  lib/
  pages/
  services/
  state/
  types/
  utils/
```

## Notes

The frontend is usable, but the API layer still needs cleanup. Several components call hard-coded URLs directly. The better long-term shape is to keep the backend URL in an environment variable and route all HTTP calls through `src/services/api.ts`.

Recommended environment variable:

```text
VITE_API_URL=http://localhost:5002
```
