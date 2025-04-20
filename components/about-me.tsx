"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function AboutMe() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="about" className="section-container">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div className={`transition-all duration-1000 ${isVisible ? "opacity-100" : "opacity-0 translate-y-10"}`}>
          <h1 className="text-4xl font-bold mb-4">Hi, I'm Bernardo</h1>
          <p className="text-lg mb-6 text-muted-foreground">
            I'm a 12-year-old aspiring developer with a passion for programming and mathematics. Always eager to learn
            and improve my skills, I love creating projects that challenge me and push the boundaries of what I can do.
          </p>
          <div className="flex gap-4">
            <Button variant="outline" asChild>
              <a href="https://terminal.bernardoserrano.com/" target="_blank" rel="noopener noreferrer">Terminal version</a>
            </Button>
          </div>
        </div>
        <div
          className={`flex justify-center transition-all duration-1000 delay-300 ${isVisible ? "opacity-100" : "opacity-0 translate-y-10"}`}
        >
          <div className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-primary shadow-xl">
            <Image src="/profile.jpeg" alt="Bernardo Serrano" fill className="object-cover" priority />
          </div>
        </div>
      </div>
    </section>
  )
}

