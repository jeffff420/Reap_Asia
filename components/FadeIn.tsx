'use client'

import { useEffect, useRef, useState, ReactNode } from 'react'
import styles from './FadeIn.module.css'

interface FadeInProps {
  children: ReactNode
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
  className?: string
}

export default function FadeIn({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.8,
  className = '',
}: FadeInProps) {
  const [isVisible, setIsVisible] = useState(false)
  const domRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true)
            if (domRef.current) observer.unobserve(domRef.current)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    )

    const currentRef = domRef.current
    if (currentRef) observer.observe(currentRef)
    
    return () => {
      if (currentRef) observer.unobserve(currentRef)
    }
  }, [])

  const getDirectionClass = () => {
    switch (direction) {
      case 'up': return styles.translateUp
      case 'down': return styles.translateDown
      case 'left': return styles.translateLeft
      case 'right': return styles.translateRight
      default: return ''
    }
  }

  return (
    <div
      ref={domRef}
      className={`${styles.base} ${getDirectionClass()} ${isVisible ? styles.visible : ''} ${className}`}
      style={{
        transitionDuration: `${duration}s`,
        transitionDelay: `${delay}s`,
      }}
    >
      {children}
    </div>
  )
}
