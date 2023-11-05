import { buttonVariants } from '@/components/ui/button'
import Link from 'next/link'

export default function Home () {
  return (
    <main>
      <div className="flex-col md:flex">
        <div className="border-b">
          <div className="flex h-16 items-center justify-end px-4">
            <Link href={'/auth/login'} className={buttonVariants({ variant: 'default' })}>Iniciar sesión</Link>
          </div>
        </div>
      </div>
    </main>
  )
}
