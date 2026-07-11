# 🚀 TaskFlow Frontend - The Saga

Welcome to the **TaskFlow** Frontend repository! This project is a minimalist futuristic Task Management and Medical Image Annotation platform built with **Next.js**, **Tailwind CSS**, and **Konva.js**.

---

## ⚔️ The Villains We Faced (Difficulties & Triumphs)

*(A note from the developer: Every great saga has its villains. Here are the dragons we had to slay to bring this project to life.)*

### 🐉 Villain 1: [Write the name of the Bug or Difficulty here]
**The Battle (What went wrong):** 
[Describe the issue, how it broke things, or why it was so frustrating to deal with.]

**The Victory (How it was solved):** 
[Describe how you overcame it! Was it deep-diving into documentation? A specific StackOverflow post? Or the power of friendship with an AI? Explain your triumphant solution!]

### 🐉 Villain 2: [Write the name of the Bug or Difficulty here]
**The Battle (What went wrong):** 
[Describe your second difficulty here.]

**The Victory (How it was solved):** 
[Describe how you defeated this villain.]

*(Feel free to add more villains as you recall them!)*

---

## 🛠️ Environment Requirements

Before you begin your journey to run this project, make sure your environment is equipped with the right tools.

- **Node.js Version:** `v18.17.0` or higher (Recommended: `v20.x`)
- **Package Manager:** `pnpm` (Recommended) or `npm` / `yarn`
- **Backend Compatibility:** Ensure the TaskFlow Backend server is running. The backend requires **Python 3.10+**.

---

## 🏃‍♂️ Detailed Steps to Run the Project

Follow these exact steps to run the frontend application on your local machine:

### Step 1: Clone the Repository
```bash
git clone https://github.com/RiazullJannat/ph-task-management-frontend.git
cd ph-task-management-frontend
```

### Step 2: Install Dependencies
We highly recommend using `pnpm` for faster and more reliable installations.
```bash
pnpm install
# or if you use npm:
npm install
```

### Step 3: Setup Environment Variables
Create a `.env` or `.env.local` file in the root directory and configure your backend API endpoint.
```env
NEXT_PUBLIC_BASE_API=http://localhost:8000/api
```
*(Adjust the URL based on where your backend is running).*

### Step 4: Run the Development Server
Fire up the Next.js development server:
```bash
pnpm dev
# or if you use npm:
npm run dev
```

### Step 5: Open the App
Open your browser and navigate to:
[http://localhost:3000](http://localhost:3000)

---

## 🏗️ Build for Production
To create an optimized production build, run:
```bash
pnpm build
pnpm start
```
