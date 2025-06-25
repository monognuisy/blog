import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// 클라이언트용 Supabase 인스턴스
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// 서버용 Supabase 인스턴스 (관리자 권한)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
})

// 포스트 관련 타입 정의
export interface Post {
  id: string
  slug: string
  title: string
  description: string | null
  content: string
  category: string
  tags: string[]
  cover: string | null
  date: string
  published: boolean
  created_at: string
  updated_at: string
} 
