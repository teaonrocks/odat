# Poverty Simulation App

## Fostering Empathy Through Interactive Experience

[![Next.js](https://img.shields.io/badge/Next.js-Black?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-black?style=for-the-badge&logo=github&logoColor=white)](https://ui.shadcn.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)

<!-- ---

## 🚀 Live Demo

[Link to your deployed Vercel app here] (e.g., `https://poverty-simulation-app.vercel.app/`)

--- -->

## ✨ Project Overview

The **Poverty Simulation App** is a powerful educational tool designed to foster empathy and understanding for the challenges faced by low-income single parents. Inspired by traditional spreadsheet-based simulations, this web application transforms a static exercise into a dynamic, real-time, multi-participant experience akin to Kahoot.

Participants embark on a 14-day journey, making critical daily choices that impact their financial balance and reveal the complex, interconnected struggles of poverty. The host controls the pace, presenting scenarios, while participants interact on their own devices.

This app aims to bridge the "empathy gap" by providing a tangible, impactful experience that drives meaningful reflection and discussion.

## 🎯 Key Features

- **Real-Time Engagement:** Utilizes Google Firebase (Firestore) for instant synchronization between host and all participants.
- **Kahoot-Style Interaction:** Intuitive interface for hosts to control scenarios and participants to make choices on their devices.
- **Individualized Tracking:** Each participant maintains their own balance and choice history, seeing immediate consequences.
- **Comprehensive Scenarios:** 14 distinct daily scenarios covering critical areas like housing, transportation, healthcare, childcare, food, and social pressures.
- **Responsive Design:** Fully accessible and optimized for desktop, tablet, and mobile devices.
- **Scalable & Cost-Effective:** Built on a serverless architecture (Firebase & Vercel) allowing for hundreds of concurrent users at virtually no running cost.
- **Data Management:** Hosts can securely and permanently delete all room and participant data after a session is complete.
- **Built with TypeScript:** Enhances code quality, readability, and maintainability.

## 🛠️ Tech Stack

- **Framework:** [Next.js 15 (App Router)](https://nextjs.org/)
- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) & [Tailwind CSS](https://tailwindcss.com/)
- **Real-time Database:** [Google Firebase (Firestore)](https://firebase.google.com/docs/firestore)
- **Deployment:** [Vercel](https://vercel.com/)
- **Utilities:** `uuid` for unique IDs, `sonner` for beautiful toasts.
