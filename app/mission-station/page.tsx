import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FadeIn from '@/components/FadeIn'
import { Church, GraduationCap, Hospital, BookOpen } from 'lucide-react'
import type { Metadata } from 'next'
import styles from '../shared-page.module.css'

export const metadata: Metadata = {
  title: 'Mission Station — REAP Asia Ministries',
  description: 'Our vision for a centralized mission compound integrating a church, school, hospital, and training center.',
}

export default function MissionStationPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      
      <header className={styles.hero}>
        <FadeIn direction="up">
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>Headquarters</span>
            <h1 className={styles.heroTitle}>A Basecamp for<br />Regional Transformation</h1>
            <p className={styles.heroSub}>
              The sprawling vision for our 1.5-acre Mission Station — designed to serve as
              the training, medical, and educational heartbeat of the ministry.
            </p>
          </div>
        </FadeIn>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <FadeIn>
            <h2>The Land and The Vision</h2>
            <p>
              For a ministry expanding as rapidly as REAP Asia, renting temporary facilities restricts growth.
              We have secured <strong>1.5 acres of prime land</strong> strategically located near the Nepal/India
              border. This property is slated to become the central nervous system of all our operations.
            </p>
            <p>
              The Mission Station is not just an office; it is envisioned as a multi-purpose compound designed
              to comprehensively serve the community physically, mentally, and spiritually. We are currently
              raising funds to complete the construction phases of this massive project.
            </p>
          </FadeIn>
        </section>

        <section className={styles.section}>
          <FadeIn delay={0.1}>
            <h2>The Five Pillars of the Compound</h2>
            <div className={styles.grid2}>
              
              <div className={styles.card}>
                <Church strokeWidth={1} size={40} style={{ color: 'var(--color-gold)', marginBottom: '1.5rem', display: 'block', margin: '0 auto 1.5rem' }} />
                <h3 className={styles.cardTitle}>Headquarters Church</h3>
                <p className={styles.cardText}>
                  A central worship sanctuary serving as the mother church for the region, hosting large joint
                  gatherings and major Christian festivals.
                </p>
              </div>

              <div className={styles.card}>
                <GraduationCap strokeWidth={1} size={40} style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'block', margin: '0 auto 1.5rem' }} />
                <h3 className={styles.cardTitle}>English Medium School</h3>
                <p className={styles.cardText}>
                  Providing high-quality, subsidized education to local children. Education is the greatest tool
                  to break the cycle of generational poverty in Bihar.
                </p>
              </div>

              <div className={styles.card}>
                <Hospital strokeWidth={1} size={40} style={{ color: 'var(--color-gold)', marginBottom: '1.5rem', display: 'block', margin: '0 auto 1.5rem' }} />
                <h3 className={styles.cardTitle}>Mission Hospital</h3>
                <p className={styles.cardText}>
                  A fully equipped primary care medical facility offering low-cost diagnostics, maternal care,
                  and treatment to villagers who currently travel hours for basic care.
                </p>
              </div>

              <div className={styles.card}>
                <BookOpen strokeWidth={1} size={40} style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'block', margin: '0 auto 1.5rem' }} />
                <h3 className={styles.cardTitle}>Bible Training Center</h3>
                <p className={styles.cardText}>
                  Dorms and classrooms to scale up our monthly leadership seminars, housing pastors and
                  evangelists during intensive pastoral training sessions.
                </p>
              </div>
            </div>
          </FadeIn>
        </section>

        <section className={styles.section}>
          <FadeIn direction="up">
            <h2>Will You Build With Us?</h2>
            <p>
              The land is purchased, and boundary walls have been erected. We are now navigating the rigorous
              phased construction of the buildings. This undertaking requires substantial capital investment
              from faithful partners who share the vision of leaving a permanent legacy in North Bihar.
            </p>
            <p>
              If you are interested in sponsoring a specific building, a classroom, or a hospital wing, 
              please <a href="/contact" style={{color: 'var(--color-accent)', fontWeight: 700}}>contact our US office</a> for 
              detailed architectural blueprints and cost projections.
            </p>
          </FadeIn>
        </section>
      </main>

      <Footer />
    </div>
  )
}
