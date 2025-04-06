"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Mail, Github, Linkedin } from "lucide-react"

export default function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const [showEmail, setShowEmail] = useState(false)
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
  
  const toggleEmailVisibility = () => {
    setShowEmail(!showEmail)
  }

  return (
    <section id="contact" className="section-container" ref={ref}>
      <h2 className="section-title">Contact</h2>
      <div className="max-w-4xl mx-auto">
        <div className={`transition-all duration-700 ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"}`}>
          <h3 className="text-2xl font-bold mb-4">Get In Touch</h3>
          <p className="text-muted-foreground mb-6">
            Feel free to reach out if you'd like to collaborate or have any questions!
          </p>

          <div className="flex items-center gap-3 mb-4">
            <Mail className="text-primary" size={20} />
            <div className="flex items-center gap-2">
              <a 
                href={showEmail ? "mailto:renantrendt@gmail.com" : "#"} 
                className={`transition-all duration-300 ${showEmail ? "hover:text-primary" : "filter blur-sm pointer-events-none select-none"}`}
                onClick={(e) => !showEmail && e.preventDefault()}
              >
                renantrendt@gmail.com
              </a>
              <button 
                onClick={toggleEmailVisibility}
                className="text-xs px-2 py-1 bg-primary text-white rounded hover:bg-primary/90 transition-colors"
              >
                {showEmail ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-8">
            <a
              href="https://github.com/renantrendt"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-muted rounded-full hover:bg-primary hover:text-white transition-colors"
              aria-label="GitHub"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/bernardo-serrano-532891345/?trk=public-profile-join-page"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-muted rounded-full hover:bg-primary hover:text-white transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin size={20} />
            </a>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            The GitHub account is my father's but I use his Github as also mine so it's gonna be kinda my projects and
            his (sorry).
          </p>
        </div>
      </div>
    </section>
  )
}

