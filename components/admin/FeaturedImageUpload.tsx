'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import styles from './FeaturedImageUpload.module.css'

interface FeaturedImageUploadProps {
  currentUrl: string
  onUpload: (url: string) => void
}

export default function FeaturedImageUpload({ currentUrl, onUpload }: FeaturedImageUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleFile = async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file.')
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB.')
      return
    }

    setUploading(true)
    setError(null)

    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const fileName = `featured/${Date.now()}.${ext}`

    const { data, error: uploadError } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file, { upsert: true })

    if (uploadError || !data) {
      setError(`Upload failed: ${uploadError?.message || 'Unknown error'}`)
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage
      .from('blog-images')
      .getPublicUrl(data.path)

    onUpload(urlData.publicUrl)
    setUploading(false)
  }

  return (
    <div className={styles.wrapper}>
      {currentUrl ? (
        <div className={styles.preview}>
          {/* Using native img to bypass next/image config requirements in admin */}
          <img
            src={currentUrl}
            alt="Featured image preview"
            width="400"
            className={styles.previewImg}
            style={{ objectFit: 'cover', height: 'auto', borderRadius: '8px' }}
          />
          <div className={styles.previewActions}>
            <button
              type="button"
              onClick={() => inputRef.current?.click()}
              className={styles.changeBtn}
              disabled={uploading}
            >
              {uploading ? 'Uploading…' : 'Change Image'}
            </button>
            <button
              type="button"
              onClick={() => onUpload('')}
              className={styles.removeBtn}
            >
              Remove
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className={styles.uploadZone}
          disabled={uploading}
        >
          {uploading ? (
            <span className={styles.uploadingText}>Uploading…</span>
          ) : (
            <>
              <span className={styles.uploadIcon}>🖼</span>
              <span className={styles.uploadLabel}>Click to upload featured image</span>
              <span className={styles.uploadHint}>PNG, JPG, WebP — max 5MB</span>
            </>
          )}
        </button>
      )}

      {error && <p className={styles.error}>{error}</p>}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          const file = e.target.files?.[0]
          if (file) handleFile(file)
          e.target.value = ''
        }}
      />
    </div>
  )
}
