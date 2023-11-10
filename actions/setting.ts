'use server'

import { z } from 'zod'
import { updateDataProfile } from '@/data/setting'
import { revalidatePath } from 'next/cache'

const ProfileSchema = z.object({
  id: z.string(),
  email: z.string().email({
    message: 'Por favor, ingrese un correo electrónico válido.'
  }),
  bio: z.string().max(160, {
    message: 'La biografía debe tener menos de 160 caracteres'
  }),
  userId: z.string()
})

const AccountSchema = z.object({
  id: z.string(),
  userId: z.string(),
  email: z.string(),
  firstName: z.string().max(50, {
    message: 'El nombre debe tener menos de 50 caracteres'
  }).min(2, {
    message: 'El nombre debe tener más de 2 caracteres'

  }),
  secondName: z.string().max(50, {
    message: 'El segundo nombre debe tener menos de 50 caracteres'
  }).optional(),
  lastName: z.string().max(50, {
    message: 'El apellido debe tener menos de 50 caracteres'
  }).min(2, {
    message: 'El apellido debe tener más de 2 caracteres'
  })
})

export interface SettingState {
  errors?: {
    bio?: string[]
    first_name?: string[]
    last_name?: string[]
  }
  message?: string | null
}

export async function updateAccount (
  prevState: SettingState,
  formData: FormData
) {
  try {
    console.log('formData-->', formData)
    const validatedFields = AccountSchema.safeParse(
      Object.fromEntries(formData)
    )
    console.log('validatedFields-->', validatedFields)

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Faltan campos. No se pudo actualizar el perfil.'
      }
    }

    return {
      message: 'success'
    }

    const { id, firstName, lastName } = validatedFields.data

    const { error } = await updateDataProfile({ id, firstName, lastName })
  } catch (error) {
    console.log(error)
    return {
      message: 'Error en server al actualizar la cuenta. Por favor, contacte al administrador.'
    }
  }
}

export async function updateProfile (
  prevState: SettingState,
  formData: FormData
) {
  try {
    const validatedFields = ProfileSchema.safeParse({
      id: formData.get('id'),
      email: formData.get('email'),
      bio: formData.get('bio'),
      userId: formData.get('userId')
    })

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Faltan campos. No se pudo actualizar la cuenta.'
      }
    }

    const { id, email, bio, userId } = validatedFields.data

    const { error } = await updateDataProfile({ id, email, bio, userId })

    if (error) {
      console.log('error-->', error)
      return {
        message: error.message
      }
    }

    revalidatePath(`/setting/${id}/profile`)

    return {
      message: 'success'
    }
  } catch (error) {
    console.log(error)
    return {
      message: 'Error en server al actualizar el perfil. Por favor, contacte al administrador.'
    }
  }
}
