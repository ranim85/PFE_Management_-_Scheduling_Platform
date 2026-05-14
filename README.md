# PFE Management & Scheduling Platform

This repository contains a web platform for managing final-year projects and preparing defense schedules. It brings together a React frontend, a Spring Boot backend, a PostgreSQL database, and a Python scheduling engine powered by Google OR-Tools.

The project is still in active development. The core pieces are here, but a few integration points should be cleaned up before it is treated as production-ready.

## Key Features

- Centralized management of students, professors, departments, classrooms, and final-year projects.
- Secure authentication flow based on JWT, with role-aware access for academic users.
- Guided data-entry workflow for preparing the defense planning process step by step.
- Bulk import support for students, professors, and projects, with progress tracking for long-running operations.
- Project assignment features for linking students, supervisors, presidents, and reviewers.
- Automated defense timetable generation powered by Google OR-Tools CP-SAT, designed to respect room, professor, session, and jury-role constraints.
- Administrative dashboard with reusable tables, forms, navigation, dark mode support, and scheduling views.
- Backend API documentation through Swagger/OpenAPI for easier testing and integration.

## Scheduling Engine

One of the most interesting parts of the project is the scheduling engine. It is not a simple date picker or a manual planning table. The backend delegates timetable generation to a Python service that uses Google OR-Tools CP-SAT to solve scheduling constraints.

The scheduler is designed to handle rules such as:

- Each project must receive exactly one defense slot.
- A classroom cannot host two defenses at the same time.
- A professor cannot be assigned to two defenses in the same slot.
- Jury roles should avoid conflicts between supervisor, president, and reviewer.
- Rooms and sessions should be distributed in a controlled way.

This gives the project a real optimization component, which is especially valuable for academic planning where manual scheduling quickly becomes difficult as the number of projects, professors, rooms, and time slots grows.

## Project Layout

```text
.
backend/
  api.py
  pom.xml
  py/
  src/

frontend/
  package.json
  vite.config.ts
  src/
```

The old nested folders were removed. The frontend now lives directly in `frontend/`, and the backend now lives directly in `backend/`.

## Tech Stack

Frontend:

- React 18
- TypeScript
- Vite
- Tailwind CSS
- Redux Toolkit
- Radix UI style components
- Axios
- TanStack Table
- DnD Kit
- Recharts
- XLSX

Backend:

- Java 21
- Spring Boot 3.2.5
- Spring Web
- Spring Security
- JWT
- Spring Data JPA
- PostgreSQL
- Spring Mail
- OpenAPI / Swagger

Scheduling service:

- Python
- FastAPI
- Google OR-Tools CP-SAT
- pandas
- psycopg2 / SQLAlchemy

## Requirements

- Node.js 20 or newer
- npm
- Java 21
- Maven, or the included Maven wrapper
- Python 3.10 or newer
- PostgreSQL with a database named `gymapp`

## Running The Project

Start the backend:

```bash
cd backend
./mvnw spring-boot:run
```

On Windows:

```powershell
cd backend
.\mvnw.cmd spring-boot:run
```

The Spring Boot API runs on:

```text
http://localhost:5002
```

Start the Python scheduling service:

```bash
cd backend
pip install fastapi uvicorn ortools pandas psycopg2-binary sqlalchemy
uvicorn api:app --host 0.0.0.0 --port 5555 --reload
```

Start the frontend:

```bash
cd frontend
npm install
npm run dev
```

The frontend usually runs on:

```text
http://localhost:5173
```

## Configuration

The main backend configuration file is:

```text
backend/src/main/resources/application.yml
```

Before running the project on another machine, check these values:

- PostgreSQL URL, username, and password.
- Mail server settings.
- `application.assignUrl`, which points to the Python scheduling service.
- JWT secret configuration.

At the moment, some secrets and local values are still hard-coded. They should be moved to environment variables before deployment.

## Main API Areas

| Area | Base path |
| --- | --- |
| Authentication | `/auth` |
| Students | `/students` |
| Professors | `/professors` |
| Projects | `/projects` |
| Classrooms | `/classrooms` |
| Departments | `/filieres` |
| Planning configuration | `/configuration` |
| Timetable | `/timetable` |

Swagger UI is available when the backend is running:

```text
http://localhost:5002/swagger-ui/index.html
```

## Current State

The repository is cleaner now:

- The frontend and backend folders were flattened.
- Old generated logs were removed.
- Vite starter assets were removed.
- Frontend Excel test files were removed.
- Duplicate package lock files were cleaned up.
- The README files were rewritten in English.

The main technical issues still worth fixing are:

- The frontend still has hard-coded API URLs in several components.
- Spring calls the scheduler with `POST /generate-schedule`, while `api.py` currently exposes `GET /generate-schedule`.
- The backend security configuration currently permits all unmatched requests.
- Database credentials and JWT secrets are still stored in source files.
- The Python scheduling scripts are not yet organized around one clear entry point.

## Suggested Next Steps

1. Add `.env` files for frontend and backend configuration.
2. Centralize all frontend API calls through `src/services/api.ts`.
3. Align the Spring Boot and FastAPI scheduling contract.
4. Move secrets out of source control.
5. Add integration tests for authentication, project management, and timetable generation.
6. Keep one documented scheduling service and archive the experimental Python scripts.
