# Task Management Backend

## Setup

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Variables**
    By default the app uses a local MongoDB.
    Copy `.env.example` to `.env` if not already done.
    ```bash
    cp .env.example .env
    ```
    Update `DATABASE_URL` in `.env` with your MongoDB connection string.

3.  **Database Setup**
    ```bash
    npx prisma generate
    ```

4.  **Run Development Server**
    ```bash
    npm run dev
    ```

5.  **Build & Run Production**
    ```bash
    npm run build
    npm start
    ```

## API Endpoints

### Auth
- `POST /api/auth/register` - { email, password, name }
- `POST /api/auth/login` - { email, password }

### Tasks (Requires Bearer Token)
- `POST /api/tasks` - { title, description, status }
- `GET /api/tasks`
- `GET /api/tasks/:id`
- `PUT /api/tasks/:id` - { title, description, status }
- `DELETE /api/tasks/:id`

## Features
- **Authentication**: JWT based.
- **Task CRUD**: manage tasks with proper validation.
- **Integration Mock**: Simulates 3rd party integration on task create/update.
- **Logging**: Morgan logger enabled.
