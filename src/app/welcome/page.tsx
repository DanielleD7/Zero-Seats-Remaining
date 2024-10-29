'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { UserCircle } from "lucide-react"
import { useState } from "react"
import SlideInOverlay from "@/components/meta/slide-in-overlay-bottom"
import StudentProfileCard from "@/components/ui/student-profile-card"

export default function Welcome() {
  const router = useRouter()
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-center">Welcome</h1>
        <p className="text-center text-gray-600">
          You can register for classes on OCTOBER 29
        </p>
        <div className="space-y-4">
          <Button variant="outline" className="w-full flex items-center justify-center" onClick={() => router.push('/find-classes')}>
            <span className="mr-2">🔍</span> Class Search
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-center" onClick={() => router.push('/courses')}>
            <span className="mr-2">📚</span> My Courses
          </Button>
          <Button variant="outline" className="w-full flex items-center justify-center" onClick={() => router.push('/schedule')}>
            <span className="mr-2">📅</span> Schedule
          </Button>
        </div>
      </div>
      <div className="absolute bottom-4 right-4">
        <Button variant="ghost" className="w-8 h-8 text-gray-500" onClick={() => setIsOverlayOpen(true)}>
            <UserCircle className="w-8 h-8 text-gray-500" />
        </Button>
      </div>
      {/* Move slide in overlay into  */}
      <SlideInOverlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)}>
          <StudentProfileCard name="Regilax" studentId="346143" classLevel="Junior" avatarUrl="https://cdn.fusiondex.org/m1XLkOnsVAUmxs_kNT4PylnQ/dn/pif/346.143.png" programOfStudy="Computer Science B.S."></StudentProfileCard>
      </SlideInOverlay>
    </div>
  )
}