import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import styles from './admin.module.css'

export default async function AdminDashboard() {
  const supabase = await createClient()

  // Fetch blog post counts
  const { count: totalPosts } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact', head: true })

  const { count: publishedPosts } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published')

  const { count: draftPosts } = await supabase
    .from('blog_posts')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'draft')

  // Fetch 5 most recent posts
  const { data: recentPosts } = await supabase
    .from('blog_posts')
    .select('id, title, status, created_at')
    .order('created_at', { ascending: false })
    .limit(5)

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Dashboard</h1>
        <p className={styles.pageSubtitle}>
          Welcome back — here&apos;s what&apos;s happening with your site.
        </p>
      </div>

      {/* Stats */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{totalPosts ?? 0}</div>
          <div className={styles.statLabel}>Total Posts</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{publishedPosts ?? 0}</div>
          <div className={styles.statLabel}>Published</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statValue}>{draftPosts ?? 0}</div>
          <div className={styles.statLabel}>Drafts</div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className={styles.quickActions}>
        <Link href="/admin/thought" className={styles.actionCard}>
          <span className={styles.actionIcon}>✦</span>
          <div className={styles.actionTitle}>Edit Thought of the Day</div>
          <p className={styles.actionDesc}>
            Update the daily scripture quote shown on the homepage.
          </p>
        </Link>
        <Link href="/admin/blog/new" className={styles.actionCard}>
          <span className={styles.actionIcon}>✐</span>
          <div className={styles.actionTitle}>New Blog Post</div>
          <p className={styles.actionDesc}>
            Write and publish a new ministry update or testimony.
          </p>
        </Link>
        <Link href="/admin/blog" className={styles.actionCard}>
          <span className={styles.actionIcon}>◈</span>
          <div className={styles.actionTitle}>Manage Posts</div>
          <p className={styles.actionDesc}>
            Edit, publish, or delete existing blog posts.
          </p>
        </Link>
      </div>

      {/* Recent Posts */}
      <div className={styles.recentSection}>
        <div className={styles.sectionTitle}>Recent Posts</div>
        {recentPosts && recentPosts.length > 0 ? (
          recentPosts.map((post) => (
            <Link
              key={post.id}
              href={`/admin/blog/${post.id}/edit`}
              className={styles.recentPost}
            >
              <span className={styles.recentPostTitle}>{post.title}</span>
              <span
                className={`${styles.statusBadge} ${
                  post.status === 'published'
                    ? styles.statusPublished
                    : styles.statusDraft
                }`}
              >
                {post.status}
              </span>
            </Link>
          ))
        ) : (
          <div className={styles.emptyState}>
            No posts yet.{' '}
            <Link href="/admin/blog/new" style={{ color: '#5A7A3A' }}>
              Create your first post →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
