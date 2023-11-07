'use server'

import { z } from 'zod'

import { cookies } from 'next/headers'
import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'

const AuthSchema = z.object({
  email: z.string().email({
    message: 'Por favor, ingrese un email válido'
  }),
  password: z.string().min(6, {
    message: 'La contraseña debe tener al menos 6 caracteres'
  }).max(50, {
    message: 'La contraseña debe tener menos de 50 caracteres'
  })
})

export interface AuthState {
  errors?: {
    email?: string[]
    password?: string[]
  }
  message?: string | null
}

export async function authenticate (
  prevState: AuthState,
  formData: FormData
) {
  try {
    const validatedFields = AuthSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password')
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Faltan campos. No se pudo iniciar sesión.'
      }
    }

    const { email, password } = validatedFields.data

    const cookieStore = cookies()
    const supabase = createRouteHandlerClient({ cookies: () => cookieStore })

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    console.log(error?.message)
    if (error) {
      return {
        message: error.message
      }
    }

    return {
      message: 'success'
    }
  } catch (error) {
    if ((error as Error).message.includes('CredentialsSignin')) {
      return {
        message: 'error'
      }
    }
    throw error
  }
}
