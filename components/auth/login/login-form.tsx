'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from 'react-dom'
import { authenticate, type AuthState } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'

export function LoginForm () {
  const { toast } = useToast()
  const router = useRouter()
  const initialState: AuthState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(authenticate, initialState)

  useEffect(() => {
    if (state.message === 'success') {
      toast({ description: 'Sesión iniciada' })
      router.refresh()
    }
  }, [state.message, router, toast])

  return (
    <form action={dispatch} className="space-y-8">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor='email'>Correo electrónico</Label>
        <Input type='text' id='email' name={'email'}/>
         {JSON.stringify(state)}
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor='password'>Contraseña</Label>
        <Input type='password' id='password' name={'password'}/>
      </div>

      <Button type='submit'>Iniciar sesión</Button>
    </form>
  )
}

// {/*{state?.errors?.email*/}
// {/*  ? (*/}
// {/*    <div*/}
// {/*        id="email-error"*/}
// {/*        aria-live="polite"*/}
// {/*        className="mt-2 text-sm text-red-500"*/}
// {/*    >*/}
// {/*      {state.errors.email.map((error: string) => (*/}
// {/*          <p key={error}>{error}</p>*/}
// {/*      ))}*/}
// {/*    </div>*/}
// {/*    )*/}
// {/*  : null}*/}
