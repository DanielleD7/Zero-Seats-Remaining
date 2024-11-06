'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { UserCircle } from "lucide-react"
import { useState } from "react"
import Image from 'next/image'
import PageTransition from '../../components/meta/page-transition'
import SlideInOverlay from "@/components/meta/slide-in-overlay-bottom"
import StudentProfileCard from "@/components/ui/student-profile-card"
import OpeningDatesCard from "@/components/ui/opening-dates-card"

export default function Welcome() {
  const router = useRouter()
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [isOverlayOpenRegistrationDates, setIsOverlayOpenRegistrationDates] = useState(false)
  return (
    <PageTransition>
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#E2E4EB] p-4">
        <style jsx>{` @font-face {
              font-family: 'Playwrite US Trad';
              src: url('/PlaywriteUSTrad-VariableFont_wght.ttf') format('truetype');
              font-weight: normal;
              font-style: normal; 
        } 
        
        .playwrite-font {
              font-family: 'Playwrite US Trad', sans-serif;
        } `}</style>

        <div className="w-full max-w-md space-y-8">
            <h1 className="text-5xl text-center playwrite-font">Welcome</h1>

            <button className="w-full text-center mt-6 bg-[#ECECEC] p-1 rounded-xl">
                <div onClick={() => setIsOverlayOpenRegistrationDates(true)}>
                    <p className="text-gray-600 text-base">You can register for classes on</p>
                    <p className="text-black font-bold text-xl">OCTOBER 29</p>
                </div>
            </button>

            <div className="space-y-4">
                <Button variant="default"
                        className="w-full flex items-center justify-center font-bold text-black bg-[#BAC8F4] hover:bg-[#AABCF4]"
                        onClick={() => router.push('/find-classes')}>
                    <Image src='/search-icon.svg' alt="Search" width={16} height={16} className="mr-2"/>
                    Class Search
                </Button>

                <Button variant="default"
                        className="w-full flex items-center justify-center font-bold text-black bg-[#BAC8F4] hover:bg-[#AABCF4]"
                        onClick={() => router.push('/courses')}>
                    <Image src='/my-courses-icon.svg' alt="My Courses" width={25} height={25} className="mr-2"/>
                    My Courses
                </Button>

                <Button variant="default"
                        className="w-full flex items-center justify-center font-bold text-black bg-[#BAC8F4] hover:bg-[#AABCF4]"
                        onClick={() => router.push('/schedule')}>
                    <Image src='/calendar-icon.svg' alt="Schedule" width={25} height={25} className="mr-2"/>
                    Schedule
                </Button>
            </div>
        </div>

        <div className="absolute bottom-4 right-4">
            {/*Find a way to put them together*/}
            {/*The svg icon doesn't show when just inserting the Image tag in the button*/}
            {/*<div className="absolute bottom-4 right-4">*/}
            {/*    <Image src='/profile-icon.svg' alt="Profile" width={30} height={30} className="mr-2"/>*/}
          {/*</div>*/}

          <Button variant="ghost" className="w-8 h-8 text-gray-500" onClick={() => setIsOverlayOpen(true)}>
              <UserCircle className="w-8 h-8 text-gray-500" />
          </Button>
      </div>

      {/* Move slide in overlay into  */}
      <SlideInOverlay isOpen={isOverlayOpen} title="Student Profile" onClose={() => setIsOverlayOpen(false)}>
          <StudentProfileCard name="Regilax" studentId="346143" classLevel="Junior" avatarUrl="/lilguy.svg" programOfStudy="Computer Science B.S."></StudentProfileCard>
      </SlideInOverlay>
      <SlideInOverlay isOpen={isOverlayOpenRegistrationDates} title="Registration Dates" onClose={() => setIsOverlayOpenRegistrationDates(false)}>
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
    </PageTransition>
  )
}