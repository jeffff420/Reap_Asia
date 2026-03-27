'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { logout } from '../actions'
import styles from './admin.module.css'

const navLinks = [
  { href: '/admin', label: 'Dashboard', icon: '◈' },
  { href: '/admin/thought', label: 'Thought of the Day', icon: '✦' },
  { href: '/admin/blog', label: 'Blog Posts', icon: '✐' },
]

export default function AdminSidebar({ userEmail }: { userEmail: string }) {
  const pathname = usePathname()

  return (
    <aside className={styles.sidebar}>
      {/* Brand */}
      <div className={styles.sidebarBrand}>
        <div className={styles.sidebarLogo}>✦</div>
        <div>
          <div className={styles.sidebarTitle}>REAP Asia</div>
          <div className={styles.sidebarSub}>Admin Portal</div>
        </div>
      </div>

      {/* Nav */}
      <nav className={styles.nav}>
        {navLinks.map((link) => {
          const isActive =
            link.href === '/admin'
              ? pathname === '/admin'
              : pathname.startsWith(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${isActive ? styles.navLinkActive : ''}`}
            >
              <span className={styles.navIcon}>{link.icon}</span>
              {link.label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className={styles.sidebarFooter}>
        <div className={styles.userInfo}>
          <div className={styles.userAvatar}>
            {userEmail.charAt(0).toUpperCase()}
          </div>
          <div className={styles.userEmail}>{userEmail}</div>
        </div>
        <form action={logout}>
          <button type="submit" className={styles.logoutBtn}>
            Sign Out
          </button>
        </form>
        <Link
          href="/"
          target="_blank"
          className={styles.viewSiteLink}
        >
          ↗ View Live Site
        </Link>
      </div>
    </aside>
  )
}
