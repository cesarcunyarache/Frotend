"use client"

import { Progress } from "@/components/ui/progress"
import { useEffect, useState } from "react"

function Loading() {
  const [progress, setProgress] = useState(10)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return 0
        }
        const diff = Math.random() * 10
        return Math.min(oldProgress + diff, 100)
      })
    }, 500)

    return () => {
      clearInterval(timer)
    }
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50">
      <Progress value={progress} className="w-full h-1" />
    </div>
  )
}

export default Loading