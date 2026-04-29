
# 📘 AI-Powered HCP Interaction Logger

## Overview

This project is an AI-powered CRM assistant that converts unstructured interaction notes into structured data automatically. It helps users log HCP (Healthcare Professional) interactions efficiently by extracting key details like name, interaction type, sentiment, and follow-ups using a Large Language Model (LLM).

---

## Features

* 💬 Chat-based interaction logging
* 🧾 Automatic form auto-fill using AI
* ✏️ Conversational editing (update only specific fields)
* 📊 Sentiment detection (positive, neutral, negative)
* 📦 Material extraction (brochures, documents, samples)
* 🕒 Auto date & time capture
* 💾 Save interactions to PostgreSQL database

---

## 🛠️ Tech Stack

### 🔹 Frontend

* React (Vite)
* Tailwind CSS
* Axios

### 🔹 Backend

* FastAPI
* SQLAlchemy
* PostgreSQL

### 🔹 AI / LLM

* Groq API
* LLaMA 3.1 Model
* LangGraph (workflow control)

---

## 🧠 AI Approach

* Used Groq’s LLaMA 3.1 model for structured data extraction
* Designed custom prompts to enforce strict JSON output
* Implemented regex-based cleaning to handle invalid responses
* Used LangGraph to control flow between logging and editing

---

## 📁 Project Structure

### Backend

* `main.py` → API endpoints
* `agent.py` → LangGraph logic
* `tools.py` → AI processing functions
* `models.py` → Database models
* `schemas.py` → Request validation
* `db.py` → Database connection

### Frontend

* `Chat.jsx` → AI chat interface
* `Form.jsx` → Interaction form
* `App.jsx` → Main layout

---

## ⚙️ Setup Instructions

### 🔹 1. Clone Repository

```bash
git clone <your-repo-link>
cd your-project
```

---

### 🔹 2. Backend Setup

```bash
cd backend
python -m venv venv
venv\Scripts\activate   # Windows

pip install -r requirements.txt
```

Create `.env` file:

```env
GROQ_API_KEY=your_api_key
DATABASE_URL=your_postgres_url
```

Run backend:

```bash
uvicorn main:app --reload
```

---

### 🔹 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 URLs

* Backend: [http://127.0.0.1:8000](http://127.0.0.1:8000)
* API Docs: [http://127.0.0.1:8000/docs](http://127.0.0.1:8000/docs)
* Frontend: [http://localhost:5173](http://localhost:5173)

---

## Example Input

```
Today I met Dr. Smith and discussed product X efficiency. He was positive and I shared a brochure.
```

---

## 🧩 How It Works

1. User enters text in chat
2. Backend processes using AI
3. Structured JSON is generated
4. Frontend auto-fills the form
5. User can edit via chat
6. Data is saved to database
---