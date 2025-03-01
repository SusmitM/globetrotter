"use client"

import React, { createContext, useContext, useState, ReactNode } from "react"

type StateContextType = {
  score: number
  setScore: (score: number) => void
  isLoading: boolean
  setIsLoading: (isLoading: boolean) => void
  
}

const StateContext = createContext<StateContextType | undefined>(undefined)


export function StateProvider({ children }: { children: ReactNode }) {

  const [score, setScore] = useState<number>(10)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  
  
  const value = {
    score,
    setScore,
    isLoading,
    setIsLoading,
  }
  
  return (
    <StateContext.Provider value={value}>
      {children}
    </StateContext.Provider>
  )
}

export function useStateContext() {
  const context = useContext(StateContext)
  
  if (context === undefined) {
    throw new Error("useStateContext must be used within a StateProvider")
  }
  
  return context
} 