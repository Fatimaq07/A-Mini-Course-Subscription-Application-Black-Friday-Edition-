# A-Mini-Course-Subscription-Application-Black-Friday-Edition-
A full-stack web application where users can sign up, explore courses, and subscribe based on whether a course is free or paid. The project includes a complete frontend, backend, database, authentication system, and cloud hosting setup.
🚀 Features
🔐 Authentication

User Signup and Login

JWT-based authentication

Protected routes

Dummy test accounts included

🎓 Course System

Home page displaying at least 5 mock courses

Free & Paid course support

Course Details page

Dynamic subscription options

💳 Subscription Logic

Free courses → Instant subscription

Paid courses → Requires promo code

Valid promo code: BFSALE25 → 50% mock discount

Mock pricing only — no real payment integration

📘 My Courses Page

Displays:

Course title

Price paid

Subscription date

Thumbnail (optional)

🛠 Tech Stack
Frontend

React

React Router

TailwindCSS / CSS

JWT handling

Toast notifications

Backend

Supabase (PostgreSQL + Auth + API + Row Level Policies)


Database

Supabase PostgreSQL

Collections / Tables:

users

courses

subscriptions


📡 API Endpoints
Auth
Method	Endpoint	Description
POST	/auth/signup	Register new user
POST	/auth/login	Login & return token
Courses
Method	Endpoint	Description
GET	/courses	Fetch all courses
GET	/courses/:id	Fetch course by ID
Subscriptions
Method	Endpoint	Description
POST	/subscribe	Subscribe to free/paid course
GET	/my-courses	All courses subscribed by user
