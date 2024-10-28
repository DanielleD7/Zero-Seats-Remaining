'use client'

import { Button } from "@/components/ui/button"
import { UserCircle } from "lucide-react"

export default function Welcome() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-center">Welcome</h1>
        <p className="text-center text-gray-600">
          You can register for classes on OCTOBER 29
        </p>
        <div className="space-y-4">
          <Button variant="outline" className="w-full flex items-center justify-center">
            <span className="mr-2">🔍</span> Class Search
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-center">
            <span className="mr-2">📚</span> My Courses
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-center">
            <span className="mr-2">📅</span> Schedule
          </Button>
        </div>
      </div>
      <div className="absolute bottom-4 right-4">
        <UserCircle className="w-8 h-8 text-gray-500" />
      </div>
    </div>
  )
}