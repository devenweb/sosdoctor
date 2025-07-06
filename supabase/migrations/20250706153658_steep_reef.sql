/*
  # Sample Data Setup (Optional)
  
  This migration provides sample data structure but does not insert actual records
  since profiles must be created through Supabase Auth signup process.
  
  To add sample doctors:
  1. Create doctor accounts through the application signup
  2. Update their profiles to have role = 'doctor'
  3. Insert corresponding doctor records in the doctors table
*/

-- This migration file is intentionally empty of INSERT statements
-- Sample data should be created through the application's signup process

-- Example of how to create a doctor profile after signup:
-- 1. User signs up through the application (creates auth.users record and triggers profile creation)
-- 2. Update the profile role: UPDATE profiles SET role = 'doctor' WHERE id = 'user_id_from_auth';
-- 3. Insert doctor details: INSERT INTO doctors (profile_id, specialization, license_number, ...) VALUES (...);

-- For testing purposes, you can manually create users through Supabase Auth
-- and then use the application to complete their profiles