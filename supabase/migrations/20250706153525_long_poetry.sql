/*
  # Create doctors table

  1. New Tables
    - `doctors`
      - `id` (uuid, primary key)
      - `profile_id` (uuid, foreign key to profiles)
      - `specialization` (text)
      - `license_number` (text, unique)
      - `years_experience` (integer)
      - `education` (text)
      - `hospital_affiliation` (text, nullable)
      - `consultation_fee` (numeric)
      - `availability_hours` (text)
      - `rating` (numeric, default 0)
      - `total_reviews` (integer, default 0)
      - `bio` (text, nullable)
      - `languages` (text array)
      - `is_available` (boolean, default true)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `doctors` table
    - Add policy for all users to read doctor profiles
    - Add policy for doctors to update their own profile
*/

-- Create doctors table
CREATE TABLE IF NOT EXISTS doctors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  profile_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  specialization text NOT NULL,
  license_number text UNIQUE NOT NULL,
  years_experience integer NOT NULL DEFAULT 0,
  education text NOT NULL,
  hospital_affiliation text,
  consultation_fee numeric NOT NULL DEFAULT 0,
  availability_hours text NOT NULL DEFAULT '9:00 AM - 5:00 PM',
  rating numeric DEFAULT 0 CHECK (rating >= 0 AND rating <= 5),
  total_reviews integer DEFAULT 0,
  bio text,
  languages text[] DEFAULT ARRAY['English'],
  is_available boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE doctors ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can view available doctors"
  ON doctors
  FOR SELECT
  TO authenticated
  USING (is_available = true);

CREATE POLICY "Doctors can view own profile"
  ON doctors
  FOR SELECT
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Doctors can update own profile"
  ON doctors
  FOR UPDATE
  TO authenticated
  USING (profile_id = auth.uid());

CREATE POLICY "Doctors can insert own profile"
  ON doctors
  FOR INSERT
  TO authenticated
  WITH CHECK (profile_id = auth.uid());

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_doctors_updated_at
  BEFORE UPDATE ON doctors
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_doctors_profile_id ON doctors(profile_id);
CREATE INDEX IF NOT EXISTS idx_doctors_specialization ON doctors(specialization);
CREATE INDEX IF NOT EXISTS idx_doctors_is_available ON doctors(is_available);