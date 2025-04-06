export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-muted py-8">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <p className="text-muted-foreground">&copy; {currentYear} Bernardo Serrano. All rights reserved.</p>
      </div>
    </footer>
  )
}

