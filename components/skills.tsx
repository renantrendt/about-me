"use client"

import { useEffect, useState, useRef } from "react"

export default function Skills() {
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

  const skills = [
    { name: "JavaScript/TypeScript", level: 85 },
    { name: "React", level: 80 },
    { name: "Next.js", level: 75 },
    { name: "HTML/CSS", level: 90 },
    { name: "Python", level: 70 },
    { name: "Problem Solving", level: 85 },
  ]

  return (
    <section id="skills" className="section-container bg-muted">
      <div className="max-w-3xl mx-auto" ref={ref}>
        <h2 className="section-title">Skills</h2>
        <div className="space-y-6">
          {skills.map((skill, index) => (
            <div
              key={index}
              className={`transition-all duration-700 delay-${index * 100} ${isVisible ? "opacity-100" : "opacity-0 translate-y-4"}`}
            >
              <div className="flex justify-between mb-2">
                <span className="font-medium">{skill.name}</span>
                <span>{skill.level}%</span>
              </div>
              <div className="skill-bar">
                {isVisible && <div className="skill-progress" style={{ width: `${skill.level}%` }}></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

