import { createClient } from '@/lib/supabase/server'
import ThoughtForm from './ThoughtForm'
import styles from '../admin.module.css'

export default async function ThoughtPage() {
  const supabase = await createClient()
  const { data } = await supabase
    .from('thought_of_day')
    .select('*')
    .eq('id', 1)
    .single()

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Thought of the Day</h1>
        <p className={styles.pageSubtitle}>
          This quote appears on the homepage. Update it anytime.
        </p>
      </div>
      <ThoughtForm
        currentQuote={data?.quote_text ?? ''}
        currentRef={data?.scripture_ref ?? ''}
      />
    </div>
  )
}
