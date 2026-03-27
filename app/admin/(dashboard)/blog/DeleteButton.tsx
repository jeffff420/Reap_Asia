'use client'

import { useState, useTransition } from 'react'
import { deleteBlogPost } from '@/app/admin/blog-actions'
import { useRouter } from 'next/navigation'
import styles from '../admin.module.css'

interface DeleteButtonProps {
  postId: string
  postTitle: string
}

export default function DeleteButton({ postId, postTitle }: DeleteButtonProps) {
  const [showConfirm, setShowConfirm] = useState(false)
  const [isPending, startTransition] = useTransition()
  const router = useRouter()

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteBlogPost(postId)
      if (!result?.error) {
        router.refresh()
      }
      setShowConfirm(false)
    })
  }

  if (showConfirm) {
    return (
      <div className={styles.confirmRow}>
        <span className={styles.confirmText}>Delete &ldquo;{postTitle.substring(0, 30)}{postTitle.length > 30 ? '…' : ''}&rdquo;?</span>
        <button
          onClick={handleDelete}
          disabled={isPending}
          className={styles.btnTableDelete}
        >
          {isPending ? 'Deleting…' : 'Yes, delete'}
        </button>
        <button
          onClick={() => setShowConfirm(false)}
          className={styles.btnTableCancel}
        >
          Cancel
        </button>
      </div>
    )
  }

  return (
    <button
      onClick={() => setShowConfirm(true)}
      className={styles.btnTableDelete}
    >
      Delete
    </button>
  )
}
