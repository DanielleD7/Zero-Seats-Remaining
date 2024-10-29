'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Courses() {
    const router = useRouter()
  
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md space-y-8">
          <h1 className="text-3xl font-bold text-center">Welcome</h1>
          <p className="text-center text-gray-600">
            You can register for classes on OCTOBER 29
          </p>
          <div className="space-y-4">
            <Button variant="outline" className="w-full flex items-center justify-center">
              <span className="mr-2">🔍</span> Testing
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-center">
              <span className="mr-2">📚</span> 1, 2, 3
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-center">
              <span className="mr-2">📅</span> Success
            </Button>
          </div>
        </div>
      </div>
    )
  }