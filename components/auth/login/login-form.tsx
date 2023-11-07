'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormState } from 'react-dom'
import { authenticate, type AuthState } from '@/actions/auth'
import { Button } from '@/components/ui/button'
import { useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'
import { useRouter } from 'next/navigation'
import { InputError } from '@/components/ui/input-errors'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { ExclamationTriangleIcon } from '@radix-ui/react-icons'

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
    <div>

    <form action={dispatch} className="space-y-8">
      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor='email'>Correo electrónico</Label>
        <Input type='text' id='email' name={'email'}/>
        <InputError name='email' errors={state.errors} />
      </div>

      <div className="grid w-full max-w-sm items-center gap-1.5">
        <Label htmlFor='password'>Contraseña</Label>
        <Input type='password' id='password' name={'password'}/>
        <InputError name='password' errors={state.errors} />
      </div>

      <Button type='submit' className='w-full'>Iniciar sesión</Button>
    </form>
      {Boolean(state.message) && state.message !== 'success' && (
      <Alert variant="destructive" className='mt-4'>
        <ExclamationTriangleIcon className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          { state.message === 'Invalid login credentials'
            ? 'Las credenciales de inicio de sesión son inválidas'
            : 'Ocurrió un error al iniciar sesión, por favor intenta de nuevo o contacta a soporte'
          }
        </AlertDescription>
      </Alert>
      )}
    </div>
  )
}
