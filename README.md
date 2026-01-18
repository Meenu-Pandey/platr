# 🍽️ PLATR — Short-Form Food Discovery

PLATR is a **reel-first food discovery platform** that helps users decide what to eat in seconds using **short, vertical videos** instead of long reviews or static images.

Built as a **real-world MERN application** with clean architecture and production-style practices.

---

## 👀 Preview

### 🎬 Project Walkthrough & Demo
**Presentation Video:**  https://github.com/user-attachments/assets/53848271-e749-4c4e-8d5f-8e63e495f794

### 📱 App Preview
<img width="360" alt="PLATR App Preview 1" src="https://github.com/user-attachments/assets/16ee09cd-51c7-4cd6-b3c9-4a1ff390b195" />
<img width="360" alt="PLATR App Preview 2" src="https://github.com/user-attachments/assets/dbf7a745-3d96-4998-959c-e9f7a06052af" />

---

## 🚀 Why PLATR

Traditional food apps are slow:

- Text-heavy reviews  
- Outdated ratings  
- No visual context  

PLATR flips the model:

- 🎥 Short-form videos  
- ⚡ Faster food decisions  
- 📱 Mobile-first experience  

---

## ✨ Core Features

- Reel-style vertical video feed  
- JWT-based authentication  
- Creator uploads with metadata  
- Like, comment, and save functionality  
- Dish & restaurant tagging  
- Infinite scrolling feed  
- RESTful APIs with validation  
- Media storage via **ImageKit**  

---

## 🧠 Tech Stack

**Frontend**
- React  
- Tailwind CSS  
- Axios  
- React Router  

**Backend**
- Node.js  
- Express.js  
- MongoDB (Mongoose)  
- JWT Authentication  

**Infrastructure**
- ImageKit  
- Environment-based configuration  

---

## 🏗️ Architecture

Clean, modular structure with clear separation of concerns:
frontend/ → UI, routes, services
backend/ → controllers, models, routes, middleware


Designed to scale without rewriting core logic.

---

## 🔁 System Flow

1. User authenticates via JWT  
2. Protected APIs serve feed data  
3. Videos upload securely to ImageKit  
4. Metadata stored in MongoDB  
5. Engagement actions update feed state  

---

## 🛠️ Quick Start

## 🛠️ Clone Repository
```bash
git clone https://github.com/Meenu-Pandey/platr.git
cd platr

📦 Install Dependencies
cd backend && npm install
cd ../frontend && npm install


🔐 Environment Variables
Create a .env file inside the backend/ directory:
PORT=5000
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_secret
IMAGEKIT_PUBLIC_KEY=your_key
IMAGEKIT_PRIVATE_KEY=your_key
IMAGEKIT_URL_ENDPOINT=your_endpoint

▶️ Run the App
Backend
npx nodemon server.js

Frontend
npm run dev
