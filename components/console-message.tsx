"use client"

import { useConsoleCommands } from "@/hooks/useConsoleCommands"

export default function ConsoleMessage() {
  const { showMessage } = useConsoleCommands()

  if (!showMessage) return null

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/80 animate-fade-in">
      <div className="text-center">
        <h1 className="text-7xl md:text-9xl font-bold text-white animate-pulse">
          IT IS ME!
        </h1>
        <p className="text-2xl md:text-3xl text-white mt-4">
          
        </p>
      </div>
    </div>
  )
}
