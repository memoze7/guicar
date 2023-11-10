import React from 'react'
import { Separator } from '@/components/ui/separator'
import AccountForm from '@/components/settings/account-form'
import { fetchDataAccount } from '@/data/setting'
import { type TAccountForm } from '@/lib/definitions'
import { notFound } from 'next/navigation'

export default async function AccountPage ({ params }: {
  params: {
    id: string
  }
}) {
  const id = params.id

  const [account] = await Promise.all([
    fetchDataAccount(id)
  ])

  if (!account?.email) {
    notFound()
  }

  return (
    <main>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium"> Cuenta </h3>
          <p className="text-sm text-muted-foreground">
            Actualiza tu información personal y tu contraseña.
          </p>
        </div>
        <Separator/>
        <AccountForm account={account as TAccountForm}/>
      </div>
    </main>
  )
}
