'use client'

import { useState } from 'react'
import { saveThought } from '@/app/admin/thought-actions'
import styles from './thought.module.css'

interface ThoughtFormProps {
  currentQuote: string
  currentRef: string
}

export default function ThoughtForm({ currentQuote, currentRef }: ThoughtFormProps) {
  const [quote, setQuote] = useState(currentQuote)
  const [ref, setRef] = useState(currentRef)
  const [saving, setSaving] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  const handleSave = async () => {
    if (!quote.trim()) { setErrorMsg('Quote text cannot be empty.'); setStatus('error'); return }
    setSaving(true)
    setStatus('idle')
    const result = await saveThought({ quoteText: quote.trim(), scriptureRef: ref.trim() })
    setSaving(false)
    if (result?.error) {
      setErrorMsg(result.error)
      setStatus('error')
    } else {
      setStatus('success')
    }
  }

  return (
    <div className={styles.layout}>
      {/* Form */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Edit Quote</div>

        <div className={styles.field}>
          <label htmlFor="quote-text" className={styles.label}>Scripture / Quote Text</label>
          <textarea
            id="quote-text"
            value={quote}
            onChange={(e) => { setQuote(e.target.value); setStatus('idle') }}
            rows={5}
            className={styles.textarea}
            placeholder="Enter the scripture or quote…"
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="scripture-ref" className={styles.label}>Scripture Reference</label>
          <input
            id="scripture-ref"
            type="text"
            value={ref}
            onChange={(e) => { setRef(e.target.value); setStatus('idle') }}
            className={styles.input}
            placeholder="e.g. Matthew 28:19"
          />
        </div>

        {status === 'success' && (
          <div className={styles.success}>✓ Saved successfully! The homepage is now updated.</div>
        )}
        {status === 'error' && (
          <div className={styles.error}>{errorMsg}</div>
        )}

        <button
          type="button"
          onClick={handleSave}
          disabled={saving}
          className={styles.saveBtn}
        >
          {saving ? 'Saving…' : '✦ Save Thought of the Day'}
        </button>
      </div>

      {/* Live Preview */}
      <div className={styles.card}>
        <div className={styles.cardTitle}>Homepage Preview</div>
        <p className={styles.previewLabel}>Here&apos;s how it will appear on the homepage:</p>
        <div className={styles.previewCard}>
          <div className={styles.previewDecor}>✦</div>
          <blockquote className={styles.previewQuote}>
            &ldquo;{quote || 'Your quote will appear here…'}&rdquo;
          </blockquote>
          {ref && (
            <cite className={styles.previewRef}>— {ref}</cite>
          )}
        </div>
      </div>
    </div>
  )
}
