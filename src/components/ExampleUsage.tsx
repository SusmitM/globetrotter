"use client"

import { useStateContext } from "@/context/StateProvider"

export default function ExampleUsage() {
  const { score, setScore} = useStateContext()
  
  return (
    <div className="border border-red-500">
      <p>Current score: {score}</p>
      <button onClick={() => setScore(score + 10)}>Add 10 points</button>
      
    </div>
  )
} 