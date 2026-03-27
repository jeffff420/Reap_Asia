import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>

        {/* Brand */}
        <div className={styles.brand}>
          <div className={styles.brandLogo}>
            <span className={styles.brandMark}>✦</span>
            <span className={styles.brandName}>REAP Asia Ministries Inc.</span>
          </div>
          <p className={styles.tagline}>
            &ldquo;Preaching God&apos;s word.<br />Serving God&apos;s world.&rdquo;
          </p>
          <p className={styles.note}>
            A US-based nonprofit operating in North Bihar, India and Nepal for over 20 years. Bringing the Gospel to unreached peoples.
          </p>
        </div>

        {/* Quick Links */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Navigate</h3>
          <ul className={styles.colLinks}>
            <li><Link href="/about">About Us</Link></li>
            <li><Link href="/our-work">Our Work</Link></li>
            <li><Link href="/mission-field">Bihar &amp; Nepal</Link></li>
            <li><Link href="/mission-station">Mission Station</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="/donate">How to Give</Link></li>
            <li><Link href="/contact">Contact Us</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className={styles.col}>
          <h3 className={styles.colTitle}>Contact</h3>
          <div className={styles.contactGroup}>
            <span className={styles.contactLabel}>USA Office</span>
            <span className={styles.contactName}>Rev. John Abraham</span>
            <a href="tel:9724127311">972-412-7311</a>
            <a href="tel:2147551569">214-755-1569</a>
            <a href="mailto:johnabrahamdfw@gmail.com">johnabrahamdfw@gmail.com</a>
          </div>
          <div className={styles.contactGroup}>
            <span className={styles.contactLabel}>India Office</span>
            <span className={styles.contactName}>Sunil Raj Mathew</span>
            <a href="tel:+919446743928">+91-94467-43928</a>
          </div>
          <div className={styles.contactGroup}>
            <span className={styles.contactLabel}>Website</span>
            <a href="https://www.reapasia.org" target="_blank" rel="noopener noreferrer">
              www.reapasia.org
            </a>
          </div>
        </div>

      </div>

      {/* Bottom bar */}
      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} REAP Asia Ministries Inc. All rights reserved.</p>
        <p className={styles.scripture}>
          &ldquo;Go ye therefore, and teach all nations…&rdquo; — Matthew 28:19
        </p>
      </div>
    </footer>
  )
}
