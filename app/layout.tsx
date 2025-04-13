import type React from "react"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider-custom"
import ConsoleMessage from "@/components/console-message"

export const metadata = {
  title: "Bernardo Serrano - Portfolio",
  description: "Portfolio of Bernardo Serrano, a 12-year-old aspiring developer",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className="scroll-smooth">
      <body>
        <ThemeProvider>
          {children}
          <ConsoleMessage />
        </ThemeProvider>
      </body>
    </html>
  )
}