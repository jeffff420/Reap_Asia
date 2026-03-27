import BlogEditor from '@/components/admin/BlogEditor'
import styles from '../../admin.module.css'

export default function NewBlogPostPage() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>New Blog Post</h1>
        <p className={styles.pageSubtitle}>Write and publish a new ministry update or testimony.</p>
      </div>
      <BlogEditor />
    </div>
  )
}
