/*
  # Create comprehensive sample data for SOS Doctor

  1. Sample Users (Patients and Doctors)
    - 25 patients with complete profiles
    - 25 doctors with specializations and details
  
  2. Sample Appointments
    - 25 appointments with various statuses and types
  
  3. Security
    - All data respects RLS policies
    - Uses proper foreign key relationships
*/

-- First, we need to create some sample auth users
-- Note: In production, these would be created through the signup process
-- For development, we'll create them directly in auth.users

-- Insert sample auth users (patients)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES 
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111101', 'authenticated', 'authenticated', 'patient1@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "John Smith", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111102', 'authenticated', 'authenticated', 'patient2@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Sarah Johnson", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111103', 'authenticated', 'authenticated', 'patient3@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Michael Brown", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111104', 'authenticated', 'authenticated', 'patient4@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Emily Davis", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111105', 'authenticated', 'authenticated', 'patient5@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "David Wilson", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111106', 'authenticated', 'authenticated', 'patient6@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Jessica Miller", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111107', 'authenticated', 'authenticated', 'patient7@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Christopher Garcia", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111108', 'authenticated', 'authenticated', 'patient8@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Amanda Rodriguez", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111109', 'authenticated', 'authenticated', 'patient9@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "James Martinez", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111110', 'authenticated', 'authenticated', 'patient10@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Lisa Anderson", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111111', 'authenticated', 'authenticated', 'patient11@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Robert Taylor", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111112', 'authenticated', 'authenticated', 'patient12@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Michelle Thomas", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111113', 'authenticated', 'authenticated', 'patient13@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Kevin Jackson", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111114', 'authenticated', 'authenticated', 'patient14@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Nicole White", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111115', 'authenticated', 'authenticated', 'patient15@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Daniel Harris", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111116', 'authenticated', 'authenticated', 'patient16@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Ashley Martin", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111117', 'authenticated', 'authenticated', 'patient17@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Matthew Thompson", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111118', 'authenticated', 'authenticated', 'patient18@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Stephanie Garcia", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111119', 'authenticated', 'authenticated', 'patient19@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Andrew Clark", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111120', 'authenticated', 'authenticated', 'patient20@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Megan Rodriguez", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111121', 'authenticated', 'authenticated', 'patient21@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Joshua Lewis", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111122', 'authenticated', 'authenticated', 'patient22@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Samantha Lee", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111123', 'authenticated', 'authenticated', 'patient23@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Tyler Walker", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111124', 'authenticated', 'authenticated', 'patient24@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Rachel Hall", "role": "patient"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '11111111-1111-1111-1111-111111111125', 'authenticated', 'authenticated', 'patient25@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Brandon Allen", "role": "patient"}', false, '', '', '', '')
ON CONFLICT (id) DO NOTHING;

-- Insert sample auth users (doctors)
INSERT INTO auth.users (
  instance_id,
  id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  created_at,
  updated_at,
  raw_user_meta_data,
  is_super_admin,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) VALUES 
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222201', 'authenticated', 'authenticated', 'dr.smith@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Sarah Smith", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222202', 'authenticated', 'authenticated', 'dr.johnson@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Michael Johnson", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222203', 'authenticated', 'authenticated', 'dr.williams@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Emily Williams", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222204', 'authenticated', 'authenticated', 'dr.brown@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. David Brown", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222205', 'authenticated', 'authenticated', 'dr.davis@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Jennifer Davis", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222206', 'authenticated', 'authenticated', 'dr.miller@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Robert Miller", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222207', 'authenticated', 'authenticated', 'dr.wilson@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Lisa Wilson", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222208', 'authenticated', 'authenticated', 'dr.moore@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Christopher Moore", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222209', 'authenticated', 'authenticated', 'dr.taylor@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Amanda Taylor", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222210', 'authenticated', 'authenticated', 'dr.anderson@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. James Anderson", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222211', 'authenticated', 'authenticated', 'dr.thomas@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Michelle Thomas", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222212', 'authenticated', 'authenticated', 'dr.jackson@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Kevin Jackson", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222213', 'authenticated', 'authenticated', 'dr.white@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Nicole White", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222214', 'authenticated', 'authenticated', 'dr.harris@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Daniel Harris", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222215', 'authenticated', 'authenticated', 'dr.martin@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Ashley Martin", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222216', 'authenticated', 'authenticated', 'dr.thompson@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Matthew Thompson", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222217', 'authenticated', 'authenticated', 'dr.garcia@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Stephanie Garcia", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222218', 'authenticated', 'authenticated', 'dr.clark@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Andrew Clark", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222219', 'authenticated', 'authenticated', 'dr.rodriguez@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Megan Rodriguez", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222220', 'authenticated', 'authenticated', 'dr.lewis@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Joshua Lewis", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222221', 'authenticated', 'authenticated', 'dr.lee@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Samantha Lee", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222222', 'authenticated', 'authenticated', 'dr.walker@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Tyler Walker", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222223', 'authenticated', 'authenticated', 'dr.hall@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Rachel Hall", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222224', 'authenticated', 'authenticated', 'dr.allen@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Brandon Allen", "role": "doctor"}', false, '', '', '', ''),
  ('00000000-0000-0000-0000-000000000000', '22222222-2222-2222-2222-222222222225', 'authenticated', 'authenticated', 'dr.young@example.com', '$2a$10$dummy.hash.for.development.only', NOW(), NOW(), NOW(), '{"full_name": "Dr. Victoria Young", "role": "doctor"}', false, '', '', '', '')
