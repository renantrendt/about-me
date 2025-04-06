"use client"

import { useEffect, useState, useRef } from "react"

export default function Timeline() {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 },
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const events = [
    { year: "2021", title: "Started Learning to Code", description: "Took my first steps in the world of programming" },
    {
      year: "Dec 2024",
      title: "Started Programming for Real",
      description: "Began developing more serious projects and deepening my knowledge",
    },
    {
      year: "2025",
      title: "Significant Improvement",
      description: "My programming skills improved dramatically as I tackled more complex projects",
    },
    {
      year: "Jan-Apr 2025",
      title: "Continued Growth",
      description: "Expanded my portfolio with several new projects and technologies",
    },
  ]

  return (
    <section id="timeline" className="section-container bg-muted" ref={ref}>
      <h2 className="section-title">My Journey</h2>
      <div className="max-w-3xl mx-auto mt-12">
        <div className="timeline">
          {events.map((event, index) => (
            <div
              key={index}
              className={`timeline-item transition-all duration-700 delay-${index * 100} ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"}`}
            >
              <div className="bg-background p-6 rounded-lg shadow-sm mb-6">
                <div className="text-sm text-primary font-semibold mb-1">{event.year}</div>
                <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                <p className="text-muted-foreground">{event.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

