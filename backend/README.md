# Backend

This is the backend for the PFE Management & Scheduling Platform. It is mainly a Spring Boot API, with a Python scheduling engine kept in the same folder because the timetable generation depends on it.

## What It Handles

- Authentication and JWT token generation.
- Student, professor, project, classroom, department, and configuration APIs.
- Project role assignment.
- Timetable orchestration.
- Calls to the Python scheduling engine.
- Email support through Spring Mail.

## Scheduling Engine

The scheduling part uses Google OR-Tools CP-SAT through Python. This is the piece that turns the project from a standard management app into a constraint-based planning system.

The goal is to generate defense schedules while respecting practical academic constraints:

- One slot per project.
- No room overlap in the same session.
- No professor overlap in the same session.
- Clean separation between supervisor, president, and reviewer roles.
- Balanced use of rooms and available sessions where possible.

Spring Boot acts as the main application backend, while the Python service focuses on the optimization problem. This separation keeps the business API readable and lets the scheduling logic use tools that are better suited for constraint solving.

## Stack

- Java 21
- Spring Boot 3.2.5
- Spring Web
- Spring Security
- Spring Data JPA
- PostgreSQL
- JWT
- OpenAPI / Swagger
- Python FastAPI for scheduling
- Google OR-Tools CP-SAT for constraint solving

## Running The Spring Boot API

```bash
./mvnw spring-boot:run
```

On Windows:

```powershell
.\mvnw.cmd spring-boot:run
```

The API runs on:

```text
http://localhost:5002
```

## Running The Scheduling Service

Install the Python dependencies:

```bash
pip install fastapi uvicorn ortools pandas psycopg2-binary sqlalchemy
```

Start the service:

```bash
uvicorn api:app --host 0.0.0.0 --port 5555 --reload
```

The Spring service expects the scheduler URL from:

```text
src/main/resources/application.yml
```

Look for:

```yaml
application:
  assignUrl: http://localhost:5555
```

## Important Configuration

Main configuration file:

```text
src/main/resources/application.yml
```

Check these values before running:

- `server.port`
- `spring.datasource.url`
- `spring.datasource.username`
- `spring.datasource.password`
- `spring.mail.*`
- `application.assignUrl`

Sensitive configuration values should be provided through environment variables.

## API Areas

| Area | Base path |
| --- | --- |
| Auth | `/auth` |
| Students | `/students` |
| Professors | `/professors` |
| Projects | `/projects` |
| Classrooms | `/classrooms` |
| Departments | `/filieres` |
| Configuration | `/configuration` |
| Timetable | `/timetable` |

Swagger UI:

```text
http://localhost:5002/swagger-ui/index.html
```
