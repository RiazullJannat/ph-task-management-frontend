# 🚀 TaskFlow Frontend - The Saga

Welcome to the **TaskFlow** Frontend repository! This project is a minimalist futuristic Task Management and Medical Image Annotation platform built with **Next.js**, **Tailwind CSS**, and **Konva.js**.

---

## ⚔️ The Villains We Faced (Difficulties & Triumphs)

*(A note from the developer: Every great saga has its villains. Here are the dragons we had to slay to bring this project to life.)*

### 🐉 Villain 1: Implementing the Medical Image Annotation Engine
**The Battle:** 
During the frontend development, I faced a significant challenge with the annotation feature. The requirements were unique, and there weren't many clear guidelines or tutorials available on YouTube or tech blogs.

**The Victory:** 
However, by leveraging AI assistance and experimenting, I successfully figured it out and completed the implementation.

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
git clone https://github.com/RiazullJannat/task-flow-frontend.git
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
