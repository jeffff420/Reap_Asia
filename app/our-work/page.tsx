import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ImageGallery from '@/components/ImageGallery'
import FadeIn from '@/components/FadeIn'
import { Stethoscope, BookOpen, Scissors, Droplet } from 'lucide-react'
import type { Metadata } from 'next'
import styles from '../shared-page.module.css'

export const metadata: Metadata = {
  title: 'Our Work — REAP Asia Ministries',
  description: 'Explore our multi-faceted programs including Evangelism, Church Planting, Leadership Training, and Community Development.',
}

export default function OurWorkPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      
      <header className={styles.hero}>
        <FadeIn direction="up">
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>What We Do</span>
            <h1 className={styles.heroTitle}>A Holistic Approach<br />to Ministry</h1>
            <p className={styles.heroSub}>
              We believe that preaching the Gospel must be accompanied by tangible acts
              of love, serving both the spiritual and physical needs of the community.
            </p>
          </div>
        </FadeIn>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <FadeIn>
            <h2>Evangelism & Church Planting</h2>
            <p>
              The core of our mandate is the Great Commission. We actively send trained evangelists into
              unreached villages across North Bihar and southern Nepal. Our strategy focuses on identifying
              receptive communities, sharing the good news, and immediately gathering new believers into
              house churches. 
            </p>
            <p>
              We do not just seek converts; we seek to establish self-sustaining, multiplying local congregations
              that become beacons of hope in their respective villages. To date, this grassroots effort has
              yielded numerous fellowships in areas previously devoid of any Christian witness.
            </p>
          </FadeIn>
        </section>

        <section className={styles.section}>
          <FadeIn>
            <h2>Leadership Training Seminars</h2>
            <p>
              Church planting is only effective if local leadership is equipped to shepherd the flock. 
              Every month, we host an intensive <strong>4-day training seminar</strong> at our mission station.
            </p>
            <ul>
              <li><strong>Attendees:</strong> Average of 20 believers per session.</li>
              <li><strong>Participants:</strong> Pastors, deacons, worship leaders, Sunday school teachers, and youth leaders.</li>
              <li><strong>Sponsorship:</strong> Training a leader costs approximately $50 per month, covering travel, food, lodging, and materials.</li>
            </ul>
          </FadeIn>
        </section>

        <section className={styles.section}>
          <FadeIn>
            <h2>Gospel Crusades & Mass Evangelism</h2>
            <p>
              While house churches provide intimate discipleship, Gospel Crusades allow us to cast a wide
              net in highly populated, receptive villages. These events often draw hundreds of seekers,
              providing an opportunity to hear the Gospel clearly presented, followed by prayers for healing
              and deliverance. 
            </p>
            <p>
              These crusades frequently act as the catalyst for launching a new church plant in a village.
            </p>
          </FadeIn>
        </section>

        <section className={styles.section}>
          <FadeIn>
            <h2>Community Development & Social Service</h2>
            <p>
              Jesus commanded us to love our neighbors. In regions plagued by extreme poverty, lack of education,
              and healthcare infrastructure, our community development programs are essential.
            </p>
            <div className={styles.grid2}>
              <div className={styles.card}>
                <Stethoscope strokeWidth={1} size={40} style={{ color: 'var(--color-gold)', marginBottom: '1.5rem', display: 'block', margin: '0 auto 1.5rem' }} />
                <h3 className={styles.cardTitle}>Medical Camps</h3>
                <p className={styles.cardText}>Free health checkups and basic medications provided to villages with zero access to clinics.</p>
              </div>
              <div className={styles.card}>
                <BookOpen strokeWidth={1} size={40} style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'block', margin: '0 auto 1.5rem' }} />
                <h3 className={styles.cardTitle}>Education</h3>
                <p className={styles.cardText}>Literacy programs for adults and school scholarships for underprivileged children.</p>
              </div>
              <div className={styles.card}>
                <Scissors strokeWidth={1} size={40} style={{ color: 'var(--color-gold)', marginBottom: '1.5rem', display: 'block', margin: '0 auto 1.5rem' }} />
                <h3 className={styles.cardTitle}>Vocational Training</h3>
                <p className={styles.cardText}>Tailoring centers teaching women marketable skills to support their families independently.</p>
              </div>
              <div className={styles.card}>
                <Droplet strokeWidth={1} size={40} style={{ color: 'var(--color-primary)', marginBottom: '1.5rem', display: 'block', margin: '0 auto 1.5rem' }} />
                <h3 className={styles.cardTitle}>Relief Work</h3>
                <p className={styles.cardText}>Distributing blankets, food rations, and digging borewells during floods and extreme winter snaps.</p>
              </div>
            </div>
          </FadeIn>
        </section>

        <section className={styles.section} style={{ marginTop: '4rem' }}>
          <FadeIn>
            <h2>Ministry Gallery</h2>
            <p>
              A visual overview of our church planting initiatives, training seminars, and social relief efforts over the past year.
            </p>
            <ImageGallery />
          </FadeIn>
        </section>
      </main>

      <Footer />
    </div>
  )
}
