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

📸 Screenshots
<img width="1919" height="873" alt="Screenshot 2025-12-01 201031" src="https://github.com/user-attachments/assets/d547cfee-000c-4004-9fc6-c8f200d99634" />
<img width="1902" height="870" alt="Screenshot 2025-12-01 201006" src="https://github.com/user-attachments/assets/3149a0c8-014d-47f1-983a-d6bcc4130324" />
<img width="1919" height="867" alt="Screenshot 2025-12-01 200948" src="https://github.com/user-attachments/assets/88a02f8a-c0c3-4f7a-a09e-0dc582747bd2" />
