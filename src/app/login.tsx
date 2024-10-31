'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from 'next/image'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the login logic
    // For this example, we'll just navigate to the welcome page
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
        <Button variant="default" className="w-full bg-[#BAC8F4] hover:bg-[#AABCF4] text-black font-bold"
                onClick={() => router.push('/welcome')}>
          Sign in with SSO
        </Button>
      </div>
    </div>
  )
}