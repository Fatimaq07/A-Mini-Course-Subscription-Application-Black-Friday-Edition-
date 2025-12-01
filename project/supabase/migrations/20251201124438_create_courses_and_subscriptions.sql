/*
  # Mini Course Subscription Application Schema

  1. New Tables
    - `courses`
      - `id` (uuid, primary key)
      - `title` (text)
      - `description` (text)
      - `price` (numeric) - 0 for free courses
      - `image_url` (text, optional)
      - `created_at` (timestamp)
    
    - `subscriptions`
      - `id` (uuid, primary key)
      - `user_id` (uuid, foreign key to auth.users)
      - `course_id` (uuid, foreign key to courses)
      - `price_paid` (numeric)
      - `subscribed_at` (timestamp)
      - Unique constraint on (user_id, course_id)
  
  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to:
      - Read all courses
      - Create their own subscriptions
      - Read their own subscriptions
  
  3. Sample Data
    - Insert 5 sample courses (mix of free and paid)
*/

-- Create courses table
CREATE TABLE IF NOT EXISTS courses (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  description text NOT NULL,
  price numeric NOT NULL DEFAULT 0,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create subscriptions table
CREATE TABLE IF NOT EXISTS subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  course_id uuid NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  price_paid numeric NOT NULL DEFAULT 0,
  subscribed_at timestamptz DEFAULT now(),
  UNIQUE(user_id, course_id)
);

-- Enable RLS
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;

-- Policies for courses table
CREATE POLICY "Anyone can view courses"
  ON courses FOR SELECT
  TO authenticated
  USING (true);

-- Policies for subscriptions table
CREATE POLICY "Users can view own subscriptions"
  ON subscriptions FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create own subscriptions"
  ON subscriptions FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Insert sample courses
INSERT INTO courses (title, description, price, image_url) VALUES
  ('React Fundamentals', 'Master the basics of React including components, props, state, and hooks. Perfect for beginners starting their React journey.', 0, 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Advanced TypeScript Patterns', 'Deep dive into advanced TypeScript features including generics, decorators, and type manipulation. Includes real-world examples.', 49.99, 'https://images.pexels.com/photos/6424586/pexels-photo-6424586.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Node.js API Development', 'Build scalable REST APIs with Node.js and Express. Learn authentication, validation, error handling, and deployment.', 39.99, 'https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('CSS Grid & Flexbox Mastery', 'Complete guide to modern CSS layouts. Create responsive designs with Grid and Flexbox. Includes practical projects.', 0, 'https://images.pexels.com/photos/6804079/pexels-photo-6804079.jpeg?auto=compress&cs=tinysrgb&w=800'),
  ('Full-Stack Web Development', 'Comprehensive course covering frontend, backend, databases, and deployment. Build 3 real-world applications from scratch.', 79.99, 'https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=800')
ON CONFLICT DO NOTHING;
