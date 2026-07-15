import { createContext, useContext, useState } from 'react'

export type UserLevel = 'public' | 'governo' | 'presidencia'

interface AuthCtx {
  level: UserLevel
  setLevel: (l: UserLevel) => void
  loginOpen: boolean
  setLoginOpen: (v: boolean) => void
}

const Ctx = createContext<AuthCtx>({ level: 'public', setLevel: () => {}, loginOpen: false, setLoginOpen: () => {} })

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [level, setLevel] = useState<UserLevel>('public')
  const [loginOpen, setLoginOpen] = useState(false)
  return <Ctx.Provider value={{ level, setLevel, loginOpen, setLoginOpen }}>{children}</Ctx.Provider>
}

export const useAuth = () => useContext(Ctx)
