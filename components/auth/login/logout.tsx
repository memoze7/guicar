'use client'

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'
import { useToast } from '@/components/ui/use-toast'

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

  return (<Button onClick={handleLogout}>Cerrar sesión</Button>)
}
