import Link from 'next/link'
import Image from 'next/image'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FadeIn from '@/components/FadeIn'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'
import styles from './blog.module.css'
import sharedStyles from '../shared-page.module.css'

export const metadata: Metadata = {
  title: 'Blog — REAP Asia Ministries',
  description: 'Read the latest updates, testimonies, and reports from the mission field in North Bihar and Nepal.',
}

function getExcerpt(html: string, max = 160): string {
  if (!html) return ''
  const text = html.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  return text.length > max ? text.substring(0, max) + '…' : text
}

export default async function BlogListPage() {
  const supabase = await createClient()

  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, featured_image_url, body, created_at, tags')
    .eq('status', 'published')
    .order('created_at', { ascending: false })

  return (
    <div className={sharedStyles.page}>
      <Navbar />

      <header className={sharedStyles.hero}>
        <FadeIn direction="up">
          <div className={sharedStyles.heroContent}>
            <span className={sharedStyles.heroEyebrow}>Updates from the Field</span>
            <h1 className={sharedStyles.heroTitle}>Mission Blog</h1>
            <p className={sharedStyles.heroSub}>
              Read the latest testimonies, prayer requests, and stories of transformation
              directly from our teams in North Bihar and Nepal.
            </p>
          </div>
        </FadeIn>
      </header>

      <main className={sharedStyles.content} style={{ maxWidth: '1200px' }}>
        {posts && posts.length > 0 ? (
          <div className={styles.blogGrid}>
            {posts.map((post) => (
              <Link href={`/blog/${post.slug}`} key={post.id} className={styles.blogCard}>
                <div className={styles.cardImageWrap}>
                  {post.featured_image_url ? (
                    <img
                      src={post.featured_image_url}
                      alt={post.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }}
                      className={styles.cardImage}
                    />
                  ) : (
                    <div className={styles.placeholderImage} />
                  )}
                </div>
                <div className={styles.cardBody}>
                  <div className={styles.cardMeta}>
                    <span className={styles.cardDate}>{formatDate(post.created_at)}</span>
                    {post.tags && (
                      <>
                        <span className={styles.metaDot}>·</span>
                        <span className={styles.cardTag}>{post.tags.split(',')[0].trim()}</span>
                      </>
                    )}
                  </div>
                  <h2 className={styles.cardTitle}>{post.title}</h2>
                  <p className={styles.cardExcerpt}>{getExcerpt(post.body)}</p>
                  <span className={styles.readMore}>Continue reading →</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className={styles.emptyState}>
            <h2>No posts published yet.</h2>
            <p>Check back soon for updates from the mission field.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
