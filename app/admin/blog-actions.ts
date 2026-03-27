'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export type PostStatus = 'draft' | 'published'

export interface SavePostData {
  id?: string
  title: string
  slug: string
  featuredImageUrl: string
  body: string
  tags: string
  status: PostStatus
}

export async function saveBlogPost(data: SavePostData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const payload = {
    title: data.title,
    slug: data.slug,
    featured_image_url: data.featuredImageUrl || null,
    body: data.body,
    tags: data.tags || null,
    status: data.status,
  }

  if (data.id) {
    const { error } = await supabase
      .from('blog_posts')
      .update(payload)
      .eq('id', data.id)
    if (error) return { error: error.message }
  } else {
    const { error } = await supabase
      .from('blog_posts')
      .insert(payload)
    if (error) return { error: error.message }
  }

  revalidatePath('/')
  revalidatePath('/blog')
  revalidatePath('/admin/blog')

  redirect('/admin/blog')
}

export async function deleteBlogPost(id: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Unauthorized' }

  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id)

  if (error) return { error: error.message }

  revalidatePath('/')
  revalidatePath('/blog')
  revalidatePath('/admin/blog')

  return { success: true }
}
