'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

interface UserContextType {
    user: string
    setUser: (user: string) => void
}

const UserContext = createContext<UserContextType>({user: "", setUser: () => {}})

export function UserProvider({ children } : { children: ReactNode }) {
    const [user, setUser] = useState<string>("")

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export function useUser() {
    return useContext(UserContext)
}