# 📰 Nest Blog API

A fully-featured Blog API built with **NestJS**, **MySQL**, **TypeORM**, and **JWT Authentication**.

This project demonstrates scalable backend architecture using modular design with clean and
maintainable code. Features include user authentication, blog CRUD operations, database migrations,
and API documentation.

## 🛠 Tech Stack

- **Framework**: [NestJS](https://nestjs.com/)
- **ORM**: [TypeORM](https://typeorm.io/)
- **Database**: MySQL
- **Auth**: JWT with Bearer Token
- **Validation**: class-validator, class-transformer
- **Migrations**: TypeORM CLI
- **Documentation**: Swagger (via `@nestjs/swagger`)
- **Environment Config**: `@nestjs/config`

---

## ✨ Features

- ✅ User Registration & Login
- 🔐 Password Hashing with Bcrypt
- 🪪 JWT Authentication (Bearer Token)
- ✍️ Create / Read / Update / Delete Blogs
- 📌 Blog Tags (stored as JSON array)
- 🗃 TypeORM Migrations
- 🔄 Auto Timestamp columns
- 📜 Swagger API Documentation
- 🧪 Validation using DTOs

---

## 📁 Project Structure

```
src/
├── auth/            # Authentication (login/register/jwt strategy)
├── blog/            # Blog module (CRUD)
├── user/            # User module
├── common/          # Shared decorators, guards, pipes
├── config/          # Environment configuration
├── database/        # TypeORM config & migrations
├── app.module.ts    # Main root module
└── main.ts          # Bootstrap the application
```

---

## 📦 Setup Instructions

1. **Clone the Repo**

   ```bash
   git clone https://github.com/sailinhtut/nest-blog.git
   cd nest-blog
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   Create a `.env` file in the root directory:

   ```env
   DATABASE_HOST=localhost
   DATABASE_PORT=3306
   DATABASE_USER=root
   DATABASE_PASSWORD=yourpassword
   DATABASE_NAME=nest_blog
   JWT_SECRET=your_jwt_secret
   ```

4. **Run Migrations**

   ```bash
   npm run migration:run
   ```

5. **Start the Server**
   ```bash
   npm run start:dev
   ```

---

## 🧪 API Endpoints

| Method | Endpoint         | Description       |
| ------ | ---------------- | ----------------- |
| POST   | `/auth/register` | User registration |
| POST   | `/auth/login`    | User login        |
| GET    | `/users`         | Get all postss    |
| GET    | `/users/:id`     | Get all postss    |
| PUT    | `/users`         | Create new posts  |
| DELETE | `/users/:id`     | Delete post by ID |
| GET    | `/posts`         | Get all postss    |
| POST   | `/posts`         | Create new posts  |
| PUT    | `/posts/:id`     | Update post by ID |
| DELETE | `/posts/:id`     | Delete post by ID |

---

## 🛡 Auth

- All posts routes are **protected**.
- Use Bearer token from `/auth/login` response in Authorization header:

```http
Authorization: Bearer <token>
```

---

## 📜 License

MIT License © 2024 [Sai Lin Htut](https://github.com/sailinhtut)
