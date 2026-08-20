🧠 Student Mental Wellness Risk Assessment System

A full-stack web application designed to help students assess their mental wellness through a structured screening assessment and machine-learning-based risk prediction.

The system combines a modern **React + Vite frontend**, **FastAPI backend**, **SQL database**, **JWT authentication**, **Google OAuth**, **Redis/Memurai**, and a machine-learning prediction pipeline into a single application.

> ⚠️ **Important:** This application is intended for screening and educational purposes only. It is **not a medical diagnostic system** and should not replace professional mental-health assessment or treatment.

---

✨ Features

🔐 Authentication

* User registration and login
* JWT-based authentication
* Protected routes
* Google OAuth authentication
* Secure authenticated API requests
* User profile management
* Logout functionality

📝 Mental Wellness Assessment

Users can complete a structured assessment covering factors such as:

* Age
* Educational background
* Academic pressure
* Study satisfaction
* CGPA
* Sleep duration
* Financial stress
* Family mental-health history
* Dietary habits

The assessment interface is designed to be simple, responsive, and easy to complete on both desktop and mobile devices.

🤖 Machine Learning Prediction

After completing the assessment:

1. Assessment data is submitted to the FastAPI backend.
2. The backend validates the information.
3. The trained ML model processes the assessment.
4. A risk classification is generated.
5. The result is stored in the database.
6. Recommendations are generated based on the assessment result.

📊 Dashboard

The dashboard provides users with an overview of their assessment activity, including:

* Latest assessment
* Risk classification
* Assessment statistics
* Recent assessment information
* Assessment history

📚 Assessment History

Users can:

* View previous assessments
* View assessment dates
* Review previous risk classifications
* Open individual assessment details

📱 Responsive Design

The frontend follows a mobile-first approach and has been tested across multiple mobile viewport sizes using browser developer tools.

---

🛠️ Technology Stack

Frontend

* **React**
* **Vite**
* **JavaScript**
* **Tailwind CSS**
* **Axios**
* **React Router**

Backend

* **Python**
* **FastAPI**
* **Pydantic**
* **SQLAlchemy**
* **JWT Authentication**
* **OAuth / Google OAuth**

Database & Infrastructure

* **SQL database**
* **Redis**
* **Memurai** for local Redis development
* **REST API**

Machine Learning

The application integrates a trained machine-learning model into the backend assessment pipeline to generate student mental-wellness risk predictions.

---

🔑 Authentication Flow

The application supports both traditional authentication and Google OAuth.



# 📡 API Overview

### Authentication

```text
POST /auth/register
POST /auth/login
```

### User

```text
GET /users/me
```

### Assessment

```text
POST /assessment/
GET  /assessment/history
GET  /assessment/dashboard
GET  /assessment/{assessment_id}
```

Protected endpoints require authentication.

---

# 💬 Future Development — AI Assessment Chatbot

A conversational assessment interface is planned as a future enhancement.
Instead of completing a traditional form, users will be able to communicate naturally with an AI assistant.
The chatbot will **not replace the existing ML prediction system**.

Its role will be to:

* Ask assessment questions naturally
* Extract relevant information
* Map responses to structured assessment values
* Ask clarification questions when a response is ambiguous
* Submit the structured assessment to the existing backend
* Present the ML result naturally
* Explain recommendations in a user-friendly way
  Planned

* [ ] Conversational AI assessment
* [ ] LLM-based structured information extraction
* [ ] Intelligent clarification questions
* [ ] Conversational result explanation
* [ ] Additional analytics
* [ ] Further UX improvements

---

⚙️ Local Development

1. Clone the repository

```bash
git clone AI-Hutano-Risk-Analyzer
cd Student_Depression_Analyser
```

 2. Backend setup

Create a virtual environment:

```bash
python -m venv venv
```

Activate it on Windows:

```bash
venv\Scripts\activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create your environment configuration:

```text
.env
```

Add the required database, JWT, Redis, OAuth, and other application secrets.

Start the FastAPI server:

```bash
uvicorn main:app --reload
```

---

3. Frontend setup

Navigate to the frontend:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create the required Vite environment variables.

Then run:

```bash
npm run dev
```

The Vite development server will provide the local frontend URL.

---

🌐 Deployment

The application is currently deployed and accessible as a live web application.

The production environment contains:

```text
React / Vite Frontend
        │
        ▼
Production FastAPI Backend
        │
        ├── Database
        ├── Redis
        ├── Authentication
        └── ML Prediction Pipeline
```

# ⚠️ Disclaimer

This project is an educational/student screening application.

The risk classification produced by the machine-learning model **does not constitute a medical diagnosis**.

Users experiencing significant mental-health concerns should seek guidance from a qualified healthcare or mental-health professional.


# 👨‍💻 Developer

**Developer Wonka**

Full-Stack AI Developer in progress.

Focused on building applications that combine:

```text
Web Development
      +
Backend Engineering
      +
Machine Learning
      +
Artificial Intelligence
```

---

## ⭐ If you find this project interesting

Feel free to explore the repository, review the architecture, and follow the project's development as conversational AI capabilities are added.
