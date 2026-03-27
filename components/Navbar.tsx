'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import styles from './Navbar.module.css'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/our-work', label: 'Our Work' },
  { href: '/mission-field', label: 'Bihar & Nepal' },
  { href: '/mission-station', label: 'Mission Station' },
  { href: '/blog', label: 'Blog' },
  { href: '/donate', label: 'Give' },
  { href: '/contact', label: 'Contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}>
      <nav className={styles.nav}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>✦</span>
          <span className={styles.logoText}>
            <span className={styles.logoMain}>REAP Asia</span>
            <span className={styles.logoSub}>Ministries Inc.</span>
          </span>
        </Link>

        {/* Desktop links */}
        <ul className={styles.links}>
          {navLinks.map((link) => {
            const isActive = link.href === '/'
              ? pathname === '/'
              : pathname.startsWith(link.href)
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`${styles.link} ${isActive ? styles.linkActive : ''} ${link.href === '/donate' ? styles.linkDonate : ''}`}
                >
                  {link.label}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Mobile hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className={styles.mobileMenu}>
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.mobileLink} ${link.href === '/donate' ? styles.mobileLinkDonate : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
