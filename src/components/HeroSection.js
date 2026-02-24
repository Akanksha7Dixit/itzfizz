'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: '98%', label: 'Client Satisfaction' },
  { value: '12+', label: 'Years Experience' },
  { value: '340+', label: 'Projects Shipped' },
  { value: '60%', label: 'Avg. Growth Rate' },
]

const HEADLINE = 'W E L C O M E  I T Z F I Z Z'.split('')

export default function HeroSection() {
  const sectionRef = useRef(null)
  const headlineRef = useRef(null)
  const statsRef = useRef(null)
  const orbRef = useRef(null)
  const visualRef = useRef(null)
  const navRef = useRef(null)
  const eyeRef = useRef(null)
  const tlRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tlRef.current = tl

      // Nav fade in
      tl.fromTo(
        navRef.current,
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
      )

      // Headline letters stagger
      const letters = headlineRef.current.querySelectorAll('.letter')
      tl.fromTo(
        letters,
        { opacity: 0, y: 80, rotateX: -90 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 0.7,
          stagger: 0.025,
          ease: 'power3.out',
        },
        '-=0.4'
      )

      // Subtext
      tl.fromTo(
        '.hero-subtext',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
        '-=0.3'
      )

      // Stats stagger
      const statCards = statsRef.current.querySelectorAll('.stat-item')
      tl.fromTo(
        statCards,
        { opacity: 0, y: 40, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: 'back.out(1.7)',
        },
        '-=0.3'
      )

      // Visual element reveal
      tl.fromTo(
        visualRef.current,
        { clipPath: 'inset(0 100% 0 0)', opacity: 0 },
        {
          clipPath: 'inset(0 0% 0 0)',
          opacity: 1,
          duration: 1.2,
          ease: 'power4.inOut',
        },
        '-=0.8'
      )

      // CTA buttons
      tl.fromTo(
        '.cta-group',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' },
        '-=0.5'
      )

      // Scroll-based parallax on visual element
      gsap.to(visualRef.current, {
        y: '-25%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1.5,
        },
      })

      // Orb parallax
      gsap.to(orbRef.current, {
        y: '-40%',
        x: '10%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 2,
        },
      })

      // Headline parallax
      gsap.to(headlineRef.current, {
        y: '15%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Section fade out on scroll
      gsap.to('.hero-content', {
        opacity: 0,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '60% top',
          end: 'bottom top',
          scrub: 1,
        },
      })

      // Stat numbers count up
      statCards.forEach((card) => {
        const numEl = card.querySelector('.stat-num')
        const target = numEl.dataset.value
        const isPercent = target.includes('%')
        const isPlus = target.includes('+')
        const num = parseFloat(target)

        const counter = { val: 0 }

        tl.fromTo(
          counter,
          { val: 0 },
          {
            val: num,
            duration: 1.5,
            ease: 'power2.out',
            onUpdate: () => {
              const v = Math.round(counter.val)
              numEl.textContent = v + (isPercent ? '%' : isPlus ? '+' : '')
            },
          },
          '<0.1'
        )
      })
    }, sectionRef)

    // Magnetic cursor effect on CTA
    const ctaBtns = document.querySelectorAll('.cta-btn')
    ctaBtns.forEach((btn) => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect()
        const x = e.clientX - rect.left - rect.width / 2
        const y = e.clientY - rect.top - rect.height / 2
        gsap.to(btn, {
          x: x * 0.3,
          y: y * 0.3,
          duration: 0.4,
          ease: 'power2.out',
        })
      })
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
      })
    })

    // Eye follow cursor
    const handleMouseMove = (e) => {
      if (!eyeRef.current) return
      const rect = eyeRef.current.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const angle = Math.atan2(e.clientY - cy, e.clientX - cx)
      const dist = Math.min(8, Math.hypot(e.clientX - cx, e.clientY - cy) * 0.1)
      gsap.to(eyeRef.current.querySelector('.pupil'), {
        x: Math.cos(angle) * dist,
        y: Math.sin(angle) * dist,
        duration: 0.3,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      ctx.revert()
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative h-screen overflow-hidden flex flex-col"
      style={{ background: 'var(--bg)' }}
    >
      {/* ── Background orbs ── */}
      <div
        ref={orbRef}
        className="absolute pointer-events-none"
        style={{
          width: '600px',
          height: '600px',
          top: '-100px',
          right: '-100px',
          borderRadius: '50%',
          filter: 'blur(80px)',
          background: 'radial-gradient(circle, rgba(200,240,60,0.12) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute pointer-events-none"
        style={{
          width: '400px',
          height: '400px',
          bottom: '-50px',
          left: '10%',
          borderRadius: '50%',
          filter: 'blur(80px)',
          background: 'radial-gradient(circle, rgba(200,240,60,0.06) 0%, transparent 70%)',
        }}
      />

      {/* ── Navigation ── */}
      <nav
        ref={navRef}
        className="relative z-20 flex items-center justify-between px-8 py-6"
        style={{ opacity: 0 }}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div
            ref={eyeRef}
            className="w-8 h-8 rounded-full flex items-center justify-center relative"
            style={{ border: '1px solid var(--accent)' }}
          >
            <div
              className="pupil w-3 h-3 rounded-full"
              style={{ background: 'var(--accent)' }}
            />
          </div>
          <span
            className="text-sm font-medium tracking-[0.2em] uppercase"
            style={{ color: 'var(--fg)', fontFamily: 'DM Mono, monospace' }}
          >
            ITZFIZZ
          </span>
        </div>

        {/* Nav links */}
        <div className="hidden md:flex items-center gap-8">
          {['Work', 'Services', 'About', 'Lab'].map((item) => (
            <a
              key={item}
              href="#"
              className="nav-link"
              style={{
                color: 'rgba(240,237,230,0.6)',
                fontFamily: 'DM Mono, monospace',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              {item}
            </a>
          ))}
        </div>

        {/* Nav CTA */}
        <a
          href="#"
          className="cta-btn"
          style={{
            border: '1px solid var(--border)',
            padding: '0.5rem 1.25rem',
            fontFamily: 'DM Mono, monospace',
            fontSize: '11px',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            position: 'relative',
            overflow: 'hidden',
            color: 'var(--fg)',
          }}
        >
          <span style={{ position: 'relative', zIndex: 1 }}>Get in Touch</span>
        </a>
      </nav>

      {/* ── Hero content ── */}
      <div className="hero-content relative z-10 flex-1 flex flex-col justify-between px-8 pb-8">

        {/* Upper: headline + subtext + CTA */}
        <div className="flex-1 flex flex-col justify-center">

          <p
            className="eyebrow mb-3"
            style={{
              fontFamily: 'DM Mono, monospace',
              fontSize: '11px',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
            }}
          >
            ✦ Digital Experience Studio
          </p>

          {/* Headline */}
          <h1
            ref={headlineRef}
            style={{
              fontFamily: 'Bebas Neue, sans-serif',
              letterSpacing: '0.25em',
              lineHeight: 0.9,
              fontSize: 'clamp(3.5rem, 9vw, 10rem)',
              color: 'var(--fg)',
              perspective: '800px',
            }}
          >
            {HEADLINE.map((char, i) => (
              <span
                key={i}
                className="letter"
                style={{
                  display: 'inline-block',
                  opacity: 0,
                  minWidth: char === ' ' ? '0.3em' : undefined,
                }}
              >
                {char === ' ' ? '\u00A0' : char}
              </span>
            ))}
          </h1>

          {/* Subtext */}
          <p
            className="hero-subtext mt-4 max-w-md"
            style={{
              color: 'rgba(240,237,230,0.45)',
              fontFamily: 'DM Sans, sans-serif',
              fontWeight: 300,
              fontSize: '15px',
              lineHeight: 1.7,
              opacity: 0,
            }}
          >
            We craft digital products that move fast, look sharp, and create
            impact. From brand identity to full-scale web experiences.
          </p>

          {/* CTA group */}
          <div
            className="cta-group flex items-center gap-4 mt-8"
            style={{ opacity: 0 }}
          >
            <a
              href="#"
              className="cta-btn"
              style={{
                border: '1px solid var(--accent)',
                padding: '1rem 2rem',
                fontFamily: 'DM Mono, monospace',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                position: 'relative',
                overflow: 'hidden',
                color: 'var(--fg)',
              }}
            >
              <span style={{ position: 'relative', zIndex: 1 }}>View Our Work</span>
            </a>

            <a
              href="#"
              className="flex items-center gap-2"
              style={{
                color: 'rgba(240,237,230,0.4)',
                fontFamily: 'DM Mono, monospace',
                fontSize: '11px',
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                textDecoration: 'none',
              }}
            >
              <span
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{ border: '1px solid var(--border)' }}
              >
                ↗
              </span>
              Watch Reel
            </a>
          </div>
        </div>

        {/* Lower: stats bar */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-3"
        >
          {STATS.map((stat, i) => (
            <div
              key={i}
              className="stat-item"
              style={{
                background: 'rgba(240,237,230,0.03)',
                border: '1px solid var(--border)',
                backdropFilter: 'blur(10px)',
                padding: '1rem 1.25rem',
                opacity: 0,
              }}
            >
              <div
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: '2.5rem',
                  color: 'var(--accent)',
                  lineHeight: 1,
                  marginBottom: '0.25rem',
                }}
              >
                <span
                  className="stat-num"
                  data-value={stat.value}
                >
                  {stat.value}
                </span>
              </div>
              <div
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '10px',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: 'rgba(240,237,230,0.35)',
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Right-side visual card ── */}
      <div
        ref={visualRef}
        className="absolute hidden lg:block"
        style={{
          right: '2rem',
          top: '50%',
          transform: 'translateY(-50%)',
          width: '300px',
          height: '400px',
          background: 'linear-gradient(135deg, rgba(200,240,60,0.08), rgba(200,240,60,0.02))',
          border: '1px solid rgba(200,240,60,0.15)',
          backdropFilter: 'blur(20px)',
          opacity: 0,
          zIndex: 5,
        }}
      >
        {/* Grid texture */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(200,240,60,0.05) 1px, transparent 1px),
              linear-gradient(90deg, rgba(200,240,60,0.05) 1px, transparent 1px)
            `,
            backgroundSize: '40px 40px',
          }}
        />

        {/* Corner brackets */}
        <div
          className="absolute"
          style={{
            top: 12, right: 12, width: 12, height: 12,
            borderTop: '1px solid var(--accent)',
            borderRight: '1px solid var(--accent)',
          }}
        />
        <div
          className="absolute"
          style={{
            bottom: 12, left: 12, width: 12, height: 12,
            borderBottom: '1px solid var(--accent)',
            borderLeft: '1px solid var(--accent)',
          }}
        />

        {/* Floating label */}
        <div
          className="absolute"
          style={{
            top: -14, left: -14,
            background: 'var(--accent)',
            color: 'var(--bg)',
            fontFamily: 'DM Mono, monospace',
            fontSize: '10px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            padding: '4px 10px',
          }}
        >
          Live 2025
        </div>

        {/* Card content */}
        <div
          className="relative z-10 flex flex-col justify-between h-full"
          style={{ padding: '1.5rem' }}
        >
          <div>
            <div
              style={{
                fontFamily: 'DM Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                marginBottom: '0.75rem',
              }}
            >
              Currently Available
            </div>
            <div
              style={{
                fontFamily: 'Bebas Neue, sans-serif',
                fontSize: '2rem',
                letterSpacing: '0.1em',
                color: 'var(--fg)',
                marginBottom: '0.5rem',
              }}
            >
              2025 COHORT
            </div>
            <div
              style={{
                fontSize: '13px',
                color: 'rgba(240,237,230,0.35)',
                fontWeight: 300,
              }}
            >
              Taking on select projects for Q3 2025
            </div>
          </div>

          {/* Progress bars */}
          <div>
            {[
              { label: 'Web Design', pct: 92 },
              { label: 'Motion', pct: 78 },
              { label: 'Strategy', pct: 85 },
            ].map((bar, i) => (
              <div key={i} style={{ marginBottom: i < 2 ? '1rem' : 0 }}>
                <div
                  className="flex justify-between"
                  style={{
                    fontFamily: 'DM Mono, monospace',
                    fontSize: '10px',
                    color: 'rgba(240,237,230,0.35)',
                    marginBottom: '4px',
                  }}
                >
                  <span>{bar.label}</span>
                  <span>{bar.pct}%</span>
                </div>
                <div
                  style={{
                    height: '1px',
                    background: 'rgba(240,237,230,0.1)',
                    position: 'relative',
                  }}
                >
                  <div
                    className="bar-fill"
                    style={{
                      position: 'absolute',
                      top: 0, left: 0,
                      height: '100%',
                      width: `${bar.pct}%`,
                      background: 'var(--accent)',
                      transformOrigin: 'left',
                      transform: 'scaleX(0)',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom marquee ── */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden z-20"
        style={{ borderTop: '1px solid var(--border)', padding: '8px 0' }}
      >
        <div
          className="flex gap-8 whitespace-nowrap"
          style={{ animation: 'marquee 25s linear infinite' }}
        >
          {Array(6)
            .fill([
              'Brand Identity', 'Web Experience', 'Motion Design',
              'Digital Strategy', 'UI Engineering', 'Creative Direction',
            ])
            .flat()
            .map((item, i) => (
              <span
                key={i}
                style={{
                  fontFamily: 'DM Mono, monospace',
                  fontSize: '10px',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(240,237,230,0.2)',
                  flexShrink: 0,
                }}
              >
                {item}{' '}
                <span style={{ color: 'var(--accent)' }}>✦</span>
              </span>
            ))}
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div
        className="hero-content absolute bottom-16 left-8 z-20 flex flex-col items-center gap-2"
        style={{ opacity: 0 }}
      >
        <div
          style={{
            fontFamily: 'DM Mono, monospace',
            fontSize: '9px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(240,237,230,0.25)',
            writingMode: 'vertical-rl',
          }}
        >
          Scroll
        </div>
        <div
          style={{
            width: '1px',
            height: '48px',
            background: 'rgba(240,237,230,0.1)',
            overflow: 'hidden',
            position: 'relative',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              background: 'var(--accent)',
              animation: 'scrolldown 2s ease-in-out infinite',
            }}
          />
        </div>
      </div>
    </section>
  )
}