ON CONFLICT (id) DO NOTHING;

-- Insert patient profiles
INSERT INTO profiles (id, email, full_name, role, phone, date_of_birth, gender, address, emergency_contact, medical_history) VALUES
  ('11111111-1111-1111-1111-111111111101', 'patient1@example.com', 'John Smith', 'patient', '+1-555-0101', '1985-03-15', 'male', '123 Main St, Springfield, IL 62701', 'Jane Smith +1-555-0102', 'No known allergies. History of hypertension.'),
  ('11111111-1111-1111-1111-111111111102', 'patient2@example.com', 'Sarah Johnson', 'patient', '+1-555-0103', '1990-07-22', 'female', '456 Oak Ave, Chicago, IL 60601', 'Mike Johnson +1-555-0104', 'Allergic to penicillin. Asthma since childhood.'),
  ('11111111-1111-1111-1111-111111111103', 'patient3@example.com', 'Michael Brown', 'patient', '+1-555-0105', '1978-11-08', 'male', '789 Pine St, Rockford, IL 61101', 'Lisa Brown +1-555-0106', 'Diabetes Type 2. Regular medication required.'),
  ('11111111-1111-1111-1111-111111111104', 'patient4@example.com', 'Emily Davis', 'patient', '+1-555-0107', '1992-01-30', 'female', '321 Elm Dr, Peoria, IL 61601', 'Tom Davis +1-555-0108', 'No significant medical history.'),
  ('11111111-1111-1111-1111-111111111105', 'patient5@example.com', 'David Wilson', 'patient', '+1-555-0109', '1987-05-14', 'male', '654 Maple Ln, Aurora, IL 60502', 'Carol Wilson +1-555-0110', 'History of back pain. Physical therapy ongoing.'),
  ('11111111-1111-1111-1111-111111111106', 'patient6@example.com', 'Jessica Miller', 'patient', '+1-555-0111', '1995-09-03', 'female', '987 Cedar Rd, Joliet, IL 60431', 'Mark Miller +1-555-0112', 'Seasonal allergies. Otherwise healthy.'),
  ('11111111-1111-1111-1111-111111111107', 'patient7@example.com', 'Christopher Garcia', 'patient', '+1-555-0113', '1983-12-18', 'male', '147 Birch St, Naperville, IL 60540', 'Maria Garcia +1-555-0114', 'High cholesterol. On statin medication.'),
  ('11111111-1111-1111-1111-111111111108', 'patient8@example.com', 'Amanda Rodriguez', 'patient', '+1-555-0115', '1989-04-25', 'female', '258 Willow Way, Elgin, IL 60120', 'Carlos Rodriguez +1-555-0116', 'Migraine headaches. Preventive medication.'),
  ('11111111-1111-1111-1111-111111111109', 'patient9@example.com', 'James Martinez', 'patient', '+1-555-0117', '1976-08-12', 'male', '369 Spruce Ave, Waukegan, IL 60085', 'Rosa Martinez +1-555-0118', 'Arthritis in knees. Regular check-ups needed.'),
  ('11111111-1111-1111-1111-111111111110', 'patient10@example.com', 'Lisa Anderson', 'patient', '+1-555-0119', '1993-02-07', 'female', '741 Ash Blvd, Schaumburg, IL 60173', 'Robert Anderson +1-555-0120', 'No known medical conditions.'),
  ('11111111-1111-1111-1111-111111111111', 'patient11@example.com', 'Robert Taylor', 'patient', '+1-555-0121', '1981-06-29', 'male', '852 Poplar St, Evanston, IL 60201', 'Susan Taylor +1-555-0122', 'Sleep apnea. Uses CPAP machine.'),
  ('11111111-1111-1111-1111-111111111112', 'patient12@example.com', 'Michelle Thomas', 'patient', '+1-555-0123', '1988-10-16', 'female', '963 Hickory Dr, Des Plaines, IL 60016', 'Kevin Thomas +1-555-0124', 'Thyroid condition. Regular monitoring required.'),
  ('11111111-1111-1111-1111-111111111113', 'patient13@example.com', 'Kevin Jackson', 'patient', '+1-555-0125', '1994-03-04', 'male', '159 Walnut Rd, Arlington Heights, IL 60004', 'Nicole Jackson +1-555-0126', 'Sports injury history. Knee surgery 2020.'),
  ('11111111-1111-1111-1111-111111111114', 'patient14@example.com', 'Nicole White', 'patient', '+1-555-0127', '1986-07-11', 'female', '357 Chestnut Ln, Mount Prospect, IL 60056', 'Daniel White +1-555-0128', 'Anxiety disorder. Medication and therapy.'),
  ('11111111-1111-1111-1111-111111111115', 'patient15@example.com', 'Daniel Harris', 'patient', '+1-555-0129', '1979-11-23', 'male', '468 Sycamore Ave, Palatine, IL 60067', 'Ashley Harris +1-555-0130', 'Heart murmur. Annual cardiology follow-up.'),
  ('11111111-1111-1111-1111-111111111116', 'patient16@example.com', 'Ashley Martin', 'patient', '+1-555-0131', '1991-01-09', 'female', '579 Magnolia St, Hoffman Estates, IL 60169', 'Matthew Martin +1-555-0132', 'Lactose intolerance. Dietary restrictions.'),
  ('11111111-1111-1111-1111-111111111117', 'patient17@example.com', 'Matthew Thompson', 'patient', '+1-555-0133', '1984-05-26', 'male', '680 Dogwood Dr, Streamwood, IL 60107', 'Stephanie Thompson +1-555-0134', 'Chronic fatigue syndrome. Ongoing treatment.'),
  ('11111111-1111-1111-1111-111111111118', 'patient18@example.com', 'Stephanie Garcia', 'patient', '+1-555-0135', '1996-09-13', 'female', '791 Redwood Rd, Bartlett, IL 60103', 'Andrew Garcia +1-555-0136', 'No significant medical history.'),
  ('11111111-1111-1111-1111-111111111119', 'patient19@example.com', 'Andrew Clark', 'patient', '+1-555-0137', '1982-12-01', 'male', '802 Beech Way, Carol Stream, IL 60188', 'Megan Clark +1-555-0138', 'Seasonal depression. Light therapy treatment.'),
  ('11111111-1111-1111-1111-111111111120', 'patient20@example.com', 'Megan Rodriguez', 'patient', '+1-555-0139', '1987-04-18', 'female', '913 Fir Blvd, Wheaton, IL 60187', 'Joshua Rodriguez +1-555-0140', 'Endometriosis. Specialist care required.'),
  ('11111111-1111-1111-1111-111111111121', 'patient21@example.com', 'Joshua Lewis', 'patient', '+1-555-0141', '1975-08-05', 'male', '024 Juniper St, Glen Ellyn, IL 60137', 'Samantha Lewis +1-555-0142', 'Prostate enlargement. Regular monitoring.'),
  ('11111111-1111-1111-1111-111111111122', 'patient22@example.com', 'Samantha Lee', 'patient', '+1-555-0143', '1993-11-22', 'female', '135 Cypress Ave, Lombard, IL 60148', 'Tyler Lee +1-555-0144', 'Iron deficiency anemia. Supplement therapy.'),
  ('11111111-1111-1111-1111-111111111123', 'patient23@example.com', 'Tyler Walker', 'patient', '+1-555-0145', '1989-02-14', 'male', '246 Hemlock Dr, Villa Park, IL 60181', 'Rachel Walker +1-555-0146', 'ADHD. Medication management required.'),
  ('11111111-1111-1111-1111-111111111124', 'patient24@example.com', 'Rachel Hall', 'patient', '+1-555-0147', '1985-06-30', 'female', '357 Sequoia Ln, Elmhurst, IL 60126', 'Brandon Hall +1-555-0148', 'Fibromyalgia. Pain management program.'),
  ('11111111-1111-1111-1111-111111111125', 'patient25@example.com', 'Brandon Allen', 'patient', '+1-555-0149', '1992-10-17', 'male', '468 Cottonwood Rd, Oak Brook, IL 60523', 'Victoria Allen +1-555-0150', 'No known medical conditions.')
