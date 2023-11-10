export interface TProfileForm {
  id: string
  email: string
  bio: string | null
  user_id: string
}

export interface TAccountForm {
  id: string
  user_id: string
  email: string
  first_name: string | null | undefined
  second_name: string | null | undefined
  last_name: string | null | undefined
  second_last_name: string | null | undefined
  date_of_birth: Date | undefined
  created_at: string | null | undefined
  updated_at: string | null | undefined
}
