import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { createClient } from '@/lib/supabase/server'
import { formatDate } from '@/lib/utils'
import type { Metadata } from 'next'
import styles from '../blog.module.css'
import sharedStyles from '../../shared-page.module.css'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const supabase = await createClient()
  const { data: post } = await supabase
    .from('blog_posts')
    .select('title, body, featured_image_url')
    .eq('slug', slug)
    .single()

  if (!post) return { title: 'Post Not Found' }

  const text = post.body?.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim() || ''
  const description = text.length > 160 ? text.substring(0, 160) + '…' : text

  return {
    title: `${post.title} — REAP Asia Ministries`,
    description,
    openGraph: {
      images: post.featured_image_url ? [post.featured_image_url] : [],
    },
  }
}

export default async function SinglePostPage({ params }: PageProps) {
  const { slug } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (!post) {
    notFound()
  }

  return (
    <div className={sharedStyles.page}>
      <Navbar />

      <main className={styles.articlePage}>
        <article className={styles.article}>
          
          <header className={styles.articleHeader}>
            <Link href="/blog" className={styles.backLink}>← Back to all posts</Link>
            
            <div className={styles.articleMeta}>
              <span className={styles.articleDate}>{formatDate(post.created_at)}</span>
              {post.tags && (
                <>
                  <span className={styles.metaDot}>·</span>
                  <div className={styles.tagList}>
                    {post.tags.split(',').map((tag: string) => (
                      <span key={tag} className={styles.articleTag}>{tag.trim()}</span>
                    ))}
                  </div>
                </>
              )}
            </div>
            
            <h1 className={styles.articleTitle}>{post.title}</h1>
          </header>

          {post.featured_image_url && (
            <div className={styles.articleFeaturedImageWrap}>
              <Image
                src={post.featured_image_url}
                alt={post.title}
                width={1200}
                height={600}
                className={styles.articleFeaturedImage}
                priority
              />
            </div>
          )}

          <div 
            className={styles.articleContent}
            dangerouslySetInnerHTML={{ __html: post.body }} 
          />
          
        </article>
      </main>

      <Footer />
    </div>
  )
}
