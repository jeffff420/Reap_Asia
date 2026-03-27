import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import AdminSidebar from './AdminSidebar'
import styles from './admin.module.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Admin — REAP Asia Ministries',
}

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/admin/login')
  }

  return (
    <div className={styles.shell}>
      <AdminSidebar userEmail={user!.email ?? ''} />
      <main className={styles.main}>
        {children}
      </main>
    </div>
  )
}
