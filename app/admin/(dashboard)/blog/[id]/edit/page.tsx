import { notFound } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import BlogEditor from '@/components/admin/BlogEditor'
import styles from '../../../admin.module.css'

interface EditPageProps {
  params: Promise<{ id: string }>
}

export default async function EditBlogPostPage({ params }: EditPageProps) {
  const { id } = await params
  const supabase = await createClient()

  const { data: post } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('id', id)
    .single()

  if (!post) notFound()

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Edit Post</h1>
        <p className={styles.pageSubtitle}>{post.title}</p>
      </div>
      <BlogEditor
        initialData={{
          id: String(post.id),
          title: post.title,
          slug: post.slug,
          featuredImageUrl: post.featured_image_url ?? '',
          body: post.body ?? '',
          tags: post.tags ?? '',
          status: post.status,
        }}
      />
    </div>
  )
}
