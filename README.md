# 🤖 AI Interview SaaS

> An AI-powered mock interview platform with real-time face proctoring, MCQ generation, and automatic grading.

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Project Structure](#project-structure)

---

## 🎯 About

AI Interview SaaS is a full-stack web application that simulates real technical interview experiences. It uses AI to generate personalized multiple-choice questions and monitors candidate integrity through facial recognition and behavior tracking.

Perfect for:
- Job seekers preparing for technical interviews
- Students practicing coding interviews
- Recruiters conducting preliminary screening

---

## ✨ Features

### 🤖 **AI-Powered Question Generation**
- Generates 10 personalized MCQ questions based on job role, experience level, and tech stack
- Powered by Groq AI (LLaMA 3.3 model)
- Each question includes 4 options with automatic correct answer marking

### 👁️ **Real-Time Face Proctoring**
- Live face detection using face-api.js
- Integrity scoring system (starts at 100 points)
- Automatic penalties for:
  - No face detected: -10 points
  - Multiple faces: -15 points
  - Looking away: -5 points
  - Tab switching: -10 points

### ⏱️ **Interview Timer**
- 30-minute countdown timer
- Color-coded warnings (yellow at 10 min, red at 5 min)
- Automatic submission when time expires

### 📊 **Comprehensive Score Summary**
- Quiz score (X/10 correct answers)
- Integrity score (0-100)
- Final grade (A/B/C/F)
- Detailed answer review with correct answers highlighted
- Personalized feedback based on performance
- Printable summary

### 🔊 **Additional Features**
- Text-to-speech for each question
- Copy-to-clipboard functionality
- Progress tracking
- Responsive design

---

## 🛠️ Tech Stack

### **Frontend**
- React 18 (Vite)
- Tailwind CSS
- Axios
- face-api.js
- Web Speech API

### **Backend**
- Node.js
- Express.js
- Groq AI API (LLaMA 3.3)
- dotenv
- CORS

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Groq API key ([Get one here](https://console.groq.com))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pranaybandaru11-code/ai-interview-saas.git
   cd ai-interview-saas
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../client
   npm install
   ```

4. **Set up environment variables**
   
   Create a `.env` file in the `server` folder:
   ```env
   GROQ_API_KEY=your_groq_api_key_here
   PORT=5000
   ```

5. **Download face detection models**
   
   The face detection models are already included in `client/public/models/`:
   - `tiny_face_detector_model-weights_manifest.json`
   - `tiny_face_detector_model-shard1`
   - `face_landmark_68_model-weights_manifest.json`
   - `face_landmark_68_model-shard1`

---

## 💻 Usage

### Running Locally

1. **Start the backend server**
   ```bash
   cd server
   npm start
   ```
   Server runs on `http://localhost:5000`

2. **Start the frontend (in a new terminal)**
   ```bash
   cd client
   npm run dev
   ```
   Frontend runs on `http://localhost:5173`

3. **Open your browser**
   
   Navigate to `http://localhost:5173` and allow camera access when prompted.

### Using the Application

1. Enter your job role (e.g., "Frontend Developer")
2. Select your experience level (Beginner/Intermediate/Advanced)
3. Enter your tech stack (e.g., "React, JavaScript, CSS")
4. Click "Generate Questions"
5. Allow camera access for proctoring
6. Answer all 10 questions within 30 minutes
7. Submit to see your detailed performance summary

---

## 📸 Screenshots

*Add screenshots here after deployment*

---

## 📂 Project Structure

```
ai-interview-saas/
│
├── client/                    # React frontend
│   ├── public/
│   │   └── models/           # Face detection AI models
│   ├── src/
│   │   ├── components/
│   │   │   ├── Proctor.jsx          # Face proctoring component
│   │   │   ├── QuestionForm.jsx     # Input form component
│   │   │   └── ScoreSummary.jsx     # Results screen
│   │   ├── pages/
│   │   │   ├── Home.jsx             # Landing page
│   │   │   └── Dashboard.jsx        # Interview page
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── server/                    # Node.js backend
│   ├── index.js              # Express server + Groq AI integration
│   ├── .env                  # Environment variables (not tracked)
│   └── package.json
│
├── .gitignore
└── README.md
```

---

## 🔐 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `GROQ_API_KEY` | Your Groq API key for AI question generation | Yes |
| `PORT` | Backend server port (default: 5000) | No |

---

## 🎓 What I Learned

This project was built from scratch as a learning experience. Key learnings include:

- Full-stack development with React and Node.js
- AI API integration (Groq LLaMA 3)
- Computer vision with face-api.js
- Real-time data processing and state management
- RESTful API design
- Environment variable security
- Git version control and GitHub workflow

---

## 📝 License

This project is licensed under the MIT License.

---

## 👤 Author

**Pranay Bandaru**

- GitHub: [@pranaybandaru11-code](https://github.com/pranaybandaru11-code)
- Project Link: [AI Interview SaaS](https://github.com/pranaybandaru11-code/ai-interview-saas)

---

## 🙏 Acknowledgments

- [Groq](https://groq.com) for the LLaMA AI API
- [face-api.js](https://github.com/justadudewhohacks/face-api.js) for face detection
- [Tailwind CSS](https://tailwindcss.com) for styling
- [Vite](https://vitejs.dev) for blazing fast development

---

⭐ **If you found this project helpful, please consider giving it a star!**