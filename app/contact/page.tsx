'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import FadeIn from '@/components/FadeIn'
import styles from './contact.module.css'
import sharedStyles from '../shared-page.module.css'

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get('name') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      message: formData.get('message') as string,
    }

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      
      const result = await res.json()
      
      if (!res.ok) {
        throw new Error(result.error || 'Failed to send message.')
      }

      setStatus('success')
      ;(e.target as HTMLFormElement).reset()
    } catch (err: any) {
      setErrorMsg(err.message)
      setStatus('error')
    }
  }

  return (
    <div className={sharedStyles.page}>
      <Navbar />
      
      <header className={sharedStyles.hero}>
        <FadeIn direction="up">
          <div className={sharedStyles.heroContent}>
            <span className={sharedStyles.heroEyebrow}>Get in Touch</span>
            <h1 className={sharedStyles.heroTitle}>We&apos;d love to hear<br />from you.</h1>
            <p className={sharedStyles.heroSub}>
              Reach out with questions, inquiries about partnership, or to request a detailed
              information packet about the Mission Station build.
            </p>
          </div>
        </FadeIn>
      </header>

      <main className={sharedStyles.content}>
        <div className={styles.contactLayout}>
          
          <FadeIn>
            <div className={styles.formCol}>
              <h2 className={styles.formTitle}>Send a Message</h2>
              
              {status === 'success' ? (
                <div className={styles.successBox}>
                  <h3>Message Sent</h3>
                  <p>Thank you for reaching out. Rev. Abraham or a team member will get back to you shortly.</p>
                  <button 
                    className={styles.resetBtn} 
                    onClick={() => setStatus('idle')}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label htmlFor="name">Full Name *</label>
                      <input id="name" name="name" type="text" required disabled={status === 'loading'} />
                    </div>
                  </div>

                  <div className={styles.formRow}>
                    <div className={styles.field}>
                      <label htmlFor="email">Email Address *</label>
                      <input id="email" name="email" type="email" required disabled={status === 'loading'} />
                    </div>
                    <div className={styles.field}>
                      <label htmlFor="phone">Phone Number</label>
                      <input id="phone" name="phone" type="tel" disabled={status === 'loading'} />
                    </div>
                  </div>

                  <div className={styles.field}>
                    <label htmlFor="message">Your Message *</label>
                    <textarea id="message" name="message" rows={5} required disabled={status === 'loading'}></textarea>
                  </div>

                  {status === 'error' && (
                    <div className={styles.errorBox}>{errorMsg}</div>
                  )}

                  <button 
                    type="submit" 
                    className={styles.submitBtn} 
                    disabled={status === 'loading'}
                  >
                    {status === 'loading' ? 'Sending…' : 'Send Message'}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className={styles.infoCol}>
              <h2 className={styles.formTitle}>Contact Details</h2>
              
              <div className={styles.infoBlock}>
                <h3>USA Office</h3>
                <p><strong>Rev. John Abraham</strong></p>
                <p>President & Founder</p>
                <a href="tel:9724127311" className={styles.infoLink}>972-412-7311</a>
                <a href="mailto:johnabrahamdfw@gmail.com" className={styles.infoLink}>johnabrahamdfw@gmail.com</a>
              </div>

              <div className={styles.infoBlock}>
                <h3>India Office</h3>
                <p><strong>Sunil Raj Mathew</strong></p>
                <p>India Operations Director</p>
                <a href="tel:+919446743928" className={styles.infoLink}>+91-94467-43928</a>
              </div>
              
              <div className={styles.infoBlock}>
                <h3>Mailing Address</h3>
                <address className={styles.address}>
                  REAP Asia Ministries Inc.<br />
                  Attn: Rev. John Abraham<br />
                  US Mailing Address Line 1<br />
                  City, State ZIP
                </address>
                <p style={{fontSize: '0.8rem', color: 'var(--color-muted)', marginTop: '0.5rem'}}>
                  Note: Email or phone is the fastest way to reach us.
                </p>
              </div>
            </div>
          </FadeIn>

        </div>
      </main>

      <Footer />
    </div>
  )
}