ON CONFLICT (id) DO NOTHING;

-- Insert doctor profiles
INSERT INTO profiles (id, email, full_name, role, phone, date_of_birth, gender, address) VALUES
  ('22222222-2222-2222-2222-222222222201', 'dr.smith@example.com', 'Dr. Sarah Smith', 'doctor', '+1-555-1001', '1975-03-15', 'female', '100 Medical Plaza, Chicago, IL 60611'),
  ('22222222-2222-2222-2222-222222222202', 'dr.johnson@example.com', 'Dr. Michael Johnson', 'doctor', '+1-555-1002', '1970-07-22', 'male', '200 Health Center Dr, Springfield, IL 62701'),
  ('22222222-2222-2222-2222-222222222203', 'dr.williams@example.com', 'Dr. Emily Williams', 'doctor', '+1-555-1003', '1978-11-08', 'female', '300 Care Ave, Rockford, IL 61101'),
  ('22222222-2222-2222-2222-222222222204', 'dr.brown@example.com', 'Dr. David Brown', 'doctor', '+1-555-1004', '1972-01-30', 'male', '400 Wellness St, Peoria, IL 61601'),
  ('22222222-2222-2222-2222-222222222205', 'dr.davis@example.com', 'Dr. Jennifer Davis', 'doctor', '+1-555-1005', '1977-05-14', 'female', '500 Healing Rd, Aurora, IL 60502'),
  ('22222222-2222-2222-2222-222222222206', 'dr.miller@example.com', 'Dr. Robert Miller', 'doctor', '+1-555-1006', '1965-09-03', 'male', '600 Treatment Blvd, Joliet, IL 60431'),
  ('22222222-2222-2222-2222-222222222207', 'dr.wilson@example.com', 'Dr. Lisa Wilson', 'doctor', '+1-555-1007', '1973-12-18', 'female', '700 Recovery Way, Naperville, IL 60540'),
  ('22222222-2222-2222-2222-222222222208', 'dr.moore@example.com', 'Dr. Christopher Moore', 'doctor', '+1-555-1008', '1969-04-25', 'male', '800 Therapy Ln, Elgin, IL 60120'),
  ('22222222-2222-2222-2222-222222222209', 'dr.taylor@example.com', 'Dr. Amanda Taylor', 'doctor', '+1-555-1009', '1976-08-12', 'female', '900 Clinic Dr, Waukegan, IL 60085'),
  ('22222222-2222-2222-2222-222222222210', 'dr.anderson@example.com', 'Dr. James Anderson', 'doctor', '+1-555-1010', '1971-02-07', 'male', '1000 Hospital Ave, Schaumburg, IL 60173'),
  ('22222222-2222-2222-2222-222222222211', 'dr.thomas@example.com', 'Dr. Michelle Thomas', 'doctor', '+1-555-1011', '1974-06-29', 'female', '1100 Medicine St, Evanston, IL 60201'),
  ('22222222-2222-2222-2222-222222222212', 'dr.jackson@example.com', 'Dr. Kevin Jackson', 'doctor', '+1-555-1012', '1968-10-16', 'male', '1200 Surgery Rd, Des Plaines, IL 60016'),
  ('22222222-2222-2222-2222-222222222213', 'dr.white@example.com', 'Dr. Nicole White', 'doctor', '+1-555-1013', '1979-03-04', 'female', '1300 Emergency Blvd, Arlington Heights, IL 60004'),
  ('22222222-2222-2222-2222-222222222214', 'dr.harris@example.com', 'Dr. Daniel Harris', 'doctor', '+1-555-1014', '1966-07-11', 'male', '1400 Specialist Way, Mount Prospect, IL 60056'),
  ('22222222-2222-2222-2222-222222222215', 'dr.martin@example.com', 'Dr. Ashley Martin', 'doctor', '+1-555-1015', '1980-11-23', 'female', '1500 Pediatric Ln, Palatine, IL 60067'),
  ('22222222-2222-2222-2222-222222222216', 'dr.thompson@example.com', 'Dr. Matthew Thompson', 'doctor', '+1-555-1016', '1967-01-09', 'male', '1600 Cardiology Ave, Hoffman Estates, IL 60169'),
  ('22222222-2222-2222-2222-222222222217', 'dr.garcia@example.com', 'Dr. Stephanie Garcia', 'doctor', '+1-555-1017', '1981-05-26', 'female', '1700 Dermatology Dr, Streamwood, IL 60107'),
  ('22222222-2222-2222-2222-222222222218', 'dr.clark@example.com', 'Dr. Andrew Clark', 'doctor', '+1-555-1018', '1964-09-13', 'male', '1800 Orthopedic St, Bartlett, IL 60103'),
  ('22222222-2222-2222-2222-222222222219', 'dr.rodriguez@example.com', 'Dr. Megan Rodriguez', 'doctor', '+1-555-1019', '1982-12-01', 'female', '1900 Neurology Rd, Carol Stream, IL 60188'),
  ('22222222-2222-2222-2222-222222222220', 'dr.lewis@example.com', 'Dr. Joshua Lewis', 'doctor', '+1-555-1020', '1963-04-18', 'male', '2000 Psychiatry Blvd, Wheaton, IL 60187'),
  ('22222222-2222-2222-2222-222222222221', 'dr.lee@example.com', 'Dr. Samantha Lee', 'doctor', '+1-555-1021', '1983-08-05', 'female', '2100 Gynecology Way, Glen Ellyn, IL 60137'),
  ('22222222-2222-2222-2222-222222222222', 'dr.walker@example.com', 'Dr. Tyler Walker', 'doctor', '+1-555-1022', '1962-11-22', 'male', '2200 Urology Ave, Lombard, IL 60148'),
  ('22222222-2222-2222-2222-222222222223', 'dr.hall@example.com', 'Dr. Rachel Hall', 'doctor', '+1-555-1023', '1984-02-14', 'female', '2300 Oncology Dr, Villa Park, IL 60181'),
  ('22222222-2222-2222-2222-222222222224', 'dr.allen@example.com', 'Dr. Brandon Allen', 'doctor', '+1-555-1024', '1961-06-30', 'male', '2400 Radiology St, Elmhurst, IL 60126'),
  ('22222222-2222-2222-2222-222222222225', 'dr.young@example.com', 'Dr. Victoria Young', 'doctor', '+1-555-1025', '1985-10-17', 'female', '2500 Pathology Rd, Oak Brook, IL 60523')
