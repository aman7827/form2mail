# Form2Mail

A cloud-based form submission service built with Node.js, Express.js, MongoDB Atlas, and Nodemailer.

Form2Mail allows developers to collect form submissions, store them securely in MongoDB Atlas, and receive instant email notifications without building a custom backend from scratch.

---

## Features

- REST API for form submissions
- MongoDB Atlas integration
- Email notifications using Nodemailer
- Input validation with Express Validator
- Security with Helmet and CORS
- Rate limiting protection
- Automated testing with Jest & Supertest
- CI/CD with GitHub Actions
- Render deployment support

---

## Tech Stack

| Technology | Purpose |
|------------|----------|
| Node.js | Backend Runtime |
| Express.js | Web Framework |
| MongoDB Atlas | Database |
| Mongoose | ODM |
| Nodemailer | Email Service |
| Jest | Unit Testing |
| Supertest | API Testing |
| GitHub Actions | CI/CD |
| Render | Deployment |

---

## Project Structure

```text
form2mail
│
├── .github/workflows
│   └── ci.yml
│
├── public
│   └── landing.html
│
├── src
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── models
│   ├── routes
│   └── utils
│
├── tests
│   └── health.test.js
│
├── .env.example
├── app.js
├── index.js
├── package.json
└── render.yaml
```

---

## Installation

### Clone Repository

```bash
git clone https://github.com/aman7827/Form2mail.git

cd Form2mail
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
PORT=3000

MONGODB_URI=your_mongodb_connection_string

EMAIL_USER=your_email@gmail.com

EMAIL_PASS=your_app_password

EMAIL_RECEIVER=your_email@gmail.com
```

### Start Development Server

```bash
npm run dev
```

Server runs on:

```text
http://localhost:3000
```

---

## API Endpoints

### Health Check

```http
GET /health
```

Response:

```json
{
  "success": true,
  "message": "Server is running"
}
```

---

### Submit Form

```http
POST /api/forms
```

Request Body:

```json
{
  "name": "Aman Kumar",
  "email": "amankumar78277@gmail.com",
  "message": "Hello Form2Mail"
}
```

Response:

```json
{
  "success": true
}
```

---

## Automated Testing

Run tests:

```bash
npm test
```

Generate coverage report:

```bash
npm run coverage
```

---

## CI/CD Pipeline

GitHub Actions automatically:

- Installs dependencies
- Runs automated tests
- Validates every push and pull request

Workflow file:

```text
.github/workflows/ci.yml
```

---

## Deployment

### Render

Build Command

```bash
npm install
```

Start Command

```bash
npm start
```

Add Environment Variables in Render Dashboard.

---

## Screenshots

### Landing Page

Add screenshot here after deployment.

---

## Future Improvements

- Custom email templates
- Dashboard for submissions
- Webhook support
- Spam protection
- Analytics dashboard
- Multi-user support

---

## Author

**Aman Kumar**

GitHub:
https://github.com/aman7827

Project Repository:
https://github.com/aman7827/Form2mail

---

## License

ISC License
