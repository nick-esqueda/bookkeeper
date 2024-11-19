# Lacey Bee's Book Inventory

## Running Locally

Run this project locally in a few easy steps

### Prerequisites

The below prerequisites must be installed locally

* Java 17 or later

* Docker & Docker Compose

### Setup

1. Clone this repository

2. Create a `.env` file in the root directory. Use `.env.example` as an example

3. `cd` into the `backend/` directory and run `./mvnw install`
    
    * Use `./mvnw install -DskipTests` to skip tests (faster)

    * This will create the `.jar` artifact used by the backend Docker container.

### Run

Run `docker compose up` in the project root directory to start the application

The application can be accessed at http://localhost:3000 once all services are up and running (web, db, and api)

You can edit the React application files and see changes reflected in real time via hot reloading
