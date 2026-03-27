'use client'

import { useRef } from 'react'
import styles from './HeroSpotlight.module.css'

export default function HeroSpotlight() {
  const containerRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    if (containerRef.current) {
      containerRef.current.style.setProperty('--x', `${x}px`)
      containerRef.current.style.setProperty('--y', `${y}px`)
      containerRef.current.style.opacity = '1'
    }
  }

  const handleMouseLeave = () => {
    if (containerRef.current) {
      containerRef.current.style.opacity = '0'
    }
  }

  return (
    <div
      ref={containerRef}
      className={styles.tracker}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      aria-hidden="true"
    >
      {/* 1. Large weak spotlight for glowing dots */}
      <div className={styles.spotlight} />
      
      {/* 2. Small strong glowing dot exactly on cursor */}
      <div className={styles.cursorGlow} />
    </div>
  )
}
