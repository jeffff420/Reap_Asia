'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/lib/supabase/server'

export async function saveThought(data: {
  quoteText: string
  scriptureRef: string
}) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('thought_of_day')
    .upsert({
      id: 1,
      quote_text: data.quoteText,
      scripture_ref: data.scriptureRef,
      updated_at: new Date().toISOString(),
    })

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/admin/thought')
  return { success: true }
}
