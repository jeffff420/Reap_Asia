import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FadeIn from '@/components/FadeIn'
import { Building, Cross, BookOpen, Bike, Speaker, Shirt } from 'lucide-react'
import type { Metadata } from 'next'
import styles from '../shared-page.module.css'

export const metadata: Metadata = {
  title: 'How to Give — REAP Asia Ministries',
  description: 'Support evangelism, train leaders, and build the mission station. Find donation designations and contact info.',
}

export default function DonatePage() {
  return (
    <div className={styles.page}>
      <Navbar />
      
      <header className={styles.hero}>
        <FadeIn direction="up">
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>Partner With Us</span>
            <h1 className={styles.heroTitle}>Your Generosity<br />Transforms Lives</h1>
            <p className={styles.heroSub}>
              As an expanding frontline ministry, we rely entirely on the prayers and
              financial partnership of God&apos;s people.
            </p>
          </div>
        </FadeIn>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <FadeIn>
            <h2>How Your Giving is Used</h2>
            <p>
              REAP Asia Ministries Inc. operates with high accountability and low administrative overhead. 
              When you give, your funds translate directly into action on the mission field. You can choose 
              to support the General Fund (where needed most), or designate your gift to any of our specific 
              projects.
            </p>

            <div className={styles.grid2}>
              <div className={styles.card}>
                <Building strokeWidth={1} size={40} style={{ color: 'var(--color-gold)', marginBottom: '1.5rem', display: 'block', margin: '0 auto 1.5rem' }} />
                <h3 className={styles.cardTitle}>Mission Station Construction</h3>
                <p className={styles.cardText}>Fund bricks, mortar, and materials for the new school, hospital, and church headquarters.</p>
              </div>
              <div className={styles.card}>
                <Cross strokeWidth={1} size={40} style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'block', margin: '0 auto 1.5rem' }} />
                <h3 className={styles.cardTitle}>Evangelist Support</h3>
                <p className={styles.cardText}>Provide a monthly stipend ($100-$150) for a native church planter working full-time in unreached areas.</p>
              </div>
              <div className={styles.card}>
                <BookOpen strokeWidth={1} size={40} style={{ color: 'var(--color-gold)', marginBottom: '1.5rem', display: 'block', margin: '0 auto 1.5rem' }} />
                <h3 className={styles.cardTitle}>Leadership Seminars</h3>
                <p className={styles.cardText}>Sponsor the travel, food, and lodging ($50) for a local pastor attending our 4-day intensive training.</p>
              </div>
              <div className={styles.card}>
                <Bike strokeWidth={1} size={40} style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'block', margin: '0 auto 1.5rem' }} />
                <h3 className={styles.cardTitle}>Bicycles for Evangelists</h3>
                <p className={styles.cardText}>A $100 gift buys a heavy-duty bicycle, drastically expanding the geographical reach of an evangelist.</p>
              </div>
              <div className={styles.card}>
                <Speaker strokeWidth={1} size={40} style={{ color: 'var(--color-gold)', marginBottom: '1.5rem', display: 'block', margin: '0 auto 1.5rem' }} />
                <h3 className={styles.cardTitle}>PA Systems</h3>
                <p className={styles.cardText}>Fund a portable sound system for a new house church or open-air village crusade.</p>
              </div>
              <div className={styles.card}>
                <Shirt strokeWidth={1} size={40} style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'block', margin: '0 auto 1.5rem' }} />
                <h3 className={styles.cardTitle}>Widows & Orphans</h3>
                <p className={styles.cardText}>Provide winter blankets, emergency rations, and school supplies to the most vulnerable.</p>
              </div>
            </div>
          </FadeIn>
        </section>

        <section className={styles.section}>
          <FadeIn delay={0.1}>
            <h2>How To Donate</h2>
            <p>
              Currently, we accept financial support via check in the United States. REAP Asia Ministries Inc. 
              is a registered 501(c)(3) religious nonprofit organization. <strong>All contributions are tax-deductible.</strong>
            </p>
            <div style={{ background: '#f4f7f5', border: '1px solid #c8d8d0', borderRadius: '12px', padding: '2rem', marginTop: '2rem' }}>
              <h3 style={{ marginTop: 0, color: 'var(--color-heading)' }}>Mailing Address</h3>
              <p style={{ marginBottom: '1.5rem' }}>Make checks payable to <strong>REAP Asia Ministries Inc.</strong> and mail to:</p>
              <address style={{ fontStyle: 'normal', fontSize: '1.1rem', lineHeight: 1.6, color: 'var(--color-heading)', fontWeight: 600 }}>
                REAP Asia Ministries Inc.<br />
                Attn: Rev. John Abraham<br />
                [Your Address Line 1]<br />
                [Your City, State ZIP]
              </address>
              <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: 'var(--color-muted)' }}>
                <em>Note: Please include a memo specifying your intended designation (e.g., &ldquo;Bicycles&rdquo; or &ldquo;General Fund&rdquo;).</em>
              </p>
            </div>
          </FadeIn>
        </section>
      </main>

      <Footer />
    </div>
  )
}
