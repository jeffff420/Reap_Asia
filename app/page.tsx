import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FadeIn from '@/components/FadeIn'
import HeroSpotlight from '@/components/HeroSpotlight'
import { createClient } from '@/lib/supabase/server'
import { Cross, BookOpen, Volume2, HeartHandshake, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'
import styles from './home.module.css'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'REAP Asia Ministries Inc. — Preaching God\'s Word. Serving God\'s World.',
  description: 'A US-based nonprofit working in North Bihar, India and Nepal for over 20 years. Evangelism, church planting, leadership training, and community development.',
}

const programs = [
  {
    icon: <Cross strokeWidth={1.25} size={22} />,
    number: '01',
    title: 'Evangelism & Church Planting',
    desc: 'Planting multiplying churches in unreached areas of northern India and southern Nepal, working alongside native believers who know the language and culture.',
  },
  {
    icon: <BookOpen strokeWidth={1.25} size={22} />,
    number: '02',
    title: 'Leadership Training',
    desc: 'Monthly 4-day training for 20 believers — pastors, deacons, worship leaders, and Sunday school teachers, equipping the local church from within.',
  },
  {
    icon: <Volume2 strokeWidth={1.25} size={22} />,
    number: '03',
    title: 'Gospel Crusades',
    desc: 'Organized in receptive villages across Bihar and Nepal, connecting scattered believers through testimonies, healing, and proclamation.',
  },
  {
    icon: <HeartHandshake strokeWidth={1.25} size={22} />,
    number: '04',
    title: 'Community Development',
    desc: 'Medical camps, literacy programs, vocational training, and educational scholarships for the most marginalized communities in North Bihar.',
  },
]

const stats = [
  { num: '20+', label: 'Years of Ministry' },
  { num: '2', label: 'Nations Reached' },
  { num: '3', label: 'Churches Established' },
  { num: '95M+', label: 'People in Bihar' },
]

function getExcerpt(html: string, max = 120): string {
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.length > max ? text.substring(0, max) + '…' : text
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric'
  })
}

