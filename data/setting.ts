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

export async function updateDataProfile ({ id, bio, userId }: { id: string, email: string, bio: string, userId: string }) {
  noStore()
  const cookieStore = cookies()
  const databaseMutation = createServerActionClient<Database>({ cookies: () => cookieStore })

  return await databaseMutation
    .from('profile')
    .upsert({ id, bio, user_id: userId })
}

export async function updateDataAccount ({ id, dateOfBirth, firstName, lastName, secondLastName, secondName, userId }: { id: string, dateOfBirth?: string, firstName: string, lastName: string, secondLastName?: string, secondName?: string, userId: string }) {
  noStore()
  try {
    const cookieStore = cookies()
    const databaseMutation = createServerActionClient<Database>({ cookies: () => cookieStore })

    console.log('id-->', id)

    return await databaseMutation
      .from('account')
      .upsert({
        ...(Boolean(id) && { id }),
        first_name: firstName,
        last_name: lastName,
        user_id: userId,
        second_name: secondName,
        second_last_name: secondLastName,
        date_of_birth: dateOfBirth
      })
  } catch (error) {
    console.log(error)
    return {
      error: {
        message: 'Error en server al actualizar la cuenta. Por favor, contacte al administrador.'
      }
    }
  }
}