ON CONFLICT (id) DO NOTHING;

-- Insert doctor details
INSERT INTO doctors (profile_id, specialization, license_number, years_experience, education, hospital_affiliation, consultation_fee, bio, languages, rating, total_reviews) VALUES
  ('22222222-2222-2222-2222-222222222201', 'Cardiology', 'IL-MD-001', 20, 'Harvard Medical School, MD; Johns Hopkins Cardiology Fellowship', 'Northwestern Memorial Hospital', 300, 'Experienced cardiologist specializing in interventional cardiology and heart disease prevention. Board certified with extensive experience in cardiac catheterization and stent placement.', ARRAY['English', 'Spanish'], 4.8, 156),
  ('22222222-2222-2222-2222-222222222202', 'General Medicine', 'IL-MD-002', 25, 'University of Chicago Medical School, MD; Internal Medicine Residency', 'Rush University Medical Center', 200, 'Family medicine physician with focus on preventive care, chronic disease management, and comprehensive primary care for all ages.', ARRAY['English'], 4.7, 203),
  ('22222222-2222-2222-2222-222222222203', 'Pediatrics', 'IL-MD-003', 17, 'Northwestern University Medical School, MD; Pediatrics Residency', 'Lurie Childrens Hospital', 250, 'Pediatrician dedicated to providing comprehensive care for children from infancy through adolescence. Specializes in developmental pediatrics and childhood nutrition.', ARRAY['English', 'French'], 4.9, 189),
  ('22222222-2222-2222-2222-222222222204', 'Orthopedics', 'IL-MD-004', 23, 'University of Illinois Medical School, MD; Orthopedic Surgery Residency', 'Advocate Christ Medical Center', 350, 'Orthopedic surgeon specializing in sports medicine, joint replacement, and trauma surgery. Extensive experience with minimally invasive techniques.', ARRAY['English'], 4.6, 142),
  ('22222222-2222-2222-2222-222222222205', 'Dermatology', 'IL-MD-005', 18, 'Loyola University Medical School, MD; Dermatology Residency', 'University of Chicago Medical Center', 275, 'Board-certified dermatologist with expertise in medical and cosmetic dermatology, skin cancer detection, and advanced dermatological procedures.', ARRAY['English', 'Italian'], 4.8, 167),
  ('22222222-2222-2222-2222-222222222206', 'Neurology', 'IL-MD-006', 30, 'Mayo Clinic Medical School, MD; Neurology Residency and Fellowship', 'Northwestern Memorial Hospital', 400, 'Neurologist with three decades of experience treating neurological disorders including epilepsy, stroke, and movement disorders. Research focus on neurodegenerative diseases.', ARRAY['English', 'German'], 4.9, 234),
  ('22222222-2222-2222-2222-222222222207', 'Psychiatry', 'IL-MD-007', 22, 'Washington University Medical School, MD; Psychiatry Residency', 'Rush University Medical Center', 225, 'Psychiatrist specializing in mood disorders, anxiety, and trauma-related conditions. Integrates psychotherapy with medication management for comprehensive care.', ARRAY['English'], 4.7, 178),
  ('22222222-2222-2222-2222-222222222208', 'Gynecology', 'IL-MD-008', 26, 'University of Michigan Medical School, MD; OB/GYN Residency', 'Prentice Womens Hospital', 280, 'Gynecologist with expertise in womens reproductive health, minimally invasive surgery, and high-risk pregnancy management. Committed to patient-centered care.', ARRAY['English', 'Spanish'], 4.8, 195),
  ('22222222-2222-2222-2222-222222222209', 'Emergency Medicine', 'IL-MD-009', 19, 'Stanford Medical School, MD; Emergency Medicine Residency', 'Cook County Hospital', 320, 'Emergency medicine physician with extensive experience in trauma care, critical care, and emergency procedures. Board certified in emergency medicine.', ARRAY['English'], 4.6, 156),
  ('22222222-2222-2222-2222-222222222210', 'Oncology', 'IL-MD-010', 24, 'Johns Hopkins Medical School, MD; Oncology Fellowship', 'University of Chicago Medical Center', 450, 'Medical oncologist specializing in solid tumor treatment, immunotherapy, and precision medicine. Active in clinical trials and cancer research.', ARRAY['English', 'Mandarin'], 4.9, 187),
  ('22222222-2222-2222-2222-222222222211', 'Radiology', 'IL-MD-011', 21, 'Duke University Medical School, MD; Radiology Residency', 'Northwestern Memorial Hospital', 300, 'Diagnostic radiologist with subspecialty training in body imaging and interventional radiology. Expert in CT, MRI, and ultrasound interpretation.', ARRAY['English'], 4.7, 134),
  ('22222222-2222-2222-2222-222222222212', 'Urology', 'IL-MD-012', 27, 'Vanderbilt Medical School, MD; Urology Residency', 'Rush University Medical Center', 325, 'Urologist specializing in minimally invasive surgery, kidney stone treatment, and mens health. Extensive experience with robotic surgery techniques.', ARRAY['English'], 4.8, 163),
  ('22222222-2222-2222-2222-222222222213', 'Anesthesiology', 'IL-MD-013', 16, 'University of Pennsylvania Medical School, MD; Anesthesiology Residency', 'Advocate Christ Medical Center', 275, 'Anesthesiologist with expertise in perioperative care, pain management, and critical care medicine. Specializes in cardiac and neurological anesthesia.', ARRAY['English', 'Portuguese'], 4.6, 145),
  ('22222222-2222-2222-2222-222222222214', 'Pathology', 'IL-MD-014', 29, 'Columbia Medical School, MD; Pathology Residency and Fellowship', 'University of Chicago Medical Center', 350, 'Anatomic and clinical pathologist with expertise in surgical pathology, cytopathology, and molecular diagnostics. Subspecialty in gastrointestinal pathology.', ARRAY['English'], 4.8, 98),
  ('22222222-2222-2222-2222-222222222215', 'Endocrinology', 'IL-MD-015', 15, 'Emory Medical School, MD; Endocrinology Fellowship', 'Northwestern Memorial Hospital', 290, 'Endocrinologist specializing in diabetes management, thyroid disorders, and hormone replacement therapy. Focus on comprehensive metabolic care.', ARRAY['English', 'Hindi'], 4.7, 172),
  ('22222222-2222-2222-2222-222222222216', 'Pulmonology', 'IL-MD-016', 28, 'University of California San Francisco Medical School, MD; Pulmonology Fellowship', 'Rush University Medical Center', 310, 'Pulmonologist with expertise in respiratory diseases, sleep medicine, and critical care. Specializes in asthma, COPD, and interstitial lung disease.', ARRAY['English'], 4.8, 159),
  ('22222222-2222-2222-2222-222222222217', 'Gastroenterology', 'IL-MD-017', 14, 'University of Texas Southwestern Medical School, MD; Gastroenterology Fellowship', 'Advocate Christ Medical Center', 285, 'Gastroenterologist specializing in digestive disorders, inflammatory bowel disease, and therapeutic endoscopy. Expert in colonoscopy and upper endoscopy.', ARRAY['English', 'Spanish'], 4.9, 184),
  ('22222222-2222-2222-2222-222222222218', 'Rheumatology', 'IL-MD-018', 31, 'Harvard Medical School, MD; Rheumatology Fellowship', 'University of Chicago Medical Center', 320, 'Rheumatologist with three decades of experience treating autoimmune and inflammatory conditions. Specializes in rheumatoid arthritis, lupus, and vasculitis.', ARRAY['English'], 4.7, 167),
  ('22222222-2222-2222-2222-222222222219', 'Nephrology', 'IL-MD-019', 13, 'Yale Medical School, MD; Nephrology Fellowship', 'Northwestern Memorial Hospital', 295, 'Nephrologist specializing in kidney disease, hypertension, and dialysis care. Focus on chronic kidney disease management and transplant medicine.', ARRAY['English', 'Korean'], 4.8, 143),
  ('22222222-2222-2222-2222-222222222220', 'Infectious Disease', 'IL-MD-020', 32, 'University of Washington Medical School, MD; Infectious Disease Fellowship', 'Rush University Medical Center', 340, 'Infectious disease specialist with extensive experience in complex infections, antimicrobial stewardship, and travel medicine. Expert in HIV care and tropical diseases.', ARRAY['English'], 4.9, 156),
  ('22222222-2222-2222-2222-222222222221', 'Hematology', 'IL-MD-021', 12, 'University of North Carolina Medical School, MD; Hematology Fellowship', 'Advocate Christ Medical Center', 380, 'Hematologist specializing in blood disorders, bleeding disorders, and benign hematology. Expert in thrombosis and anticoagulation management.', ARRAY['English', 'Arabic'], 4.6, 134),
  ('22222222-2222-2222-2222-222222222222', 'Plastic Surgery', 'IL-MD-022', 33, 'University of Southern California Medical School, MD; Plastic Surgery Residency', 'University of Chicago Medical Center', 500, 'Plastic surgeon with expertise in reconstructive and cosmetic surgery. Specializes in breast reconstruction, facial surgery, and body contouring procedures.', ARRAY['English'], 4.8, 189),
  ('22222222-2222-2222-2222-222222222223', 'Ophthalmology', 'IL-MD-023', 11, 'Baylor Medical School, MD; Ophthalmology Residency', 'Northwestern Memorial Hospital', 270, 'Ophthalmologist specializing in comprehensive eye care, cataract surgery, and retinal diseases. Expert in diabetic eye disease and macular degeneration.', ARRAY['English', 'Japanese'], 4.7, 167),
  ('22222222-2222-2222-2222-222222222224', 'Otolaryngology', 'IL-MD-024', 34, 'University of Pittsburgh Medical School, MD; ENT Residency', 'Rush University Medical Center', 315, 'ENT surgeon with expertise in head and neck surgery, sinus surgery, and hearing disorders. Specializes in minimally invasive endoscopic techniques.', ARRAY['English'], 4.8, 145),
  ('22222222-2222-2222-2222-222222222225', 'Family Medicine', 'IL-MD-025', 10, 'University of Wisconsin Medical School, MD; Family Medicine Residency', 'Advocate Christ Medical Center', 180, 'Family medicine physician providing comprehensive primary care for patients of all ages. Focus on preventive care, chronic disease management, and family health.', ARRAY['English', 'Russian'], 4.9, 198)
