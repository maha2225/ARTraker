# ARTraker

ARTraker is a full-stack application built to help healthcare providers track ART (Antiretroviral Therapy) adherence for patients. The app includes features for managing patients, counselors, prescriptions, and adherence records, with automatic seeding and migrations for easy deployment.

## Table of Contents

* [Features](#features)
* [Tech Stack](#tech-stack)
* [Installation](#installation)
* [Configuration](#configuration)
* [Database](#database)
* [Running the App](#running-the-app)
* [Deployment](#deployment)
* [Contributing](#contributing)
* [License](#license)

## Features

* User management: Admin, counselors, and patients
* Counselor and patient assignment
* ART adherence tracking
* Prescription and medication management
* Automatic database seeding and migration
* Role-based access control
* Dashboard with summary statistics

## Tech Stack

* **Backend:** Node.js, Express.js, Sequelize ORM
* **Frontend:** React, Redux Toolkit, Lucide-react icons
* **Database:** PostgreSQL
* **Deployment:** Render (supports auto-migrations and seeding)
* **Authentication:** JWT-based auth 
* **Styling:** Tailwind CSS

## Installation

### Clone the repository

```bash
git clone https://github.com/maha2225/ARTraker.git
cd ARTraker
```

### Install dependencies

**Backend**

```bash
cd backend
npm install
```

**Frontend**

```bash
cd ../frontend
npm install
```

## Configuration

Create a `.env` file in the backend directory with the following:

```env
DATABASE_URL=postgres://username:password@hostname:port/dbname
PORT=5000
JWT_SECRET=your_jwt_secret
```

### Database Setup

The project uses Sequelize for migrations and seeding.

**Run Migrations**

```bash
cd backend
npx sequelize-cli db:migrate
```

**Seed the Database**

```bash
npx sequelize-cli db:seed:all
```

## Running the App

### Backend

```bash
cd backend
npm run dev
```

The backend server runs on `http://localhost:5000`.

### Frontend

```bash
cd frontend
npm start
```

The frontend runs on `http://localhost:5173`.

5. Start both frontend and backend services.

## Contributing

1. Fork the project.
2. Create a new branch: `git checkout -b feature/your-feature`
3. Make your changes.
4. Commit your changes: `git commit -m "Add some feature"`
5. Push to the branch: `git push origin feature/your-feature`
6. Open a pull request.

## Live Preview

Live preview of this project is available at
