import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FadeIn from '@/components/FadeIn'
import { createClient } from '@/lib/supabase/server'
import { Cross, BookOpen, Volume2, HeartHandshake } from 'lucide-react'
import type { Metadata } from 'next'
import styles from './home.module.css'

export const metadata: Metadata = {
  title: 'REAP Asia Ministries Inc. — Preaching God\'s Word. Serving God\'s World.',
  description: 'A US-based nonprofit working in North Bihar, India and Nepal for over 20 years. Evangelism, church planting, leadership training, and community development.',
}

const programs = [
  {
    icon: <Cross strokeWidth={1} size={40} className={styles.lucideIcon} />,
    title: 'Evangelism & Church Planting',
    desc: 'Planting multiplying churches in unreached areas of northern India and southern Nepal.',
  },
  {
    icon: <BookOpen strokeWidth={1} size={40} className={styles.lucideIcon} />,
    title: 'Leadership Training',
    desc: 'Monthly 4-day training for 20 believers — pastors, deacons, worship leaders, and teachers.',
  },
  {
    icon: <Volume2 strokeWidth={1} size={40} className={styles.lucideIcon} />,
    title: 'Gospel Crusades',
    desc: 'Organized in receptive villages across Bihar and Nepal, connecting scattered believers.',
  },
  {
    icon: <HeartHandshake strokeWidth={1} size={40} className={styles.lucideIcon} />,
    title: 'Community Development',
    desc: 'Medical camps, literacy programs, scholarships, and vocational training for the marginalized.',
  },
]

