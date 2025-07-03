Overview
This is a modern, responsive Single Page Application built with React 18 and Tailwind CSS that consumes a Laravel backend API for a blog system.

It supports:

User registration & login with role-based access (Admin/User)

Viewing all posts with search/filter

Viewing post details with comments

Creating new posts

Adding comments on posts

Dark mode toggle

Responsive design for desktop, tablet, and mobile

Features
Authentication with JWT (stored in Zustand state)

Role-based dashboard and route protection

Form validation with React Hook Form and Yup

API calls using Axios

Real-time search with debounce

Toast notifications for user feedback

Smooth animations with AOS

Clean code with reusable components and Zustand state management

Tech Stack
React 18+

Zustand (state management)

React Router v6

Axios (HTTP client)

Tailwind CSS (styling)

React Hook Form + Yup (form validation)

AOS (animations)

React Toastify (notifications)

Getting Started
Clone the repo:

bash
Copy
Edit
git clone https://github.com/Sami0988/REACT_BLOG.git
cd REACT_BLOG

Install dependencies

bash
Copy
Edit
npm install
Set up environment variables:

Create a .env file in the root with:
ini
Copy
Edit
VITE_API_BASE_URL=http://localhost:8000
Run the app:

bash
Copy
Edit
npm run dev
Open in browser:

Visit http://localhost:5173

Usage

Register a new user or login

Navigate between dashboards based on user role

Browse and search posts

View post details and comments

Add posts and comments when logged in

Use the dark mode toggle in the header

Notes
This frontend requires the Laravel backend API running on http://localhost:8000

JWT tokens are managed in the frontend state for secure API calls

Role-based access prevents unauthorized users from certain pages

Future Improvements
Add unit and integration tests with Jest and React Testing Library

Pagination for posts

More admin features

#email and password
 Admin
   email:admin@example.com
   password:password
user
  email:user@example.com
  password:password
