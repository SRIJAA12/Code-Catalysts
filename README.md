# ✈️ Traveloop
<img width="1536" height="1024" alt="ChatGPT Image May 10, 2026, 05_18_51 PM" src="https://github.com/user-attachments/assets/7708aef7-11a7-4013-afe4-73b1fd002d43" />


> **Your Journey, Organized Beautifully.**

![Traveloop Architecture and Flow](architecture.jpg)
*(Note: Please save the provided image as `architecture.jpg` in the root directory for it to display above)*

Welcome to **Traveloop**, a comprehensive, AI-powered travel planning platform designed to make organizing your trips effortless, collaborative, and beautiful. 

---

## 🗺️ Website Flow

Traveloop offers a seamless, step-by-step experience for travelers:

1. **Login / Signup**  
   Secure authentication using Email or Google Sign-In.
2. **Dashboard**  
   Get an overview of your trips, budget stats, and recent activities.
3. **My Trips**  
   Manage all your upcoming, completed, and draft trips in one place.
4. **Trip Creator**  
   Simple, step-by-step trip creation (Where to? Dates? Budget?).
5. **Itinerary Builder**  
   Build a detailed, day-wise itinerary with drag-and-drop activities.
6. **Tools & Features**  
   Everything you need in one platform:
   - 🤖 **AI Assistant:** Get intelligent travel help and recommendations.
   - 💰 **Budget:** Track expenses and manage your wallet.
   - 🧳 **Packing List:** Keep track of what to pack.
   - 📓 **Journal:** Write memories and notes.
   - 🌍 **Explore:** Discover new places dynamically based on location.
7. **Share & Export**  
   Share your itinerary via a public link (with QR code) or export it as a high-quality PDF.

---

## 💻 Tech Stack

We built Traveloop using modern, scalable, and secure technologies.

### Frontend
- **Next.js (App Router)** & **React**: Fast, modern, and SEO-friendly web framework.
- **Tailwind CSS**: Beautiful, responsive, and customizable UI design.

### Backend & Database
- **Express.js API Backend Server**: RESTful APIs, secure middleware, and robust routing.
- **PostgreSQL (Supabase)** & **Prisma ORM**: Relational, scalable, and reliable database architecture.

### Authentication & Services
- **Firebase**: Secure and scalable Email/Password and Google authentication.
- **Gemini API**: AI-powered travel assistance and intelligent itinerary suggestions.
- **Leaflet**: Interactive maps and routing.
- **jsPDF & html2canvas**: Professional-grade PDF exports.
- **Recharts**: Beautiful analytics and budget charts.

---

## ✨ Core Features

- 🛡️ **Secure**: Protected routes and Firebase Authentication.
- 📈 **Scalable**: Built with a scalable microservices-inspired architecture.
- ⚡ **Real-Time**: Live data, updates, and dynamic UI rendering.
- 🧠 **AI-Powered**: Integrated Gemini AI for intelligent travel assistance.
- 📊 **Analytics**: Beautiful charts for budget and trip insights.
- 🤝 **Collaborative**: Share trips and collaborate easily with friends.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+)
- PostgreSQL Database (or Supabase project)
- Firebase Project setup
- Google Gemini API Key

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/traveloop.git
   cd traveloop
   ```

2. **Install dependencies for Frontend & Backend:**
   ```bash
   # Frontend
   cd traveloop-app
   npm install

   # Backend
   cd ../backend
   npm install
   ```

3. **Set up Environment Variables:**
   Create a `.env.local` file in the frontend and an `.env` file in the backend. Add your respective API keys (Firebase, Gemini, Database URL, etc.).

4. **Run Database Migrations:**
   ```bash
   cd backend
   npx prisma migrate dev
   ```

5. **Start the Development Servers:**
   ```bash
   # Run Frontend (http://localhost:3000)
   cd traveloop-app
   npm run dev

   # Run Backend (http://localhost:5000)
   cd backend
   npm run dev
   ```

---
*Built with ❤️ for travelers everywhere.*
