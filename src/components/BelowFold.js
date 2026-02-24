'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SERVICES = [
  { num: '01', title: 'Brand Identity', desc: 'Distinctive visual systems that communicate your core at every touchpoint.' },
  { num: '02', title: 'Web Experience', desc: 'Performant, animated digital spaces built for conversion and delight.' },
  { num: '03', title: 'Motion Design', desc: 'Kinetic brand assets, explainers, and UI motion that make things click.' },
  { num: '04', title: 'Creative Direction', desc: 'Strategic oversight of your visual communication ecosystem.' },
]

export default function BelowFold() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Reveal service items
      gsap.fromTo(
        '.service-row',
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.services-grid',
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        }
      )

      // Big text reveal
      gsap.fromTo(
        '.big-text',
        { opacity: 0, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.big-text',
            start: 'top 85%',
          },
        }
      )

      // Progress bars animate when in view
      gsap.fromTo(
        '.progress-bar',
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.2,
          ease: 'power3.inOut',
          stagger: 0.15,
          scrollTrigger: {
            trigger: '.progress-bar',
            start: 'top 90%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef}>
      {/* Services section */}
      <section
        className="min-h-screen px-8 py-24"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-end justify-between mb-16">
            <div>
              <span
                className="text-xs tracking-[0.4em] uppercase block mb-3"
                style={{ color: 'var(--accent)', fontFamily: 'DM Mono, monospace' }}
              >
                ✦ What We Do
              </span>
              <h2
                className="big-text opacity-0"
                style={{
                  fontFamily: 'Bebas Neue, sans-serif',
                  fontSize: 'clamp(3rem, 6vw, 7rem)',
                  letterSpacing: '0.1em',
                  color: 'var(--fg)',
                  lineHeight: 0.9,
                }}
              >
                OUR CRAFT
              </h2>
            </div>
            <a
              href="#"
              className="hidden md:flex items-center gap-2 text-xs tracking-widest uppercase"
              style={{ color: 'rgba(240,237,230,0.4)', fontFamily: 'DM Mono, monospace' }}
            >
              All Services ↗
            </a>
          </div>

          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <div
                key={i}
                className="service-row opacity-0 flex items-start gap-8 py-8 group cursor-pointer"
                style={{
                  borderBottom: '1px solid var(--border)',
                  transition: 'padding-left 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.paddingLeft = '20px'
                  gsap.to(e.currentTarget.querySelector('.svc-num'), {
                    color: 'var(--accent)',
                    duration: 0.2,
                  })
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.paddingLeft = '0px'
                  gsap.to(e.currentTarget.querySelector('.svc-num'), {
                    color: 'rgba(240,237,230,0.2)',
                    duration: 0.2,
                  })
                }}
              >
                <span
                  className="svc-num text-xs pt-1"
                  style={{
                    color: 'rgba(240,237,230,0.2)',
                    fontFamily: 'DM Mono, monospace',
                    minWidth: '30px',
                  }}
                >
                  {s.num}
                </span>
                <div className="flex-1">
                  <h3
                    style={{
                      fontFamily: 'Bebas Neue, sans-serif',
                      fontSize: 'clamp(1.5rem, 3vw, 3.5rem)',
                      letterSpacing: '0.1em',
                      color: 'var(--fg)',
                    }}
                  >
                    {s.title}
                  </h3>
                  <p
                    className="mt-2 max-w-md"
                    style={{
                      color: 'rgba(240,237,230,0.4)',
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '14px',
                      fontWeight: 300,
                    }}
                  >
                    {s.desc}
                  </p>
                </div>
                <span
                  className="text-2xl group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-300"
                  style={{ color: 'rgba(240,237,230,0.2)' }}
                >
                  ↗
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer strip */}
      <section
        className="px-8 py-12 flex items-center justify-between"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <span
          style={{
            fontFamily: 'Bebas Neue, sans-serif',
            fontSize: '1.5rem',
            letterSpacing: '0.2em',
            color: 'rgba(240,237,230,0.2)',
          }}
        >
          ITZFIZZ © 2025
        </span>
        <span
          className="text-xs tracking-widest uppercase"
          style={{ color: 'rgba(240,237,230,0.2)', fontFamily: 'DM Mono, monospace' }}
        >
          All Rights Reserved
        </span>
      </section>
    </div>
  )
}
