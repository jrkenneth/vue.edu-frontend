# EduClass Frontend API
An app to book lessons for after-school tutoring - Vue.js Frontend

## Features
- Browse 10+ available classes with details (subject, location, price, available slots)
- Sort lessons by subject, location, price, or available slots
- Full-text search functionality
- Shopping cart with add/remove functionality
- Checkout with form validation (name: letters only, phone: numbers only)
- Responsive design with Bootstrap

## Live Demo
(https://jrkenneth.github.io/vue.edu-frontend/)

## Tech Stack
- Vue.js 3
- Bootstrap 5
- HTML5 & CSS3

## Installation & Development

### Local Setup
1. Clone this repository:
```bash
    git clone https://github.com/jrkenneth/vue.edu-frontend.git
```

2. Open `index.html` in a web browser

### Notes
- No build process needed - this is a standalone HTML file
- Future versions will integrate with Express.js backend API

## Project Structure
```
vue.edu-frontend/
├── css/
    ├── styles.css
├── js/
    ├── app.js
├── index.html      (Main application file)
├── README.md
└── .gitignore
```

## Backend Integration
🔗 Backend Repository: https://github.com/jrkenneth/vue.edu-backend
🌐 Live API: https://edu-backend-ken.onrender.com/
📚 All Lessons: https://edu-backend-ken.onrender.com/lessons

### API Endpoints Used
- `GET /lessons` - Fetch all available lessons
- `GET /search?q=query` - Search lessons in real-time
- `POST /orders` - Submit new order
- `PUT /lessons/:id` - Update lesson slots after purchase

### Features
- Real-time search powered by backend
- Data persistence with MongoDB Atlas
- Order submission and tracking
- Automatic slot updates after purchase