'use client'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { InputDescription } from '@/components/ui/input-description'
import { Textarea } from '@/components/ui/textarea'
import { Button } from '@/components/ui/button'
import { type TProfileForm } from '@/lib/definitions'
import { useFormState } from 'react-dom'
import { type SettingState, updateProfile } from '@/actions/setting'
import { InputError } from '@/components/ui/input-errors'
import { useEffect } from 'react'
import { useToast } from '@/components/ui/use-toast'

export function ProfileForm ({ profile }: {
  profile: TProfileForm
}) {
  const { toast } = useToast()
  const initialState: SettingState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(updateProfile, initialState)

  useEffect(() => {
    if (state.message === 'success') toast({ description: 'Perfil actualizado correctamente.' })
    if (state.message === 'error') { toast({ description: state.message }) }
  }, [state, toast])

  return (
    <form className='space-y-8' action={dispatch}>
      <input type='hidden' name='id' value={profile.id}/>
      <input type='hidden' name='userId' value={profile.user_id}/>
      <div className='gap-1.5'>
        <Label htmlFor='email'>Correo</Label>
        <Input type='text' className='my-2 text-muted-foreground cursor-not-allowed' id='email'
               name={'email'} readOnly
               defaultValue={profile.email}/>
        <InputDescription>
          El email no puede cambiarse por los momentos.
        </InputDescription>
        <InputError name={'email'} errors={state.errors}/>
      </div>
      <div className='gap-1.5'>
        <Label htmlFor='bio'>Biografía</Label>
        <Textarea
          placeholder="Cuéntanos un poco sobre ti."
          className="resize-none my-2"
          name="bio"
          defaultValue={profile.bio ?? ''}
        />
        <InputDescription>
          Cuéntanos un poco sobre ti.
        </InputDescription>
      </div>
      {/* button to update profile */}
      <Button type='submit' className='my-8'>Actualizar perfil</Button>

    </form>
  )
}
