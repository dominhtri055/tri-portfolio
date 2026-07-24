# Tri Do Portfolio

A personal software developer portfolio built with **Next.js**, **TypeScript**, and **Tailwind CSS**.

This portfolio is designed around the concept of **Skills in Action**. Instead of only listing technical skills, each skill connects directly to the projects where it was used.

## Live Demo

Portfolio: [tri-portfolio-pi.vercel.app/ ](https://tri-portfolio-pi.vercel.app)

GitHub: https://github.com/dominhtri055

## About

I am Tri Do, a recent Software Development graduate based in Moncton, NB. I focus on full-stack development, backend APIs, mobile applications, and database-driven projects.

This portfolio highlights my practical development experience through real projects, including backend APIs, mobile applications, frontend JavaScript apps, and web applications.

## Features

- Modern dark purple theme
- Interactive skill filtering
- Skills connected to related projects
- Project evidence cards
- Work experience section
- Resume download button
- Responsive layout for desktop and mobile
- Personal favicon/logo

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- HTML
- CSS
- JavaScript

## Main Concept

The main idea of this portfolio is:

```text
Skill → Project Evidence
```

For example:

- **Express.js** connects to the License Plate Assignment API
- **MongoDB** connects to backend database projects
- **React Native** connects to ShopPilot Mobile App
- **Spring Boot** connects to Restaurant Event Management App
- **JavaScript** connects to Tax Calculator App

This helps recruiters see not only what technologies I know, but also how I used them in real projects.

## Featured Projects

### License Plate Assignment API

A backend REST API for generating, assigning, verifying, and revoking Ontario-style license plates based on valid VIN numbers.

**Tech used:**

- Node.js
- Express.js
- TypeScript
- MongoDB
- Mongoose
- REST API
- API key authentication
- Postman

**Repository:**  
https://github.com/dominhtri055/COMP9784-87486-Final-Project

---

### ShopPilot Mobile App

A mobile app built with React Native and Expo Router, including session checking, login redirect flow, and dashboard navigation.

**Tech used:**

- React Native
- Expo
- Expo Router
- TypeScript
- AsyncStorage
- Mobile UI

**Repository:**  
https://github.com/dominhtri055/shoppilot-mobile

---

### Restaurant Event Management App

A Spring Boot web application for managing restaurant events with CRUD operations, validation, search filters, and archive logic.

**Tech used:**

- Java
- Spring Boot
- MySQL
- Thymeleaf
- MVC
- CRUD
- Validation

**Repository:**  
https://github.com/dominhtri055/restaurant-event-app

---

### Tax Calculator App

A frontend JavaScript app that calculates federal and provincial taxes based on user income.

**Tech used:**

- HTML
- CSS
- JavaScript
- DOM Manipulation
- Forms
- Validation
- Fetch API

**Repository:**  
https://github.com/dominhtri055/tax-calculator

---

### Local Business Website Demo

A planned WordPress and SEO-focused website demo for local business use cases.

**Tech used:**

- WordPress
- SEO
- HTML
- CSS
- Responsive Design
- Figma

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/dominhtri055/tri-portfolio.git
cd tri-portfolio
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

Open the project in your browser:

```text
http://localhost:3000
```

## Build for Production

```bash
npm run build
```

Then run the production server:

```bash
npm start
```

## Project Structure

```text
tri-portfolio/
├── app/
│   ├── api/
│   │   └── resume/
│   │       └── route.ts
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── public/
│   └── resume.pdf
├── README.md
├── package.json
├── postcss.config.mjs
├── next.config.ts
└── tsconfig.json
```

## Resume Download

The portfolio includes a resume download button.

The resume file should be placed at:

```text
public/resume.pdf
```

If using the API download route, the resume is served from:

```text
/app/api/resume/route.ts
```

## Deployment

This project is intended to be deployed on **Vercel**.

After pushing to GitHub:

1. Go to Vercel
2. Import the GitHub repository
3. Select Next.js as the framework
4. Deploy

Every push to the main branch will automatically trigger a new deployment.

## Contact

**Tri Do**

- GitHub: https://github.com/dominhtri055
- LinkedIn: https://www.linkedin.com/in/trido2908/
- Email: dominhtri055@gmail.com

## License

This project is for personal portfolio use.
