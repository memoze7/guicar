import { type Database } from '@/lib/database.types'
import { createServerActionClient, createServerComponentClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'
import { unstable_noStore as noStore } from 'next/cache'

export async function fetchDataAccount (userId: string) {
  noStore()
  const cookieStore = cookies()
  const databaseQuery = createServerComponentClient<Database>({ cookies: () => cookieStore })

  const { data: dataUSer } = await databaseQuery.from('users').select('*').eq('id', userId)
  const { data } = await databaseQuery.from('account').select('*').eq('user_id', userId)

  const dataAccount = data ? data[0] : null

  return {
    email: dataUSer ? dataUSer[0] ? dataUSer[0].email : '' : '',
    ...dataAccount
  }
}

export async function fetchDataProfile (userId: string) {
  noStore()
  const cookieStore = cookies()
  const databaseConnect = createServerComponentClient<Database>({ cookies: () => cookieStore })

  const { data: dataUser } = await databaseConnect.from('users').select('*').eq('id', userId)
  const { data } = await databaseConnect.from('profile').select('*').eq('user_id', userId)

  return {
    email: dataUser ? dataUser[0] ? dataUser[0].email : '' : '',
    bio: data ? data[0] ? data[0].bio : '' : '',
    id: data ? data[0] ? data[0].id : '' : '',
    user_id: userId
  }
}

export async function updateDataProfile ({ id, email, bio, userId }: { id: string, email: string, bio: string, userId: string }) {
  noStore()
  const cookieStore = cookies()
  const databaseMutation = createServerActionClient<Database>({ cookies: () => cookieStore })

  return await databaseMutation
    .from('profile')
    .upsert({ id, bio, user_id: userId })
}

export async function updateDataAccount ({ id, email, bio, userId }: { id: string, email: string, bio: string, userId: string }) {
  noStore()
  const cookieStore = cookies()
  const databaseMutation = createServerActionClient<Database>({ cookies: () => cookieStore })

  return await databaseMutation
    .from('account')
    .upsert({
      id
    })
}
