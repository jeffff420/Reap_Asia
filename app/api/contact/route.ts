import { NextResponse } from 'next/server'
import { resend } from '@/lib/resend'
import { createClient } from '@/lib/supabase/server'

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { name, email, phone, message } = body

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Name, email, and message are required.' },
        { status: 400 }
      )
    }

    // 1. Insert into Supabase 'contact_messages'
    const supabase = await createClient()
    const { error: dbError } = await supabase
      .from('contact_messages')
      .insert({ name, email, phone, message })

    if (dbError) {
      console.error('Database Error:', dbError)
      return NextResponse.json(
        { error: 'Failed to record message in the database.' },
        { status: 500 }
      )
    }

    // 2. Send Email via Resend
    // During development or if domain is not configured yet with Resend, you can only send TO the email you registered Resend with.
    // In production, the FROM address should be a domain you own (e.g. support@reapasia.org).
    const adminEmail = process.env.ADMIN_EMAIL || 'johnabrahamdfw@gmail.com'
    
    // Check if RESEND_API_KEY is available
    if (!process.env.RESEND_API_KEY) {
       console.warn('RESEND_API_KEY missing. Skipping email, but DB insertion succeeded.')
    } else {
      const { error: emailError } = await resend.emails.send({
        from: 'REAP Asia Website <onboarding@resend.dev>', // Use onboarding@resend.dev for testing, real domain for prod
        to: [adminEmail],
        subject: `New Contact Form Submission: ${name}`,
        text: `You have received a new message from the REAP Asia contact form.

Name: ${name}
Email: ${email}
Phone: ${phone || 'Not provided'}

Message:
${message}

---
Sent via REAP Asia Ministries Website
`,
      })

      if (emailError) {
        console.error('Email Error:', emailError)
        // If Resend fails, we still return a 200/Success because the message is safely stored in the DB.
      }
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Contact API Error:', error)
    return NextResponse.json(
      { error: 'An unexpected error occurred.' },
      { status: 500 }
    )
  }
}
