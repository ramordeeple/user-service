version: "3.9"

services:
  postgres:
    image: postgres:latest
    container_name: postgres_db
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: mydb
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  app:
    build: .
    container_name: nest_app
    depends_on:
      postgres:
        condition: service_healthy
    environment:
      DATABASE_URL: "postgresql://postgres:postgres@postgres:5432/mydb?schema=public"
      JWT_SECRET: "supersecretjwtkey"
      JWT_EXPIRES_IN: "3600s"
    ports:
      - "3000:3000"
    command: npm run start:prod

volumes:
  postgres_data:
