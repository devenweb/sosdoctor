import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          date_of_birth: string | null
          gender: string | null
          address: string | null
          emergency_contact: string | null
          medical_history: string | null
          role: 'patient' | 'doctor'
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          date_of_birth?: string | null
          gender?: string | null
          address?: string | null
          emergency_contact?: string | null
          medical_history?: string | null
          role?: 'patient' | 'doctor'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          date_of_birth?: string | null
          gender?: string | null
          address?: string | null
          emergency_contact?: string | null
          medical_history?: string | null
          role?: 'patient' | 'doctor'
          created_at?: string
          updated_at?: string
        }
      }
      doctors: {
        Row: {
          id: string
          profile_id: string
          specialization: string
          license_number: string
          years_experience: number
          education: string
          hospital_affiliation: string | null
          consultation_fee: number
          availability_hours: string
          rating: number
          total_reviews: number
          bio: string | null
          languages: string[]
          is_available: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          profile_id: string
          specialization: string
          license_number: string
          years_experience: number
          education: string
          hospital_affiliation?: string | null
          consultation_fee: number
          availability_hours: string
          rating?: number
          total_reviews?: number
          bio?: string | null
          languages?: string[]
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          profile_id?: string
          specialization?: string
          license_number?: string
          years_experience?: number
          education?: string
          hospital_affiliation?: string | null
          consultation_fee?: number
          availability_hours?: string
          rating?: number
          total_reviews?: number
          bio?: string | null
          languages?: string[]
          is_available?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      appointments: {
        Row: {
          id: string
          patient_id: string
          doctor_id: string
          appointment_date: string
          appointment_time: string
          status: 'scheduled' | 'completed' | 'cancelled' | 'in_progress'
          type: 'in_person' | 'video_call'
          symptoms: string | null
          notes: string | null
          prescription: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          patient_id: string
          doctor_id: string
          appointment_date: string
          appointment_time: string
          status?: 'scheduled' | 'completed' | 'cancelled' | 'in_progress'
          type: 'in_person' | 'video_call'
          symptoms?: string | null
          notes?: string | null
          prescription?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          patient_id?: string
          doctor_id?: string
          appointment_date?: string
          appointment_time?: string
          status?: 'scheduled' | 'completed' | 'cancelled' | 'in_progress'
          type?: 'in_person' | 'video_call'
          symptoms?: string | null
          notes?: string | null
          prescription?: string | null
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}