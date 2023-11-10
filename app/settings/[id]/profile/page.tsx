import { ProfileForm } from '@/components/settings/profile-form'
import { Separator } from '@/components/ui/separator'
import { fetchDataProfile } from '@/data/setting'
import { notFound } from 'next/navigation'

export default async function ProfilePage ({ params }: {
  params: {
    id: string
  }
}) {
  const id = params.id

  const [profile] = await Promise.all([
    fetchDataProfile(id)
  ])

  if (!profile?.email) {
    notFound()
  }

  return (
    <main>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium">Perfil</h3>
          <p className="text-sm text-muted-foreground">
            Así es como otros te verán en el sitio.
          </p>
        </div>
        <Separator/>
        <ProfileForm profile={profile}/>
      </div>
    </main>
  )
}
