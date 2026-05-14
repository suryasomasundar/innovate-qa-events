"use client"

import { useState, useEffect } from "react"

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

interface CountdownTimerProps {
  targetDate: Date
}

function calculateTimeLeft(target: Date): TimeLeft {
  const difference = target.getTime() - Date.now()
  if (difference <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  }
  return {
    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
    hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((difference / 1000 / 60) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  }
}

export function CountdownTimer({ targetDate }: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(() => calculateTimeLeft(targetDate))

  useEffect(() => {
    setTimeLeft(calculateTimeLeft(targetDate))
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate))
    }, 1000)
    return () => clearInterval(timer)
  }, [targetDate])

  const timeBlocks = [
    { value: timeLeft.days, label: "Days" },
    { value: timeLeft.hours, label: "Hours" },
    { value: timeLeft.minutes, label: "Minutes" },
    { value: timeLeft.seconds, label: "Seconds" },
  ]

  return (
    <div className="flex flex-wrap gap-2 sm:gap-3 md:gap-4 justify-center">
      {timeBlocks.map((block, index) => (
        <div key={block.label} className="flex flex-col items-center">
          <div className="relative">
            <div className="bg-card/90 backdrop-blur-sm border border-primary/20 rounded-xl px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4 min-w-[60px] sm:min-w-[70px] md:min-w-[90px] shadow-lg">
              <span
                className="text-2xl sm:text-3xl md:text-5xl font-bold text-primary tabular-nums"
                suppressHydrationWarning
              >
                {String(block.value).padStart(2, "0")}
              </span>
            </div>
            {index < timeBlocks.length - 1 && (
              <span className="absolute -right-1.5 sm:-right-2 md:-right-3 top-1/2 -translate-y-1/2 text-xl sm:text-2xl md:text-3xl font-bold text-primary/50">
                :
              </span>
            )}
          </div>
          <span className="text-[10px] sm:text-xs md:text-sm text-muted-foreground mt-1 sm:mt-2 font-medium uppercase tracking-wider">
            {block.label}
          </span>
        </div>
      ))}
    </div>
  )
}
