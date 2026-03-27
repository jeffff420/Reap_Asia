import fs from 'fs'
import path from 'path'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/server'
import styles from './ImageGallery.module.css'

interface ImageItem {
  id: string
  src: string
  caption?: string
  alt?: string
}

export default async function ImageGallery() {
  const allImages: ImageItem[] = []

  // 1. Fetch images from local public/gallery folder
  try {
    const galleryPath = path.join(process.cwd(), 'public', 'gallery')
    if (fs.existsSync(galleryPath)) {
      const files = fs.readdirSync(galleryPath)
      
      files.forEach((file) => {
        // Only include actual image files
        if (/\.(jpe?g|png|webp|gif)$/i.test(file)) {
          allImages.push({
            id: `local-${file}`,
            src: `/gallery/${file}`,
            alt: `Gallery visual ${file}`,
            caption: file.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ') // Make filename readable
          })
        }
      })
    }
  } catch (error) {
    console.error('Error reading local gallery folder:', error)
  }

  // 2. Fetch featured images from published blog posts via Supabase
  try {
    const supabase = await createClient()
    const { data: posts } = await supabase
      .from('blog_posts')
      .select('id, title, featured_image_url')
      .eq('status', 'published')
      .not('featured_image_url', 'is', null)
      .order('created_at', { ascending: false })

    if (posts) {
      posts.forEach((post) => {
        if (post.featured_image_url) {
          allImages.push({
            id: `blog-${post.id}`,
            src: post.featured_image_url,
            caption: `From Blog: ${post.title}`,
            alt: post.title
          })
        }
      })
    }
  } catch (error) {
    console.error('Error fetching blog images:', error)
  }

  // If we have literally no images, show a few placeholders so the gallery isn't empty visually
  const placeholders = [
    { id: 'p1', src: '', caption: 'Add images to public/gallery', alt: '' },
    { id: 'p2', src: '', caption: 'Or publish a blog post', alt: '' },
    { id: 'p3', src: '', caption: 'With a featured image', alt: '' },
  ]
  const displayImages = allImages.length > 0 ? allImages : placeholders

  return (
    <div className={styles.gallery}>
      {displayImages.map((item) => (
        <div key={item.id} className={styles.galleryItem}>
          {item.src ? (
            <Image 
              src={item.src} 
              alt={item.alt || item.caption || 'Gallery Image'} 
              fill 
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              style={{ objectFit: 'cover' }} 
            />
          ) : (
            <div className={styles.placeholderBg} />
          )}
          
          {item.caption && (
            <div className={styles.captionOverlay}>
              <span className={styles.captionText}>{item.caption}</span>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
