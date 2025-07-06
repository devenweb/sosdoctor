/*
  # Insert sample data

  1. Sample Data
    - Create sample doctor profiles
    - Create sample appointments for testing

  Note: This migration adds sample data for development and testing purposes.
  You can remove this file or modify it based on your needs.
*/

-- Insert sample doctor profiles (these will need to be created after actual users sign up)
-- This is just for reference - actual data should be inserted through the application

-- Sample specializations and data that can be used when creating doctor profiles
INSERT INTO profiles (id, email, full_name, role, phone, address) VALUES
  ('00000000-0000-0000-0000-000000000001', 'dr.smith@example.com', 'Dr. Sarah Smith', 'doctor', '+1-555-0101', '123 Medical Center Dr, City, State 12345'),
  ('00000000-0000-0000-0000-000000000002', 'dr.johnson@example.com', 'Dr. Michael Johnson', 'doctor', '+1-555-0102', '456 Health Plaza, City, State 12345'),
  ('00000000-0000-0000-0000-000000000003', 'dr.williams@example.com', 'Dr. Emily Williams', 'doctor', '+1-555-0103', '789 Care Center Ave, City, State 12345')
ON CONFLICT (id) DO NOTHING;

-- Insert corresponding doctor records
INSERT INTO doctors (profile_id, specialization, license_number, years_experience, education, consultation_fee, bio) VALUES
  ('00000000-0000-0000-0000-000000000001', 'Cardiology', 'MD12345', 15, 'Harvard Medical School, MD', 200, 'Experienced cardiologist specializing in heart disease prevention and treatment.'),
  ('00000000-0000-0000-0000-000000000002', 'General Medicine', 'MD12346', 10, 'Johns Hopkins University, MD', 150, 'General practitioner with focus on preventive care and family medicine.'),
  ('00000000-0000-0000-0000-000000000003', 'Pediatrics', 'MD12347', 8, 'Stanford Medical School, MD', 175, 'Pediatrician dedicated to providing comprehensive care for children and adolescents.')
ON CONFLICT (license_number) DO NOTHING;