'use client'

import { read } from '@/lib/neo4j'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Account, Accounts, Class, Course, Section } from "@/components/ui/data"
import { useUser } from "@/components/meta/context"
import Image from 'next/image'
import * as React from "react";
import { TransitionLink } from '@/components/meta/transition-link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()
  const { setUser } = useUser()

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()

    let query = `MATCH (profile:Profile {email: "${email}", password: "${password}"}) RETURN profile`
    let response = await read(query)

    if (response.length > 0) {
      setUser(response[0].profile.properties.CWID)
      router.push('/welcome')
    }
  }

  const handleSSO = () => {
    setUser("32480132")
    router.push('/welcome')
  }

  return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-[#E2E4EB] p-4">
        <div className="w-full max-w-md space-y-8">
          <div className="logo">
            <Image src="/logo.svg" alt="Logo" width={400} height={400} className="mx-auto"/>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleLogin}>
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-[#EBF4FA]"
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-[#EBF4FA]"
            />

            <Button type="submit" className="w-full bg-[#BAC8F4] hover:bg-[#AABCF4] text-black font-bold">
              Log In
            </Button>
          </form>

          {/*This button is outside the form tag to prevent that you need email and password pop up*/}
          <TransitionLink href={'welcome'} mode="left">
            <Button variant="default" className="w-full bg-[#BAC8F4] hover:bg-[#AABCF4] text-black font-bold mt-6" onClick={handleSSO}>
              Sign in with SSO
            </Button>
          </TransitionLink>
        </div>
      </div>
  )
}