'use client'

import { createContext, useContext, useState, ReactNode } from 'react'
import { Account, defaultAccount } from "@/components/ui/data"

interface AccountContextType {
    user: Account
    setUser: (user: Account) => void
}

const AccountContext = createContext<AccountContextType>({user: defaultAccount, setUser: (defaultAccount : Account) => {}})

export function AccountProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<Account>(defaultAccount)

    return (
        <AccountContext.Provider value={{ user, setUser }}>
            {children}
        </AccountContext.Provider>
    )
}

export function useUser() {
    return useContext(AccountContext)
}