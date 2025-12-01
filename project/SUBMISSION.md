# Mini Course Subscription Application - Black Friday Edition

A full-stack course subscription platform built with React, TypeScript, Supabase, and Edge Functions.

## Features

- **Authentication System**: Secure signup/login with Supabase Auth
- **Course Catalog**: Browse 5 diverse courses (free and paid)
- **Subscription Management**: Subscribe to courses with promo code support
- **My Courses**: View all enrolled courses with subscription details
- **Promo Code System**: Apply BFSALE25 for 50% discount on paid courses
- **Responsive Design**: Clean, modern UI with Tailwind CSS
- **Toast Notifications**: User feedback for all actions
- **Protected Routes**: Auth-based access control

## Tech Stack

**Frontend:**
- React 18 with TypeScript
- Tailwind CSS for styling
- Lucide React for icons
- Vite for build tooling

**Backend:**
- Supabase Database (PostgreSQL)
- Supabase Auth for authentication
- Supabase Edge Functions for subscription logic
- Row Level Security (RLS) policies

## Test User Credentials

You can create new accounts or use these test credentials:

**Test Account 1:**
- Email: `demo@learnhub.com`
- Password: `demo123`

**Test Account 2:**
- Email: `student@learnhub.com`
- Password: `student123`

**Note:** Since email confirmation is disabled, you can create any account instantly with any email/password combination (minimum 6 characters for password).

## Project Structure

```
src/
├── components/
│   ├── CourseCard.tsx      # Course card component
│   ├── Navbar.tsx          # Navigation bar
│   └── Toast.tsx           # Toast notification component
├── contexts/
│   └── AuthContext.tsx     # Authentication context
├── lib/
│   └── supabase.ts         # Supabase client and types
├── pages/
│   ├── Login.tsx           # Login page
│   ├── Signup.tsx          # Signup page
│   ├── Home.tsx            # Course listing page
│   ├── CourseDetail.tsx    # Course details and subscription
│   └── MyCourses.tsx       # User's enrolled courses
├── App.tsx                 # Main app with routing
└── main.tsx                # App entry point
```

## Database Schema

**courses table:**
- id (uuid, primary key)
- title (text)
- description (text)
- price (numeric) - 0 for free courses
- image_url (text, optional)
- created_at (timestamp)

**subscriptions table:**
- id (uuid, primary key)
- user_id (uuid, foreign key to auth.users)
- course_id (uuid, foreign key to courses)
- price_paid (numeric)
- subscribed_at (timestamp)
- Unique constraint on (user_id, course_id)

## Key Features Implemented

### 1. Authentication
- Signup with email, password, and optional name
- Login with email and password
- Automatic session management
- Sign out functionality
- Form validation and error handling

### 2. Course Browsing (Home Page)
- Grid layout of all available courses
- Course cards showing title, description, price, and image
- Free courses clearly marked with green badge
- Paid courses show price with dollar sign
- Click to view course details

### 3. Course Detail Page
- Full course information display
- Dynamic subscription logic:
  - **Free Courses**: Instant subscribe button
  - **Paid Courses**:
    - Promo code input field
    - Apply promo code button
    - Subscribe button (disabled until valid promo applied)
- Real-time price calculation with discount
- Shows original and discounted prices
- Prevents duplicate subscriptions
- Success feedback and navigation to My Courses

### 4. Promo Code System
- Valid code: **BFSALE25** (50% discount)
- Frontend validation with visual feedback
- Backend verification for security
- Price calculation shows both original and discounted prices
- Green success indicator when applied

### 5. My Courses Page
- Grid display of all enrolled courses
- Shows price paid (including discounted price)
- Displays enrollment date
- Empty state for users with no courses
- Course thumbnails and descriptions

### 6. Edge Function (Backend API)
- `/functions/v1/subscribe` endpoint
- JWT authentication
- Course type validation (free vs paid)
- Promo code validation
- Duplicate subscription prevention
- Calculates final price with discount
- Creates subscription records
- Comprehensive error handling

## Security Features

- **Row Level Security (RLS)** on all tables
- **Authentication required** for all course operations
- **JWT token verification** in edge functions
- **Promo code validation** on backend
- **Duplicate subscription prevention**
- **User-specific data access** enforced by RLS policies

## Design Highlights

- Clean, modern interface with slate color scheme
- Smooth transitions and hover effects
- Loading states for better UX
- Toast notifications for user feedback
- Responsive grid layouts
- Professional typography and spacing
- Card-based design for courses
- Gradient backgrounds for auth pages
- Image placeholders with course initials

## How It Works

1. **Sign Up / Login**: Create an account or sign in
2. **Browse Courses**: View all available courses on the home page
3. **View Details**: Click any course to see full details
4. **Subscribe**:
   - Free courses: Click "Subscribe for Free"
   - Paid courses: Enter promo code "BFSALE25", apply it, then subscribe
5. **View Your Courses**: Navigate to "My Courses" to see all enrolled courses
6. **Sign Out**: Use the sign out button in the navbar

## Promo Code Usage

For paid courses:
1. Enter promo code: `BFSALE25`
2. Click "Apply"
3. See 50% discount applied
4. Click "Subscribe Now"

## Sample Courses

1. **React Fundamentals** - Free
2. **Advanced TypeScript Patterns** - $49.99 (with promo: $24.99)
3. **Node.js API Development** - $39.99 (with promo: $19.99)
4. **CSS Grid & Flexbox Mastery** - Free
5. **Full-Stack Web Development** - $79.99 (with promo: $39.99)

## Build and Run

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Type check
npm run typecheck
```

## Environment Variables

The application uses Supabase with the following environment variables (already configured):
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`

## Notes

- No real payments are processed - this is a mock system
- The promo code BFSALE25 is hardcoded for the Black Friday promotion
- Email confirmation is disabled for easy testing
- All subscriptions are tracked in the database
- Users cannot subscribe to the same course twice
- Images are sourced from Pexels