ON CONFLICT (license_number) DO NOTHING;

-- Insert sample appointments
INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, status, type, symptoms, notes) VALUES
  ('11111111-1111-1111-1111-111111111101', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222201'), '2025-01-15', '09:00:00', 'scheduled', 'in_person', 'Chest pain and shortness of breath', 'Patient reports symptoms during exercise'),
  ('11111111-1111-1111-1111-111111111102', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222203'), '2025-01-16', '10:30:00', 'scheduled', 'video_call', 'Child has persistent cough', 'Cough lasting 2 weeks, no fever'),
  ('11111111-1111-1111-1111-111111111103', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222202'), '2025-01-17', '14:00:00', 'completed', 'in_person', 'Diabetes follow-up', 'Blood sugar levels have been elevated'),
  ('11111111-1111-1111-1111-111111111104', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222205'), '2025-01-18', '11:15:00', 'scheduled', 'video_call', 'Skin rash on arms', 'Rash appeared 3 days ago, itchy'),
  ('11111111-1111-1111-1111-111111111105', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222204'), '2025-01-19', '15:30:00', 'scheduled', 'in_person', 'Back pain after lifting', 'Sharp pain in lower back, difficulty moving'),
  ('11111111-1111-1111-1111-111111111106', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222202'), '2025-01-20', '08:45:00', 'scheduled', 'video_call', 'Annual check-up', 'Routine physical examination'),
  ('11111111-1111-1111-1111-111111111107', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222201'), '2025-01-21', '13:00:00', 'completed', 'in_person', 'High cholesterol follow-up', 'Medication adjustment needed'),
  ('11111111-1111-1111-1111-111111111108', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222207'), '2025-01-22', '16:00:00', 'scheduled', 'video_call', 'Severe headaches', 'Migraine episodes increasing in frequency'),
  ('11111111-1111-1111-1111-111111111109', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222204'), '2025-01-23', '09:30:00', 'scheduled', 'in_person', 'Knee pain and stiffness', 'Arthritis symptoms worsening'),
  ('11111111-1111-1111-1111-111111111110', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222202'), '2025-01-24', '12:00:00', 'scheduled', 'video_call', 'General wellness check', 'Feeling healthy, routine visit'),
  ('11111111-1111-1111-1111-111111111111', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222207'), '2025-01-25', '10:00:00', 'completed', 'in_person', 'Sleep issues', 'Sleep apnea evaluation and treatment'),
  ('11111111-1111-1111-1111-111111111112', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222215'), '2025-01-26', '14:30:00', 'scheduled', 'video_call', 'Thyroid medication review', 'Dosage adjustment consultation'),
  ('11111111-1111-1111-1111-111111111113', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222204'), '2025-01-27', '11:00:00', 'scheduled', 'in_person', 'Knee surgery follow-up', 'Post-operative check, 6 months after surgery'),
  ('11111111-1111-1111-1111-111111111114', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222207'), '2025-01-28', '15:00:00', 'completed', 'video_call', 'Anxiety management', 'Medication and therapy review'),
  ('11111111-1111-1111-1111-111111111115', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222201'), '2025-01-29', '08:30:00', 'scheduled', 'in_person', 'Heart murmur check', 'Annual cardiology follow-up'),
  ('11111111-1111-1111-1111-111111111116', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222202'), '2025-01-30', '13:30:00', 'scheduled', 'video_call', 'Dietary consultation', 'Lactose intolerance management'),
  ('11111111-1111-1111-1111-111111111117', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222202'), '2025-01-31', '16:30:00', 'cancelled', 'in_person', 'Fatigue evaluation', 'Chronic fatigue syndrome follow-up'),
  ('11111111-1111-1111-1111-111111111118', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222202'), '2025-02-01', '09:15:00', 'scheduled', 'video_call', 'Routine check-up', 'Young adult wellness visit'),
  ('11111111-1111-1111-1111-111111111119', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222207'), '2025-02-02', '12:30:00', 'scheduled', 'in_person', 'Depression screening', 'Seasonal depression evaluation'),
  ('11111111-1111-1111-1111-111111111120', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222208'), '2025-02-03', '14:45:00', 'completed', 'video_call', 'Gynecological consultation', 'Endometriosis management'),
  ('11111111-1111-1111-1111-111111111121', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222212'), '2025-02-04', '10:15:00', 'scheduled', 'in_person', 'Prostate check', 'Enlarged prostate monitoring'),
  ('11111111-1111-1111-1111-111111111122', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222202'), '2025-02-05', '11:30:00', 'scheduled', 'video_call', 'Anemia follow-up', 'Iron supplement effectiveness review'),
  ('11111111-1111-1111-1111-111111111123', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222207'), '2025-02-06', '15:15:00', 'scheduled', 'in_person', 'ADHD medication review', 'Dosage and side effects evaluation'),
  ('11111111-1111-1111-1111-111111111124', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222202'), '2025-02-07', '08:00:00', 'completed', 'video_call', 'Pain management', 'Fibromyalgia treatment plan review'),
  ('11111111-1111-1111-1111-111111111125', (SELECT id FROM doctors WHERE profile_id = '22222222-2222-2222-2222-222222222202'), '2025-02-08', '13:45:00', 'scheduled', 'in_person', 'Wellness visit', 'Preventive care and health screening')
ON CONFLICT DO NOTHING;