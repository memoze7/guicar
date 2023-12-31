import { type User } from '@supabase/supabase-js'
import { Logout } from '@/components/auth/login/logout'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import Link from 'next/link'
import { fetchDataAccount } from '@/data/setting'
import { getInitials } from '@/lib/utils'

const Navbar = async ({ user }: { user: User }) => {
  const [account] = await Promise.all([
    fetchDataAccount(user?.id)
  ])

  return (
    <div className="flex-col md:flex">
      <div className="border-b flex justify-between items-center p-3">
        <h2 className="scroll-m-20  text-3xl font-semibold tracking-tight first:mt-0">
          Administración
        </h2>
        <div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className='cursor-pointer'>
                <AvatarImage/>
                <AvatarFallback>{getInitials(account.first_name, account.last_name)}</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>Mi cuenta</DropdownMenuLabel>
              <DropdownMenuSeparator/>
              <DropdownMenuGroup>
                <Link href={`/settings/${user?.id}/profile`}>
                  <DropdownMenuItem className={'cursor-pointer'}>
                    <span>Perfil</span>
                  </DropdownMenuItem>
                </Link>
                <DropdownMenuSeparator/>
                <Logout/>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

        </div>
      </div>
    </div>
  )
}

export { Navbar }
