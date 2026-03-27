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
]

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMenuOpen(false) }, [pathname])

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ''} ${menuOpen ? styles.menuActive : ''}`}>
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
                  className={`${styles.link} ${isActive ? styles.linkActive : ''}`}
                >
                  {link.label}
                  {isActive && <span className={styles.activeDot} />}
                </Link>
              </li>
            )
          })}
        </ul>

        {/* Give CTA (separate from nav list) */}
        <div className={styles.navActions}>
          <Link href="/contact" className={styles.contactLink}>Contact</Link>
          <Link href="/donate" className={styles.giveCta}>Give</Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className={`${styles.hamburger} ${menuOpen ? styles.hamburgerOpen : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle navigation menu"
          aria-expanded={menuOpen}
        >
          <span />
          <span />
          <span />
        </button>
      </nav>

      {/* Mobile menu */}
      <div className={`${styles.mobileMenu} ${menuOpen ? styles.mobileMenuOpen : ''}`} aria-hidden={!menuOpen}>
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
          >
            {link.label}
          </Link>
        ))}
        <Link href="/contact" className={styles.mobileLink}>Contact</Link>
        <Link href="/donate" className={styles.mobileLinkGive}>Give →</Link>
      </div>
    </header>
  )
}
