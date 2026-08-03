"use client"

import { useEffect, useState } from "react"
import { hasRecordingsLaunched } from "@/lib/recordings-launch"

export function useRecordingsLaunch() {
  const [isLaunched, setIsLaunched] = useState(false)

  useEffect(() => {
    const updateLaunchState = () => setIsLaunched(hasRecordingsLaunched())

    updateLaunchState()
    const timer = window.setInterval(updateLaunchState, 1000)

    return () => window.clearInterval(timer)
  }, [])

  return isLaunched
}