export default async function HomePage() {
  const supabase = await createClient()

  const { data: thought } = await supabase
    .from('thought_of_day')
    .select('quote_text, scripture_ref')
    .eq('id', 1)
    .single()

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

        {/* ━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className={styles.hero}>
          {/* Diagonal texture base */}
          <div className={styles.heroGrain} aria-hidden="true" />
          {/* Cursor spotlight — glows texture only at mouse position */}
          <HeroSpotlight />
          {/* Sheen unused */}
          <div className={styles.heroSheen} aria-hidden="true" />

          <div className={styles.heroInner}>
            <FadeIn direction="up">
              <span className={styles.heroEyebrow}>
                ✦ &nbsp; North Bihar, India &amp; Nepal &nbsp; ✦
              </span>
              <h1 className={styles.heroTitle}>
                <span className={styles.heroLine1}>Preaching God&apos;s word.</span>
                <span className={styles.heroLine2}>Serving God&apos;s world.</span>
              </h1>
              <div className={styles.heroDivider} aria-hidden="true" />
              <p className={styles.heroSub}>
                A US-based ministry working in northern India and Nepal for over 20 years —
                bringing the Gospel to unreached peoples through evangelism, church planting,
                and compassionate service.
              </p>
              <div className={styles.heroCtas}>
                <Link href="/about" className="btn-primary">
                  Learn About Us <ArrowRight size={14} strokeWidth={2.5} />
                </Link>
                <Link href="/donate" className="btn-ghost-white">
                  Support Our Mission
                </Link>
              </div>
            </FadeIn>
          </div>


        </section>

        {/* ━━ SCRIPTURE BAND ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {thought && (
          <section className={styles.scriptureSection}>
            <FadeIn>
              <div className={styles.scriptureInner}>
                <span className={styles.scriptureEyebrow}>Thought of the Day</span>
                <blockquote className={styles.scriptureQuote}>
                  &ldquo;{thought.quote_text}&rdquo;
                </blockquote>
                <cite className={styles.scriptureRef}>— {thought.scripture_ref}</cite>
              </div>
            </FadeIn>
          </section>
        )}

        {/* ━━ ABOUT SNIPPET (Asymmetric 60/40) ━━━━━━━━━━━━━━ */}
        <section className={styles.aboutSection}>
          <div className={styles.container}>
            <div className={styles.aboutGrid}>

              {/* Left: Text */}
              <FadeIn direction="left" className={styles.aboutText}>
                <span className="label-md">Who We Are</span>
                <h2 className={styles.aboutTitle}>
                  A mission rooted in faith, built on 20 years of presence.
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
                <Link href="/about" className={styles.aboutLink}>
                  Read our story <ArrowRight size={14} strokeWidth={2.5} className={styles.arrowIcon} />
                </Link>
              </FadeIn>

              {/* Right: Giant Stats */}
              <div className={styles.statsCol}>
                {stats.map((s, i) => (
                  <FadeIn key={s.num} delay={i * 0.08}>
                    <div className={styles.statRow}>
                      <span className={styles.statNum}>{s.num}</span>
                      <span className={styles.statLabel}>{s.label}</span>
                    </div>
                  </FadeIn>
                ))}
              </div>

            </div>
          </div>
        </section>

        {/* ━━ PROGRAMS (Editorial horizontal list) ━━━━━━━━━━━ */}
        <section className={styles.programsSection}>
          <div className={styles.container}>

            <FadeIn>
              <div className={styles.programsHead}>
                <span className="label-md">What We Do</span>
                <h2 className={styles.programsTitle}>Our Core Work</h2>
              </div>
            </FadeIn>

            <div className={styles.programsList}>
              {programs.map((p, i) => (
                <FadeIn key={p.number} delay={i * 0.07}>
                  <Link href="/our-work" className={styles.programItem}>
                    <div className={styles.programLeft}>
                      <span className={styles.programNumber}>{p.number}.</span>
                      <span className={styles.programIcon}>{p.icon}</span>
                    </div>
                    <div className={styles.programContent}>
                      <h3 className={styles.programTitle}>{p.title}</h3>
                      <p className={styles.programDesc}>{p.desc}</p>
                    </div>
                    <div className={styles.programArrow}>
                      <ArrowRight size={18} strokeWidth={1.75} />
                    </div>
                  </Link>
                </FadeIn>
              ))}
            </div>

            <FadeIn delay={0.3}>
              <div className={styles.programsCta}>
                <Link href="/our-work" className="btn-outline-primary">
                  Explore All Programs
                </Link>
              </div>
            </FadeIn>

          </div>
        </section>

        {/* ━━ LATEST BLOG POSTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {posts && posts.length > 0 && (
          <section className={styles.blogSection}>
            <div className={styles.container}>

              <FadeIn>
                <div className={styles.blogHead}>
                  <div>
                    <span className="label-md">From the Field</span>
                    <h2 className={styles.blogTitle}>Latest Updates</h2>
                  </div>
                  <Link href="/blog" className={styles.blogViewAll}>
                    All Posts <ArrowRight size={14} />
                  </Link>
                </div>
              </FadeIn>

              <div className={styles.blogGrid}>
                {posts.map((post, i) => (
                  <FadeIn key={post.id} delay={i * 0.1}>
                    <Link href={`/blog/${post.slug}`} className={styles.blogCard}>
                      <div className={styles.blogImg}>
                        {post.featured_image_url ? (
                          <img
                            src={post.featured_image_url}
                            alt={post.title}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        ) : (
                          <div className={styles.blogImgPlaceholder}>
                            <span className={styles.blogImgIcon}>✦</span>
                          </div>
                        )}
                        {post.tags && (
                          <span className={styles.blogTag}>{post.tags.split(',')[0].trim()}</span>
                        )}
                      </div>
                      <div className={styles.blogCardBody}>
                        <h3 className={styles.blogCardTitle}>{post.title}</h3>
                        <p className={styles.blogExcerpt}>{getExcerpt(post.body)}</p>
                        <div className={styles.blogCardFooter}>
                          <span className={styles.blogDate}>{formatDate(post.created_at)}</span>
                          <span className={styles.readMore}>Read →</span>
                        </div>
                      </div>
                    </Link>
                  </FadeIn>
                ))}
              </div>

            </div>
          </section>
        )}

        {/* ━━ DONATE CTA BANNER ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className={styles.donateSection}>
          <div className={styles.donateGrain} aria-hidden="true" />
          <FadeIn direction="up">
            <div className={styles.donateInner}>
              <span className="label-md" style={{ color: 'var(--color-gold)' }}>Make a Difference</span>
              <h2 className={styles.donateTitle}>
                Help us reach<br />the unreached.
              </h2>
              <div className="divider-gold-center" aria-hidden="true" />
              <p className={styles.donateSub}>
                Every contribution plants churches, trains leaders, and transforms communities in
                North Bihar and Nepal. Your generosity makes it possible.
              </p>
              <Link href="/donate" className="btn-primary">
                Learn How to Give <ArrowRight size={14} strokeWidth={2.5} />
              </Link>
            </div>
          </FadeIn>
        </section>

      </main>
      <Footer />
    </>
  )
}
