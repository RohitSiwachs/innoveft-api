# Innovaft Project Documentation 🚀

Ye document poore **Innovaft** project ki details contain karta hai. Isme hum dekhenge ki project kya hai, kaunsi technologies use ki gayi hain, kaise setup karna hai, aur API routes kaunse hain.

## 1. Project Overview 📝

Innovaft ek **Task Management API** hai jo aapko tasks create, read, update, aur delete (CRUD) karne ki suvidha deta hai. Isme authentication bhi included hai, matlab users ko register aur login karna padega tasks manage karne ke liye.

## 2. Tech Stack 💻

Is project me latest aur robust technologies ka use kiya gaya hai:

- **Runtime**: [Node.js](https://nodejs.org/) - JavaScript runtime environment.
- **Framework**: [Express.js](https://expressjs.com/) - Web framework for Node.js.
- **Language**: [TypeScript](https://www.typescriptlang.org/) - Type-safe JavaScript.
- **Database ORM**: [Prisma](https://www.prisma.io/) - Database se interact karne ke liye modern ORM.
- **Validation**: [Zod](https://zod.dev/) - Data validation ke liye.
- **Authentication**: [JWT (JSON Web Tokens)](https://jwt.io/) - Secure user authentication ke liye.
- **Documentation**: [Swagger](https://swagger.io/) - API documentation ke liye.
- **Other Tools**: `bcryptjs` (password hashing), `morgan` (logging), `cors` (cross-origin requests).

## 3. Project Structure 📂

Project ka folder structure kuch is tarah hai:

```
innovaft/
├── src/
│   ├── config/         # Configuration files (Swagger etc.)
│   ├── controllers/    # Request handling logic
│   ├── middlewares/    # Auth middleware wagera
│   ├── routes/         # API endpoints definition
│   ├── services/       # Business logic (optional)
│   ├── utils/          # Helper functions
│   ├── app.ts          # Express app setup
│   └── server.ts       # Server entry point
├── prisma/             # Database schema
├── .env                # Environment variables
└── package.json        # Dependencies and scripts
```

## 4. Getting Started (Setup Guide) 🛠️

Project ko apne local machine pe run karne ke liye ye steps follow karein:

1.  **Dependencies Install Karein**:

    ```bash
    npm install
    ```

2.  **Environment Variables Setup Karein**:
    `.env.example` file ko copy karke `.env` banayein aur apni database details aur JWT secret bharein.

3.  **Database Migration**:
    Prisma migration run karein taaki database schema create ho jaye.

    ```bash
    npx prisma migrate dev
    ```

4.  **Project Run Karein**:
    Development mode me run karne ke liye:
    ```bash
    npm run dev
    ```
    Production build ke liye:
    ```bash
    npm run build
    npm start
    ```

## 5. API Routes 🛣️

Niche diye gaye routes ka use karke aap API se interact kar sakte hain.

### Authentication Routes (`/api/auth`)

Ye routes public hain (bina login kiye access kar sakte hain).

| Method   | Endpoint             | Description                      | Body Parameters                         |
| :------- | :------------------- | :------------------------------- | :-------------------------------------- |
| **POST** | `/api/auth/register` | Naya user register karne ke liye | `{ "email": "...", "password": "..." }` |
| **POST** | `/api/auth/login`    | Login karke token lene ke liye   | `{ "email": "...", "password": "..." }` |

### Task Routes (`/api/tasks`)

⚠️ **Note**: In sabhi routes ke liye **Login zaroori hai**. Aapko header me `Authorization: Bearer <your_token>` bhejna hoga.

| Method     | Endpoint         | Description                                                 |
| :--------- | :--------------- | :---------------------------------------------------------- |
| **GET**    | `/api/tasks`     | Saare tasks ki list lene ke liye.                           |
| **POST**   | `/api/tasks`     | Naya task create karne ke liye.                             |
| **GET**    | `/api/tasks/:id` | Kisi specific task ki details dekhne ke liye (ID ke dwara). |
| **PUT**    | `/api/tasks/:id` | Kisi task ko update karne ke liye.                          |
| **DELETE** | `/api/tasks/:id` | Kisi task ko delete karne ke liye.                          |

### API Documentation (Swagger)

Aap browser me interactive documentation bhi dekh sakte hain jab server run kar raha ho:

- **URL**: `http://localhost:<PORT>/api/docs`

---

Umeed hai ye documentation aapke kaam aayegi. Happy Coding! 🚀
