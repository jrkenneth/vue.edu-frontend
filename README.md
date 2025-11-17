# vue.edu-frontend
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
educlass-frontend/
├── css/
    ├── styles.css
├── images/
├── js/
    ├── app.js
├── index.html      (Main application file)
├── README.md
└── .gitignore
```

## Future Integration
- Backend API: Express.js with MongoDB
- Search functionality will be powered by backend
- Cart data will be persisted to backend