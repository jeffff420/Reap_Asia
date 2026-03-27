import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FadeIn from '@/components/FadeIn'
import { Eye, Target } from 'lucide-react'
import type { Metadata } from 'next'
import styles from '../shared-page.module.css'

export const metadata: Metadata = {
  title: 'About Us — REAP Asia Ministries',
  description: 'Learn about our history, our faith, and our 20+ year mission to bring the Gospel to North Bihar and Nepal.',
}

export default function AboutPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      
      <header className={styles.hero}>
        <FadeIn direction="up">
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>Who We Are</span>
            <h1 className={styles.heroTitle}>Rooted in Faith.<br />Driven by Compassion.</h1>
            <p className={styles.heroSub}>
              Discover the history behind REAP Asia Ministries and the foundational
              beliefs that drive our work in the most unreached regions.
            </p>
          </div>
        </FadeIn>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <FadeIn>
            <h2>Our Story</h2>
            <p>
              REAP (Reaching Every Area with Peace) Asia Ministries Inc. is a US-registered
              nonprofit organization, operating with a charitable trust entity in India. For over
              20 years, our core focus has remained unchanged: bringing the life-transforming
              message of the Gospel to the unreached margins of Northern India and Nepal.
            </p>
            <p>
              Founded by Rev. John Abraham and Rev. K.M. John, the ministry was born out of a profound
              burden for the millions in Bihar who have never heard the name of Jesus. What began as
              small outreach efforts has grown into a structured engine for church planting, leadership
              training, and extensive community development.
            </p>
          </FadeIn>
        </section>

        <section className={styles.section}>
          <FadeIn delay={0.1}>
            <h2>Our Vision & Mission</h2>
            <div className={styles.grid2}>
              <div className={styles.card}>
                <Eye strokeWidth={1} size={40} style={{ color: 'var(--color-gold)', marginBottom: '1.5rem', display: 'block', margin: '0 auto 1.5rem' }} />
                <h3 className={styles.cardTitle}>Vision</h3>
                <p className={styles.cardText}>
                  To see thriving, multiplying communities of faith established in every village and
                  town across North Bihar and Nepal, transforming society through the love of Christ.
                </p>
              </div>
              <div className={styles.card}>
                <Target strokeWidth={1} size={40} style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'block', margin: '0 auto 1.5rem' }} />
                <h3 className={styles.cardTitle}>Mission</h3>
                <p className={styles.cardText}>
                  To rapidly expand the Kingdom by partnering with local believers to plant churches,
                  train leaders, and provide compassionate social relief to the marginalized.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        <section className={styles.section}>
          <FadeIn direction="up" delay={0.2}>
            <h2>Our Founders</h2>
            <div className={styles.grid2}>
              
              <div className={styles.card} style={{ textAlign: 'left' }}>
                <div style={{
                  width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-container))', 
                  marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.5rem', fontWeight: 700,
                  boxShadow: 'var(--shadow-ambient)'
                }}>JA</div>
                <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Rev. John Abraham</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, margin: '0 0 1.5rem' }}>President & Founder</p>
                <p style={{ fontSize: '1.05rem', color: 'var(--color-body)', lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
                  A native of Kerala, India, Rev. Abraham felt a specific call to the "Graveyard of Missions" in North Bihar. 
                  Relocating to the US, he founded REAP Asia Ministries with the vision of marshaling Western resources to fully empower native Indian and Nepali church planters who already know the language and culture.
                </p>
              </div>

              <div className={styles.card} style={{ textAlign: 'left' }}>
                <div style={{
                  width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-container))', 
                  marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontSize: '1.5rem', fontWeight: 700,
                  boxShadow: 'var(--shadow-ambient)'
                }}>KJ</div>
                <h3 style={{ marginTop: 0, marginBottom: '0.5rem', color: 'var(--color-primary)' }}>Rev. K.M. John</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em', fontWeight: 700, margin: '0 0 1.5rem' }}>Co-Founder</p>
                <p style={{ fontSize: '1.05rem', color: 'var(--color-body)', lineHeight: 1.7, margin: 0, fontWeight: 300 }}>
                  Partnering with Rev. Abraham over two decades ago, Rev. John provided crucial on-the-ground theological 
                  oversight and pastoral care. His faithful labor in the earliest, most dangerous days of the ministry 
                  laid the unshakeable foundation for the hundreds of house churches that exist today.
                </p>
              </div>

            </div>
          </FadeIn>
        </section>

        <section className={styles.section}>
          <FadeIn direction="up">
            <h2>Our Foundational Command</h2>
            <blockquote>
              &ldquo;And Jesus came and spake unto them, saying, All power is given unto me in heaven
              and in earth. Go ye therefore, and teach all nations, baptizing them in the name of the
              Father, and of the Son, and of the Holy Ghost; Teaching them to observe all things 
              whatsoever I have commanded you: and, lo, I am with you alway, even unto the end of the world. Amen.&rdquo;
            </blockquote>
            <p style={{ textAlign: 'right', fontWeight: 700, color: 'var(--color-primary)' }}>
              — Matthew 28:18-20
            </p>
          </FadeIn>
        </section>
      </main>

      <Footer />
    </div>
  )
}
