import Header from "@/components/header"
import AboutMe from "@/components/about-me"
import Skills from "@/components/skills"
import ProjectList from "@/components/project-list"
import Timeline from "@/components/timeline"
import Contact from "@/components/contact"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <AboutMe />
        <Skills />
        <ProjectList />
        <Timeline />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

