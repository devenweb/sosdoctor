/*
  # Create appointments table

  1. New Tables
    - `appointments`
      - `id` (uuid, primary key)
      - `patient_id` (uuid, foreign key to profiles)
      - `doctor_id` (uuid, foreign key to doctors)
      - `appointment_date` (date)
      - `appointment_time` (time)
      - `status` (enum: scheduled/completed/cancelled/in_progress)
      - `type` (enum: in_person/video_call)
      - `symptoms` (text, nullable)
      - `notes` (text, nullable)
      - `prescription` (text, nullable)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `appointments` table
    - Add policy for patients to view their own appointments
    - Add policy for doctors to view appointments assigned to them
    - Add policy for patients to create appointments
    - Add policy for doctors to update appointment details
*/

-- Create custom types
CREATE TYPE appointment_status AS ENUM ('scheduled', 'completed', 'cancelled', 'in_progress');
CREATE TYPE appointment_type AS ENUM ('in_person', 'video_call');

-- Create appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  patient_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  doctor_id uuid REFERENCES doctors(id) ON DELETE CASCADE NOT NULL,
  appointment_date date NOT NULL,
  appointment_time time NOT NULL,
  status appointment_status DEFAULT 'scheduled',
  type appointment_type NOT NULL,
  symptoms text,
  notes text,
  prescription text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Patients can view own appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (patient_id = auth.uid());

CREATE POLICY "Doctors can view their appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (
    doctor_id IN (
      SELECT id FROM doctors WHERE profile_id = auth.uid()
    )
  );

CREATE POLICY "Patients can create appointments"
  ON appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (patient_id = auth.uid());

CREATE POLICY "Patients can update own appointments"
  ON appointments
  FOR UPDATE
  TO authenticated
  USING (patient_id = auth.uid());

CREATE POLICY "Doctors can update their appointments"
  ON appointments
  FOR UPDATE
  TO authenticated
  USING (
    doctor_id IN (
      SELECT id FROM doctors WHERE profile_id = auth.uid()
    )
  );

-- Create trigger to automatically update updated_at
CREATE TRIGGER update_appointments_updated_at
  BEFORE UPDATE ON appointments
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(appointment_date);
CREATE INDEX IF NOT EXISTS idx_appointments_status ON appointments(status);

-- Create constraint to prevent double booking
CREATE UNIQUE INDEX IF NOT EXISTS idx_appointments_doctor_datetime 
ON appointments(doctor_id, appointment_date, appointment_time)
WHERE status != 'cancelled';