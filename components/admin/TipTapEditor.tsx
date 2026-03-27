'use client'

import { useEditor, EditorContent } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import TipTapImage from '@tiptap/extension-image'
import Link from '@tiptap/extension-link'
import Underline from '@tiptap/extension-underline'
import Placeholder from '@tiptap/extension-placeholder'
import { useRef } from 'react'
import { createClient } from '@/lib/supabase/client'
import styles from './TipTapEditor.module.css'

interface TipTapEditorProps {
  content: string
  onChange: (html: string) => void
}

export default function TipTapEditor({ content, onChange }: TipTapEditorProps) {
  const imageInputRef = useRef<HTMLInputElement>(null)

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ heading: { levels: [2, 3] } }),
      TipTapImage.configure({ inline: false, allowBase64: false }),
      Link.configure({ openOnClick: false }),
      Underline,
      Placeholder.configure({ placeholder: 'Write your blog post content here…' }),
    ],
    content,
    onUpdate: ({ editor }) => onChange(editor.getHTML()),
    immediatelyRender: false,
  })

  if (!editor) return null

  const uploadInlineImage = async (file: File) => {
    const supabase = createClient()
    const ext = file.name.split('.').pop()
    const fileName = `inline/${Date.now()}.${ext}`
    const { data, error } = await supabase.storage
      .from('blog-images')
      .upload(fileName, file, { upsert: true })
    if (error || !data) return null
    const { data: urlData } = supabase.storage.from('blog-images').getPublicUrl(data.path)
    return urlData.publicUrl
  }

  const handleSetLink = () => {
    const prev = editor.getAttributes('link').href as string
    const url = window.prompt('Enter URL:', prev ?? '')
    if (url === null) return
    if (url === '') { editor.chain().focus().unsetLink().run(); return }
    editor.chain().focus().setLink({ href: url, target: '_blank' }).run()
  }

  const ToolBtn = ({
    onClick, active, disabled, title, children,
  }: {
    onClick: () => void
    active?: boolean
    disabled?: boolean
    title: string
    children: React.ReactNode
  }) => (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={active ? styles.toolBtnActive : styles.toolBtn}
    >
      {children}
    </button>
  )

  return (
    <div className={styles.wrapper}>
      {/* ── Toolbar ── */}
      <div className={styles.toolbar}>
        <div className={styles.toolGroup}>
          <ToolBtn onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')} title="Bold"><b>B</b></ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')} title="Italic"><i>I</i></ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleUnderline().run()} active={editor.isActive('underline')} title="Underline"><u>U</u></ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleStrike().run()} active={editor.isActive('strike')} title="Strikethrough"><s>S</s></ToolBtn>
        </div>

        <span className={styles.divider} />

        <div className={styles.toolGroup}>
          <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })} title="Heading 2">H2</ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })} title="Heading 3">H3</ToolBtn>
        </div>

        <span className={styles.divider} />

        <div className={styles.toolGroup}>
          <ToolBtn onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')} title="Bullet list">• List</ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')} title="Numbered list">1. List</ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')} title="Blockquote">&ldquo; Quote</ToolBtn>
        </div>

        <span className={styles.divider} />

        <div className={styles.toolGroup}>
          <ToolBtn onClick={handleSetLink} active={editor.isActive('link')} title="Insert / remove link">🔗 Link</ToolBtn>
          <ToolBtn onClick={() => imageInputRef.current?.click()} title="Upload inline image">🖼 Image</ToolBtn>
        </div>

        <span className={styles.divider} />

        <div className={styles.toolGroup}>
          <ToolBtn onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} title="Undo">↩</ToolBtn>
          <ToolBtn onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} title="Redo">↪</ToolBtn>
        </div>
      </div>

      {/* Hidden image file input */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={async (e) => {
          const file = e.target.files?.[0]
          if (!file) return
          const url = await uploadInlineImage(file)
          if (url) editor.chain().focus().setImage({ src: url }).run()
          e.target.value = ''
        }}
      />

      {/* Editor area */}
      <div className={styles.editorWrap}>
        <EditorContent editor={editor} className={styles.editorContent} />
      </div>
    </div>
  )
}
