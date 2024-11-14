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
import Modal from "@/components/meta/modal"
import HoldBanner from "@/components/ui/hold-banner"
import { AlertTriangle } from 'lucide-react'
import Link from "next/link"
import { TransitionLink } from "@/components/meta/transition-link"

const handleBannerClick = () => {}

export default function Welcome() {
  const router = useRouter()
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [isOverlayOpenRegistrationDates, setIsOverlayOpenRegistrationDates] = useState(false)
  const [hasRegistrationHold] = useState(true)

  return (
    <div>
    {hasRegistrationHold && <Modal
        trigger={<a><HoldBanner onClick={handleBannerClick} subheading="Academic Advising - Tap for more info"/></a>}
        title="REGISTRATION HOLD"
        variant = "destructive"
      >
      <div className = "pb-0 pl-3 pr-3" style={{textAlign: "center"}}>
        <b>Academic Advising</b>
      </div>
      <div className = "pb-5 pl-3 pr-5" style={{textAlign: "center"}}>
        You have an advisory hold placed on your account. This hold must be lifted before you can register. To have your hold lifted, please contact your advisor or department.
      </div>
    </Modal>}

        <div className="flex flex-col items-center justify-center min-h-screen bg-[#E2E4EB] p-4 dyslexia-font">
            <style jsx global>{` @font-face {
                font-family: 'Dyslexia Font';
                src: url('/Dyslexia_Font.ttf') format('truetype');
                font-weight: normal;
                font-style: normal;
            }

            .dyslexia-font {
                font-family: 'Dyslexia Font', sans-serif;
            } `}</style>

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
                    <TransitionLink href="find-classes" mode="left"><Button variant="default"
                                                                            className="w-full flex items-center justify-center font-bold text-black bg-[#BAC8F4] hover:bg-[#AABCF4]"
                    >
                        <Image src='/search-icon.svg' alt="Search" width={16} height={16} className="mr-2"/>
                        Class Search
                    </Button></TransitionLink>

                    <TransitionLink href="courses" mode="left">
                        <Button variant="default"
                                className="w-full flex items-center justify-center font-bold text-black bg-[#BAC8F4] hover:bg-[#AABCF4] mt-4"
                        >
                            <Image src='/my-courses-icon.svg' alt="My Courses" width={25} height={25} className="mr-2"/>
                            My Courses
                        </Button>
                    </TransitionLink>

                    <TransitionLink href="schedule" mode="top"><Button variant="default"
                                                                       className="w-full flex items-center justify-center font-bold text-black bg-[#BAC8F4] hover:bg-[#AABCF4] mt-4"
                    >
                        <Image src='/calendar-icon.svg' alt="Schedule" width={25} height={25} className="mr-2"/>
                        Schedule
                    </Button></TransitionLink>
                </div>
            </div>

            <div className="absolute bottom-4 right-4">
                {/*Find a way to put them together*/}
                {/*The svg icon doesn't show when just inserting the Image tag in the button*/}
                {/*<div className="absolute bottom-4 right-4">*/}
                {/*    <Image src='/profile-icon.svg' alt="Profile" width={30} height={30} className="mr-2"/>*/}
                {/*</div>*/}

                <Button variant="ghost" className="w-8 h-8 text-gray-500" onClick={() => setIsOverlayOpen(true)}>
                    <UserCircle className="w-8 h-8 text-gray-500"/>
                </Button>
            </div>

            {/* Move slide in overlay into  */}
            <SlideInOverlay isOpen={isOverlayOpen} title="Student Profile" onClose={() => setIsOverlayOpen(false)}>
                <StudentProfileCard name="Regilax" studentId="346143" classLevel="Junior" avatarUrl="/lilguy.svg"
                                    programOfStudy="Computer Science B.S."></StudentProfileCard>
            </SlideInOverlay>

            <SlideInOverlay isOpen={isOverlayOpenRegistrationDates} title="Registration Dates"
                            onClose={() => setIsOverlayOpenRegistrationDates(false)}>
                <OpeningDatesCard openTime={"7:30AM"} timezone={"EST"} registrationDates={[
                    {creditHours: "90+", date: "October 29", day: "Tuesday"},
                    {creditHours: "75-89", date: "October 31", day: "Friday"},
                    {creditHours: "60-74", date: "November 1", day: "Friday"},
                    {creditHours: "50-59", date: "November 7", day: "Thursday"},
                    {creditHours: "40-49", date: "November 8", day: "Friday"},
                    {creditHours: "30-39", date: "November 11", day: "Monday"},
                    {creditHours: "20-29", date: "November 12", day: "Tuesday"},
                    {creditHours: "1-19", date: "November 13", day: "Wednesday"},
                    {creditHours: "0", date: "November 14", day: "Thursday"},]}></OpeningDatesCard>
            </SlideInOverlay>
        </div>
    </div>
  )
}