function getExcerpt(html: string, max = 130): string {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.length > max ? text.substring(0, max) + '…' : text
}

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch thought of the day
  const { data: thought } = await supabase
    .from('thought_of_day')
    .select('quote_text, scripture_ref')
    .eq('id', 1)
    .single()

  // Fetch 3 most recent published blog posts
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, featured_image_url, body, created_at, tags')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(3)

  return (
    <>
      <Navbar />
      <main>

        {/* ── HERO ── */}
        <section className={styles.hero}>
          <FadeIn direction="up">
            <div className={styles.heroContent}>
              <span className={styles.heroEyebrow}>✦ North Bihar, India &amp; Nepal</span>
              <h1 className={styles.heroTitle}>
                Preaching God&apos;s word.<br />Serving God&apos;s world.
              </h1>
              <p className={styles.heroSub}>
                A US-based ministry working in northern India and Nepal for over 20 years —
                bringing the Gospel to unreached peoples through evangelism, church planting,
                and compassionate service.
              </p>
              <div className={styles.heroCtas}>
                <Link href="/about" className={styles.ctaPrimary}>Learn About Us</Link>
                <Link href="/donate" className={styles.ctaSecondary}>Support Our Mission</Link>
              </div>
            </div>
          </FadeIn>
        </section>

        {/* ── THOUGHT OF THE DAY ── */}
        {thought && (
          <section className={styles.thoughtSection}>
            <FadeIn>
              <div className={styles.container}>
                <p className={styles.thoughtEyebrow}>✦ Thought of the Day</p>
                <blockquote className={styles.thoughtQuote}>
                  &ldquo;{thought.quote_text}&rdquo;
                </blockquote>
                <cite className={styles.thoughtRef}>— {thought.scripture_ref}</cite>
              </div>
            </FadeIn>
          </section>
        )}

        {/* ── ABOUT SNIPPET ── */}
        <section className={styles.aboutSection}>
          <div className={styles.container}>
            <div className={styles.aboutGrid}>
              <FadeIn direction="left" className={styles.aboutText}>
                <span className={styles.sectionEyebrow}>Who We Are</span>
                <h2 className={styles.sectionTitle}>
                  A mission rooted in faith,<br />built on 20 years of presence.
                </h2>
                <p className={styles.aboutPara}>
                  REAP Asia Ministries Inc. is a US-registered nonprofit with a charitable
                  trust in India, focused on evangelism, church planting, leadership training,
                  and social services in the most underserved regions of North Bihar and Nepal.
                </p>
                <p className={styles.aboutPara}>
                  Rather than a mission organization, we are part of rapid Kingdom expansion
                  to finish the task as a team — working alongside local believers to plant
                  multiplying churches in unreached areas.
                </p>
                <Link href="/about" className={styles.textLink}>
                  Read our story →
                </Link>
              </FadeIn>
              <div className={styles.statsGrid}>
                <FadeIn delay={0.1}><div className={styles.statItem}>
                  <span className={styles.statNum}>20+</span>
                  <span className={styles.statLbl}>Years of Ministry</span>
                </div></FadeIn>
                <FadeIn delay={0.2}><div className={styles.statItem}>
                  <span className={styles.statNum}>2</span>
                  <span className={styles.statLbl}>Nations Reached</span>
                </div></FadeIn>
                <FadeIn delay={0.3}><div className={styles.statItem}>
                  <span className={styles.statNum}>3</span>
                  <span className={styles.statLbl}>Churches Established</span>
                </div></FadeIn>
                <FadeIn delay={0.4}><div className={styles.statItem}>
                  <span className={styles.statNum}>95M+</span>
                  <span className={styles.statLbl}>People in Bihar</span>
                </div></FadeIn>
              </div>
            </div>
          </div>
        </section>

        {/* ── PROGRAMS ── */}
        <section className={styles.programsSection}>
          <div className={styles.container}>
            <FadeIn>
              <div className={styles.sectionHead}>
                <span className={styles.sectionEyebrow}>What We Do</span>
                <h2 className={styles.sectionTitle}>Our Programs</h2>
              </div>
            </FadeIn>
            <div className={styles.programsGrid}>
              {programs.map((p, index) => (
                <FadeIn key={p.title} delay={index * 0.1}>
                  <Link href="/our-work" className={styles.programCard} style={{height: '100%'}}>
                    <span className={styles.programIcon}>{p.icon}</span>
                    <h3 className={styles.programTitle}>{p.title}</h3>
                    <p className={styles.programDesc}>{p.desc}</p>
                    <span className={styles.programLink}>Learn more →</span>
                  </Link>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>

        {/* ── LATEST BLOG POSTS ── */}
        {posts && posts.length > 0 && (
          <section className={styles.blogSection}>
            <div className={styles.container}>
              <div className={styles.sectionHead}>
                <span className={styles.sectionEyebrow}>From the Field</span>
                <h2 className={styles.sectionTitle}>Latest Updates</h2>
              </div>
              <div className={styles.blogGrid}>
                {posts.map((post) => (
                  <Link href={`/blog/${post.slug}`} key={post.id} className={styles.blogCard}>
                    <div className={styles.blogImg}>
                      {post.featured_image_url ? (
                        <Image
                          src={post.featured_image_url}
                          alt={post.title}
                          fill
                          sizes="(max-width: 768px) 100vw, 33vw"
                          style={{ objectFit: 'cover' }}
                        />
                      ) : (
                        <div className={styles.blogImgPlaceholder} />
                      )}
                    </div>
                    <div className={styles.blogCardBody}>
                      {post.tags && <span className={styles.blogTag}>{post.tags.split(',')[0].trim()}</span>}
                      <h3 className={styles.blogCardTitle}>{post.title}</h3>
                      <p className={styles.blogExcerpt}>{getExcerpt(post.body)}</p>
                      <span className={styles.readMore}>Read more →</span>
                    </div>
                  </Link>
                ))}
              </div>
              <div className={styles.blogMoreWrap}>
                <Link href="/blog" className={styles.viewAllBtn}>View All Posts</Link>
              </div>
            </div>
          </section>
        )}

        {/* ── DONATE CTA ── */}
        <section className={styles.donateSection}>
          <FadeIn direction="up" delay={0.2}>
            <div className={styles.donateInner}>
              <span className={styles.donateEyebrow}>✦ Make a Difference</span>
              <h2 className={styles.donateTitle}>Help us reach the unreached.</h2>
              <p className={styles.donateSub}>
                Every contribution plants churches, trains leaders, and transforms communities in
                North Bihar and Nepal. Your generosity makes it possible.
              </p>
              <Link href="/donate" className={styles.donateCta}>Learn How to Give</Link>
            </div>
          </FadeIn>
        </section>

      </main>
      <Footer />
    </>
  )
}
