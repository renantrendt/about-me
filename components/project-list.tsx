"use client"

import { useState, useRef, useEffect } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Lock } from "lucide-react"

type Project = {
  title: string
  description: string
  url?: string
  tags: string[]
  locked?: boolean
}

export default function ProjectList() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null)
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

  const projects = [
    {
      title: "Python Help",
      description: "A python analyzer to check your python code and see if it is up-to-date.",
      url: "https://python-help.bernardoserrano.com/",
      tags: ["Python", "AI", "Programming"],
      locked: true,
    },
    {
      title: "Randomizer Activities",
      description: "An app to randomize weekend activities. Features user authentication and activity management.",
      url: "https://activities-randomizer.bernardoserrano.com",
      tags: ["Next.js", "Auth", "Supabase"],
    },
    {
      title: "Met Gallery",
      description: "Explore art from the Metropolitan Museum of Art with a fun, teen-style roast feature.",
      url: "https://met.bernardoserrano.com",
      tags: ["API", "AI", "Art"],
    },
    {
      title: "Car Ranking",
      description: "A personal project to track and rank rare car sightings in California.",
      url: "https://car-ranking.bernardoserrano.com",
      tags: ["React", "Data Visualization"],
      locked: true,
    },
    {
      title: "Algebra Game",
      description: "An interactive game designed to make learning algebra fun and engaging.",
      url: "https://algebra-game.bernardoserrano.com/",
      tags: ["React", "Math", "Educational"],
    },
    {
      title: "Crypto Chart/ AthenaHQ challenge",
      description:
        "An interactive cryptocurrency chart application that allows users to track and visualize crypto prices with different chart types and save favorites. This project was inpired by a challenge that a company gave me.",
      url: "https://crypto-challenge.bernardoserrano.com/",
      tags: ["React", "API", "Financial Data", "Charts"],
    },
    {
      title: "Ancient Loot Box",
      description:
        "A gaming simulation where players can collect items, convert them to rarer items, and open treasure chests to discover new loot.",
      url: "https://ancient-loot-box.bernardoserrano.com/",
      tags: ["React", "Game", "Interactive", "Simulation"],
    },
    {
      title: "Snake Game",
      description:
        "A classic Snake game with modern features and gameplay enhancements.",
      url: "https://snake-gms.bernardoserrano.com/",
      tags: ["JavaScript", "Game", "Interactive"],
    },
    {
      title: "Strong Password",
      description:
        "A Website based on a school project, where it generates actual meaningful passwords that you can remember (I think is better than Google's).",
      url: "https://strong-password.bernardoserrano.com/",
      tags: ["JavaScript", "Game", "Idle Game", "Interactive"],
    },
    {
      title: "Doge Clicker",
      description:
        "An incremental clicker game based on the Doge meme. Click to earn virtual currency, buy miners and upgrades to automate and increase production.",
      url: "https://doge-clicker.bernardoserrano.com/",
      tags: ["JavaScript", "Game", "Idle Game", "Interactive"],
    },
    {
      title: "Pygame",
      description: "Two Python games: an enhanced Snake game and a duck-themed survival game.",
      url: "https://pygame.bernardoserrano.com",
      tags: ["Python", "Pygame", "Game Development"],
    },
    {
      title: "To-Do List",
      description: "A custom to-do list application with task management features.",
      url: "https://todo-list.bernardoserrano.com",
      tags: ["React", "Time Management", "Productivity"],
    },
  ]

  // Extract all unique tags
  const allTags = Array.from(new Set(projects.flatMap((project) => project.tags)))

  const filteredProjects = selectedTag ? projects.filter((project) => project.tags.includes(selectedTag)) : projects

  return (
    <section id="projects" className="section-container" ref={ref}>
      <h2 className="section-title">Projects</h2>

      <div className="mb-8 flex flex-wrap gap-2">
        <Badge
          variant={selectedTag === null ? "default" : "outline"}
          className="cursor-pointer text-sm py-1 px-3"
          onClick={() => setSelectedTag(null)}
        >
          All
        </Badge>
        {allTags.map((tag) => (
          <Badge
            key={tag}
            variant={selectedTag === tag ? "default" : "outline"}
            className="cursor-pointer text-sm py-1 px-3"
            onClick={() => setSelectedTag(tag)}
          >
            {tag}
          </Badge>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredProjects.map((project, index) => (
          <Card
            key={index}
            className={`project-card border transition-all duration-700 delay-${Math.min(index, 5) * 100} ${isVisible ? "opacity-100" : "opacity-0 translate-y-8"}`}
          >
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className={project.title === "Car Ranking" || project.title === "Python Help" ? "blur-[8px] select-none" : ""}>{project.title}</CardTitle>
                {project.locked && <Lock className="h-5 w-5 text-gray-400" />}
              </div>
              <CardDescription className={project.title === "Car Ranking" || project.title === "Python Help" ? "blur-[8px] select-none" : ""}>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag, tagIndex) => (
                  <Badge key={tagIndex} variant="secondary" className="text-xs">
                    {tag}
                  </Badge>
                ))}
              </div>
            </CardContent>
            {project.url && (
              <CardFooter>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full group" 
                  asChild
                  disabled={project.locked}
                >
                  <a
                    href={project.locked ? "#" : project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center"
                    onClick={(e) => project.locked && e.preventDefault()}
                  >
                    {project.locked ? "Locked" : "View Project"}
                    {project.locked ? (
                      <Lock className="ml-2 h-4 w-4" />
                    ) : (
                      <ExternalLink className="ml-2 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    )}
                  </a>
                </Button>
              </CardFooter>
            )}
          </Card>
        ))}
      </div>
    </section>
  )
}

