import { useEffect, useState } from 'react'

export const useConsoleCommands = () => {
  const [showMessage, setShowMessage] = useState(false)
  const [imageClickCount, setImageClickCount] = useState(0)
  
  useEffect(() => {
    // Create a global function that can be called from the console
    const setupConsoleCommand = () => {
      // Define the earn object if it doesn't exist
      if (!(window as any).earn) {
        (window as any).earn = {}
      }
      
      // Define the money method
      (window as any).earn.money = (amount: number) => {
        if (amount === 777) {
          setShowMessage(true)
          setTimeout(() => setShowMessage(false), 2000) // Hide after 2 seconds
          console.log('%c IT IS ME! ', 'background: #222; color: #bada55; font-size: 30px;')
          return 'IT IS ME!'
        } else {
          return 'Nice try, but that\'s not the right amount!'
        }
      }
    }
    
    // Add click event listeners to images with object-cover class
    const setupImageClickHandler = () => {
      const handleImageClick = (e: MouseEvent) => {
        const target = e.target as HTMLElement
        if (target.classList.contains('object-cover')) {
          setImageClickCount(prev => {
            const newCount = prev + 1
            if (newCount === 5) {
              setShowMessage(true)
              setTimeout(() => setShowMessage(false), 2000) // Hide after 2 seconds
              console.log('%c IT IS ME! ', 'background: #222; color: #bada55; font-size: 30px;')
              return 0 // Reset the counter
            }
            return newCount
          })
        }
      }
      
      document.addEventListener('click', handleImageClick)
      
      return () => {
        document.removeEventListener('click', handleImageClick)
      }
    }
    
    setupConsoleCommand()
    const cleanup = setupImageClickHandler()
    
    return () => {
      cleanup()
    }
  }, [])
  
  return { showMessage }
}
