# Rent A Car - Java Spring & Angular

Full Stack Car Rental Application built with Spring Boot (Backend) and Angular (Frontend).

## Project Structure

- `rent-a-car-spring`: Backend API (Java Spring Boot)
- `reatacar-angular`: Frontend UI (Angular)

## Prerequisites

- Java JDK 17+
- Node.js & NPM
- MySQL Database
- Maven

## Backend Setup (Spring Boot)

1. Navigate to the backend directory:
   ```bash
   cd rent-a-car-spring
   ```
2. Configure your database in `src/main/resources/application.properties`.
   - Update `spring.datasource.url`, `username`, and `password`.
3. Run the application:
   ```bash
   ./mvnw spring-boot:run
   ```
   The backend will start on `http://localhost:8080`.

## Frontend Setup (Angular)

1. Navigate to the frontend directory:
   ```bash
   cd reatacar-angular
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   ng serve -o
   ```
   The application will open at `http://localhost:4200`.

## Features

- User Authentication & Authorization (JWT)
- Admin Dashboard
- Customer Car Booking
- Car Management (CRUD)

## License

MIT
