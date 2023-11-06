import Link from 'next/link'
import { buttonVariants } from '@/components/ui/button'
import { type User } from '@supabase/supabase-js'
import { Logout } from '@/components/auth/login/logout'

const Navbar = ({ user }: { user: User | null }) => {
  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center justify-end px-4">
          {user
            ? <Logout />
            : (<Link href={'/auth/login'} className={buttonVariants({ variant: 'default' })}>Iniciar sesión</Link>)}
        </div>
      </div>
    </div>
  )
}

export { Navbar }
