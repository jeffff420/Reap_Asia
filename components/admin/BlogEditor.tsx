'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import FeaturedImageUpload from './FeaturedImageUpload'
import { saveBlogPost, type PostStatus } from '@/app/admin/blog-actions'
import { generateSlug } from '@/lib/utils'
import styles from './BlogEditor.module.css'

// Load TipTap dynamically to avoid SSR issues with ProseMirror
const TipTapEditor = dynamic(() => import('./TipTapEditor'), {
  ssr: false,
  loading: () => <div className={styles.editorLoading}>Loading editor…</div>,
})

export interface InitialPostData {
  id?: string
  title: string
  slug: string
  featuredImageUrl: string
  body: string
  tags: string
  status: PostStatus
}

interface BlogEditorProps {
  initialData?: InitialPostData
}

export default function BlogEditor({ initialData }: BlogEditorProps) {
  const router = useRouter()
  const [title, setTitle] = useState(initialData?.title ?? '')
  const [slug, setSlug] = useState(initialData?.slug ?? '')
  const [featuredImageUrl, setFeaturedImageUrl] = useState(initialData?.featuredImageUrl ?? '')
  const [body, setBody] = useState(initialData?.body ?? '')
  const [tags, setTags] = useState(initialData?.tags ?? '')
  const [slugManuallyEdited, setSlugManuallyEdited] = useState(!!initialData?.slug)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleTitleChange = (value: string) => {
    setTitle(value)
    if (!slugManuallyEdited) {
      setSlug(generateSlug(value))
    }
  }

  const handleSlugChange = (value: string) => {
    setSlug(value)
    setSlugManuallyEdited(true)
  }

  const handleBodyChange = useCallback((html: string) => {
    setBody(html)
  }, [])

  const handleSave = async (status: PostStatus) => {
    if (!title.trim()) { setError('Title is required.'); return }
    if (!slug.trim()) { setError('Slug is required.'); return }

    setSaving(true)
    setError(null)

    const result = await saveBlogPost({
      id: initialData?.id,
      title: title.trim(),
      slug: slug.trim(),
      featuredImageUrl,
      body,
      tags: tags.trim(),
      status,
    })

    if (result?.error) {
      setError(result.error)
      setSaving(false)
    }
    // On success, server action redirects to /admin/blog
  }

  return (
    <div className={styles.editorLayout}>
      {/* ── Left column: main content ── */}
      <div className={styles.mainCol}>

        {/* Title */}
        <div className={styles.card}>
          <input
            id="post-title"
            type="text"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            placeholder="Post title…"
            className={styles.titleInput}
            autoFocus
          />
        </div>

        {/* Body editor */}
        <div className={styles.card}>
          <label className={styles.fieldLabel}>Content</label>
          <TipTapEditor content={body} onChange={handleBodyChange} />
        </div>

      </div>

      {/* ── Right column: meta ── */}
      <div className={styles.metaCol}>

        {/* Publish controls */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Publish</div>

          {error && <div className={styles.errorMsg}>{error}</div>}

          <div className={styles.btnCol}>
            <button
              type="button"
              onClick={() => handleSave('draft')}
              disabled={saving}
              className={styles.btnDraft}
            >
              {saving ? 'Saving…' : '💾 Save as Draft'}
            </button>
            <button
              type="button"
              onClick={() => handleSave('published')}
              disabled={saving}
              className={styles.btnPublish}
            >
              {saving ? 'Publishing…' : '🚀 Publish'}
            </button>
          </div>

          <button
            type="button"
            onClick={() => router.push('/admin/blog')}
            className={styles.btnCancel}
            disabled={saving}
          >
            ← Back to posts
          </button>
        </div>

        {/* Slug */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>URL Slug</div>
          <input
            id="post-slug"
            type="text"
            value={slug}
            onChange={(e) => handleSlugChange(e.target.value)}
            placeholder="your-post-url"
            className={styles.metaInput}
          />
          <p className={styles.hint}>Auto-generated from title. Edit to customise.</p>
        </div>

        {/* Featured Image */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Featured Image</div>
          <FeaturedImageUpload
            currentUrl={featuredImageUrl}
            onUpload={setFeaturedImageUrl}
          />
        </div>

        {/* Tags */}
        <div className={styles.card}>
          <div className={styles.cardTitle}>Tags</div>
          <input
            id="post-tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            placeholder="Mission Update, Testimonies…"
            className={styles.metaInput}
          />
          <p className={styles.hint}>Separate multiple tags with commas.</p>
        </div>

        {/* Current status indicator (edit mode only) */}
        {initialData?.id && (
          <div className={styles.card}>
            <div className={styles.cardTitle}>Current Status</div>
            <span className={`${styles.statusBadge} ${initialData.status === 'published' ? styles.statusPublished : styles.statusDraft}`}>
              {initialData.status === 'published' ? '● Published' : '○ Draft'}
            </span>
          </div>
        )}

      </div>
    </div>
  )
}
