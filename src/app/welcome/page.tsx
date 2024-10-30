'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { UserCircle } from "lucide-react"
import { useState } from "react"
import SlideInOverlay from "@/components/meta/slide-in-overlay-bottom"
import StudentProfileCard from "@/components/ui/student-profile-card"
import OpeningDatesCard from "@/components/ui/opening-dates-card"

export default function Welcome() {
  const router = useRouter()
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [isOverlayOpenRegistrationDates, setIsOverlayOpenRegistrationDates] = useState(false)
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md space-y-8">
        <h1 className="text-3xl font-bold text-center">Welcome</h1>
        <p className="text-center text-gray-600">
          You can register for classes on 
          <i onClick={()=>setIsOverlayOpenRegistrationDates(true)}> OCTOBER 29</i>
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
      <SlideInOverlay isOpen={isOverlayOpenRegistrationDates} onClose={() => setIsOverlayOpenRegistrationDates(false)}>
          <OpeningDatesCard openTime={"7:30AM"} timezone={"EST"} registrationDates={[
              { creditHours: "90+", date: "October 29", day: "Tuesday" },
              { creditHours: "75-89", date: "October 31", day: "Friday" },
              { creditHours: "60-74", date: "November 1", day: "Friday" },
              { creditHours: "50-59", date: "November 7", day: "Thursday" },
              { creditHours: "40-49", date: "November 8", day: "Friday" },
              { creditHours: "30-39", date: "November 11", day: "Monday" },
              { creditHours: "20-29", date: "November 12", day: "Tuesday" },
              { creditHours: "1-19", date: "November 13", day: "Wednesday" },
              { creditHours: "0", date: "November 14", day: "Thursday" },]}></OpeningDatesCard>
      </SlideInOverlay>
    </div>
  )
}