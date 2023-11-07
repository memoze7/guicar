'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'
import { DropdownMenuItem } from '@/components/ui/dropdown-menu'

export const Logout = () => {
  const router = useRouter()
  const supabase = createClientComponentClient()
  const { toast } = useToast()

  const handleLogout = async () => {
    try {
      toast({ description: 'Cerrando sesión...' })
      await supabase.auth.signOut()
      toast({ description: 'Sesión cerrada exitosamente' })
      router.refresh()
    } catch (error) {
      console.log(error)
    }
  }

  return (<DropdownMenuItem onClick={handleLogout} className='h-full w-full cursor-pointer text-destructive' >Cerrar sesión</DropdownMenuItem>)
}
