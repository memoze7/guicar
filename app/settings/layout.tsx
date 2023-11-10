import { type ReactNode } from 'react'
import { SidebarSettings } from '@/components/settings/sidebar-settings'
import { Separator } from '@/components/ui/separator'
import createClient from '@/lib/supabase-server'

export default async function Layout ({
  children
}: {
  children: ReactNode
}) {
  const supabase = createClient()

  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (!user) {
    return null
  }

  return (
    <div>
      <div className="hidden space-y-6 p-10 pb-16 md:block">
        <div className="space-y-0.5">
          <h2 className="text-2xl font-bold tracking-tight">Ajustes</h2>
          <p className="text-muted-foreground">
            Administra la configuración de tu cuenta y establece las preferencias de correo electrónico.
          </p>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="-mx-4 lg:w-1/5">
            <SidebarSettings items={sidebarNavItems(user?.id)} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">{children}</div>
        </div>
      </div>
    </div>
  )
}

const sidebarNavItems = (id: string) => [
  {
    title: 'Perfil',
    href: `/settings/${id}/profile`
  },
  {
    title: 'Cuenta',
    href: `/settings/${id}/account`
  }
]
