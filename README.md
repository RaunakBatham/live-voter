# Polling App

A simple polling application with user authentication, poll creation, and voting functionality.
Includes Swagger API documentation for easy exploration.

![Project Screenshot](/public/image.png)

---

## Project Setup

Follow these steps to run the project locally:

### 1. Clone the repository

```
git clone <your-repo-url>
cd <your-repo-folder>
```

### 2. Check Node.js & npm versions

Make sure you are using:

- **Node.js**: >= v22.16.0
- **npm**: >= 11.6.0

Check your versions:

```
node -v
npm -v
```

### 3. Install dependencies

```
npm install
```

### 4. Configure environment variables

Create a `.env` file in the project root and add the following (update values as needed):

```
DATABASE_URL= your-PostgreSQL-connection-string
PORT="3200",
JWT_SECRET="myJwtSecret@123"
```


### 5. Run Prisma database migration

```
npm run migrate
```

### 6. Start the development server

```
npm run dev
```

---

## Usage

1. Navigate to application url in console.
   `http://localhost:3200`

2. Open Swagger API docs link in homepage:
   [/api-docs](http://localhost:3200/api-docs)

3. **Register a User**
   Use the `/users` endpoint.

4. **Login**
   Use the `/login` endpoint to get a JWT token.

5. **Create a Poll**
   Use the `/polls` endpoint with your token.

6. **Vote on a Poll**
   Use the `/votes` endpoint with your token.

7. Open homepage and api-docs in seperate windows. when you vote in api-docs, it will automatically update on homepage.

---

## Tech Stack

- **Node.js** (v22+)
- **Express.js**
- **Prisma ORM**
- **SQLite / PostgreSQL / MySQL**
- **Swagger (OpenAPI)**

---

## License

This project is licensed under the MIT License.
