import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FadeIn from '@/components/FadeIn'
import type { Metadata } from 'next'
import styles from '../shared-page.module.css'

export const metadata: Metadata = {
  title: 'Bihar & Nepal — REAP Asia Ministries',
  description: 'Understand the desperate spiritual and physical need in North Bihar, India, and neighboring Nepal.',
}

export default function MissionFieldPage() {
  return (
    <div className={styles.page}>
      <Navbar />
      
      <header className={styles.hero}>
        <FadeIn direction="up">
          <div className={styles.heroContent}>
            <span className={styles.heroEyebrow}>The Mission Field</span>
            <h1 className={styles.heroTitle}>A Vast Harvest.<br />The Graveyard of Missions.</h1>
            <p className={styles.heroSub}>
              Why we focus our efforts on the most challenging, resistant, and deeply impoverished
              regions of the Indian subcontinent.
            </p>
          </div>
        </FadeIn>
      </header>

      <main className={styles.content}>
        <section className={styles.section}>
          <FadeIn>
            <h2>The State of Bihar (India)</h2>
            <p>
              Historically termed the &ldquo;Graveyard of Missions,&rdquo; North Bihar presents one of the most
              complex, challenging, and spiritually dark landscapes in the world. But where darkness is profound,
              the light of the Gospel shines the brightest. 
            </p>
            <ul>
              <li><strong>A Massive Population:</strong> Nearly 100 million people reside in Bihar, rendering it more populous than many major nations.</li>
              <li><strong>Severe Poverty:</strong> It remains one of the poorest states in India, plagued by stark economic inequalities, caste divisions, and lacking basic infrastructure.</li>
              <li><strong>Spiritual Darkness:</strong> Bihar is the birthplace of major Eastern religions and remains steeped in ancient traditions. Historically, the church has been virtually non-existent here.</li>
              <li><strong>A Turning Tide:</strong> After decades of hard, fruitless labor by pioneers, the spiritual soil is finally softening. We are witnessing an unprecedented openness to the Gospel today.</li>
            </ul>
          </FadeIn>
        </section>

        <section className={styles.section}>
          <FadeIn delay={0.1}>
            <h2>Why Nepal?</h2>
            <p>
              Our operational base in North Bihar sits directly on the porous, open border with Nepal. This strategic geographical positioning allows us unique, unrestricted access to the southern plains and foothill communities of Nepal.
            </p>
            <p>
              Nepal, long a closed Hindu kingdom, has seen remarkable political and social shifts. While legal and social challenges remain regarding religious conversion, the people themselves are deeply hungry for hope. Our evangelists cross the border regularly, planting house churches in villages that have never seen a Bible.
            </p>
            <blockquote>
              &ldquo;The sheer scale of the need in Bihar and Nepal can be paralyzing. But we look at the multitudes the way Jesus did — with deep compassion, seeing them as sheep without a shepherd. We reach them one village, one family, one soul at a time.&rdquo;
            </blockquote>
          </FadeIn>
        </section>
      </main>

      <Footer />
    </div>
  )
}
