/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useState, useCallback, useMemo } from 'react'

// Lets any CTA (nav, hero, close) open the single intake modal without prop
// drilling. The modal is rendered once at the App root and reads this context.
const IntakeContext = createContext(null)

export function IntakeProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false)
  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const value = useMemo(() => ({ isOpen, open, close }), [isOpen, open, close])
  return <IntakeContext.Provider value={value}>{children}</IntakeContext.Provider>
}

export function useIntake() {
  const ctx = useContext(IntakeContext)
  if (!ctx) throw new Error('useIntake must be used within <IntakeProvider>')
  return ctx
}
