'use client'

import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { InputDescription } from '@/components/ui/input-description'
import { CalendarSetting } from '@/components/settings/calendar-setting'
import { Button } from '@/components/ui/button'
import { type TAccountForm } from '@/lib/definitions'
import { type SettingState, updateAccount } from '@/actions/setting'
import { useFormState } from 'react-dom'
import { useToast } from '@/components/ui/use-toast'
import { useEffect, useState } from 'react'
import { InputError } from '@/components/ui/input-errors'

export default function AccountForm ({
  account
}: { account: TAccountForm }) {
  const { toast } = useToast()
  const initialState: SettingState = { message: null, errors: {} }
  const [state, dispatch] = useFormState(updateAccount, initialState)
  const [date, setDate] = useState<Date | undefined>(account.date_of_birth ?? new Date())

  useEffect(() => {
    if (state.message === 'success') toast({ description: 'Perfil actualizado correctamente.' })
    if (state.message === 'error') {
      toast({ description: state.message })
    }
  }, [state, toast])

  return (
    <form action={dispatch}>
      <input type='hidden' readOnly name='id' defaultValue={account.id ?? ''}/>
      <input type='hidden' readOnly name='userId' defaultValue={account.user_id}/>
      <input type='hidden' readOnly name='email' defaultValue={account.email}/>
      <div className='gap-1.5 grid grid-cols-2'>
        <div>
          <Label htmlFor='Nombre'>Nombre</Label>
          <Input type='text' className='my-2' id='email'
                 name={'first_name'}/>
          <InputError name={'first_name'} errors={state.errors}/>
        </div>
        <div>
          <Label htmlFor='Apellido'>Segundo nombre</Label>
          <Input type='text' className='my-2' id='email'
                 name={'second_name'}/>
          <InputError name={'second_name'} errors={state.errors}/>
        </div>
        <div>
          <Label htmlFor='Apellido'>Apellido</Label>
          <Input type='text' className='my-2' id='email'
                 name={'last_name'}/>
          <InputError name={'last_name'} errors={state.errors}/>
        </div>
        <div>
          <Label htmlFor='Apellido'>Segundo apellido</Label>
          <Input type='text' className='my-2' id='email'
                 name={'second_last_name'}/>
          <InputError name={'second_last_name'} errors={state.errors}/>
        </div>
      </div>
      <InputDescription>
        Este es el nombre que aparecerá en tu perfil público, en los comentarios y en las publicaciones.
      </InputDescription>

      <div className='gap-1.5 mt-8 grid grid-cols-2'>
        <div className='flex flex-col'>
          <Label htmlFor='date_of_birth' className='mb-4'>Fecha de nacimiento</Label>
          <CalendarSetting date={date} setDate={setDate} />
          <input readOnly name='date_of_birth' value={date?.toISOString() } />
          <InputError name={'date_of_birth'} errors={state.errors} />
        </div>
      </div>

      <Button className='my-8' type="submit">Update account</Button>

    </form>
  )
}
