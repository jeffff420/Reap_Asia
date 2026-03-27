import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import DeleteButton from './DeleteButton'
import { formatDate } from '@/lib/utils'
import styles from '../admin.module.css'

export default async function BlogListPage() {
  const supabase = await createClient()
  const { data: posts } = await supabase
    .from('blog_posts')
    .select('id, title, slug, status, created_at, tags')
    .order('created_at', { ascending: false })

  const total = posts?.length ?? 0
  const published = posts?.filter((p) => p.status === 'published').length ?? 0
  const drafts = posts?.filter((p) => p.status === 'draft').length ?? 0

  return (
    <div>
      <div className={styles.pageHeader} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h1 className={styles.pageTitle}>Blog Posts</h1>
          <p className={styles.pageSubtitle}>
            {total} total &nbsp;·&nbsp; {published} published &nbsp;·&nbsp; {drafts} drafts
          </p>
        </div>
        <Link href="/admin/blog/new" className={styles.newPostBtn}>
          + New Post
        </Link>
      </div>

      <div className={styles.recentSection}>
        {posts && posts.length > 0 ? (
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Title</th>
                <th>Tags</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post.id}>
                  <td>
                    <span className={styles.postTitle}>{post.title}</span>
                    <span className={styles.postSlug}>/{post.slug}</span>
                  </td>
                  <td>
                    {post.tags ? (
                      <span className={styles.tagPill}>{post.tags}</span>
                    ) : (
                      <span className={styles.noTag}>—</span>
                    )}
                  </td>
                  <td className={styles.dateCell}>{formatDate(post.created_at)}</td>
                  <td>
                    <span className={`${styles.statusBadge} ${post.status === 'published' ? styles.statusPublished : styles.statusDraft}`}>
                      {post.status}
                    </span>
                  </td>
                  <td>
                    <div className={styles.tableActions}>
                      <Link href={`/admin/blog/${post.id}/edit`} className={styles.btnTableEdit}>
                        Edit
                      </Link>
                      <DeleteButton postId={String(post.id)} postTitle={post.title} />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className={styles.emptyState}>
            No blog posts yet.{' '}
            <Link href="/admin/blog/new" style={{ color: '#5A7A3A', fontWeight: 600 }}>
              Create your first post →
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
