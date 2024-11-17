'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { UserCircle } from "lucide-react"
import { useState } from "react"
import Image from 'next/image'
import { Card, CardContent } from "@/components/ui/card"
import PageTransition from '../../components/meta/page-transition'
import SlideInOverlay from "@/components/meta/slide-in-overlay-bottom"
import StudentProfileCard from "@/components/ui/student-profile-card"
import OpeningDatesCard from "@/components/ui/opening-dates-card"
import Modal, { ModalRef } from '@/components/meta/modal'
import HoldBanner from "@/components/ui/hold-banner"
import { AlertTriangle } from 'lucide-react'
import Link from "next/link"
import { TransitionLink } from "@/components/meta/transition-link"
import React from "react"
import ProfileIcon from "@/components/ui/profile-icon"
import { useUser } from "@/components/meta/context"
import { read } from '@/lib/neo4j'

const handleBannerClick = () => {}

const myClassesOnClick = () => {

}

const homeOnClick = () => {

}

// This is a mock array! It can/should be configured to lookup real data in the full app.
const classData = [
    {
        className: "Computer Programming I Lab",
        sectionNumber: "CSCI 220L-03",
        meetingTime: "MWF @ 10:00 - 10:50AM",
        meetingLocation: "HWEA 340",
        professor: "Dr. Roxanne Stalvey"
    },
    {
        className: "Calculus I",
        sectionNumber: "MATH 201-02",
        meetingTime: "TTh 2:00 PM - 3:45 PM",
        meetingLocation: "MYBK 112",
        professor: "Prof. John Doe"
    }
]

export default function Welcome() {
    const router = useRouter()
    const [isOverlayOpen, setIsOverlayOpen] = useState(false)
    const [isOverlayOpenRegistrationDates, setIsOverlayOpenRegistrationDates] = useState(false)
    const [hasRegistrationHold] = useState(true)

    const waitlistModalRef = React.useRef<ModalRef>(null)
    const holdModalRef = React.useRef<ModalRef>(null)

    const openWaitlistModal = () => {
        waitlistModalRef.current?.open()
    }
    const closeWaitlistModal = () => {
        waitlistModalRef.current?.close()
    }

    const openHoldModal = () => {
        holdModalRef.current?.open()
    }
    const closeHoldModal = () => {
        holdModalRef.current?.close()
    }

    return (
        <div className="max-h-screen overflow-auto overflow-hidden">
            {hasRegistrationHold && 
                <Modal
                    trigger={<a> <HoldBanner onClick={handleBannerClick} subheading="Academic Advising - Tap for more info"/> </a>}
                    title="REGISTRATION HOLD"
                    variant = "destructive"
                    ref={holdModalRef}>

                <div className = "pb-0 pl-3 pr-3 font-black" style={{textAlign: "center"}}> Academic Advising </div>
                <div className = "pb-5 pl-5 pr-5" style={{textAlign: "left"}}>
                    You have an advisory hold placed on your account. This hold must be lifted before you can register for classes. 
                    <p className="mt-3 font-bold"> To have your hold lifted, please contact your advisor or department. </p>
                </div>
                
                <div className=" pl-5 pr-5 pb-5 flex flex-row justify-between space-x-2">
                    <Button 
                        variant="outline"
                        onClick={closeHoldModal} 
                        className="font-bold flex-1 border-2 text-white border-primary hover:text-white hover:bg-red-700 focus:ring-2
                                   focus:ring-primary active:bg-red-800 focus:ring-offset-2 ml-20 mr-20 hover:ml-25 bg-red-600"> 
                        OK 
                    </Button>
                </div>
            </Modal>}

            <Modal title="Waitlist Seat Granted" variant = "waitlist" defaultOpen ref={waitlistModalRef}>
                <div className = "pb-0 pl-7 pr-7" style={{textAlign: "left"}}>
                    <p className="text-center font-black text-lg pb-4"> Good news! </p> Seats you waitlisted for in <br/>
                    <p className="font-black pt-2 ml-6 mr-20">the following sections(s) have been reserved for you:</p>
                </div>

                <hr className="mx-5" />
                <div className="space-y-4 mb-3 pl-3 pr-3">
                    {classData.map((classInfo, index) => (
                        <Card className="border-gray-400" key={index}>
                            <CardContent className="pt-4 pb-2">
                                <h3 className="font-semibold text-lg mb-2"> {classInfo.className} </h3> <hr className="mb-2"/>
                                <div className="flex justify-between mb-2">
                                    <p className="pl-5 mb-1 text-xs text-muted-foreground"> <b> {classInfo.sectionNumber} </b> </p>
                                    <p className="pl-5 text-xs text-muted-foreground"> <b> {classInfo.professor} </b> </p>
                                </div>
                                <div className="flex justify-between mb-2">
                                    <p className="pl-5 text-xs text-muted-foreground"> <b> {classInfo.meetingLocation} </b> </p>
                                    <p className="pl-5 text-xs text-muted-foreground"> <b> {classInfo.meetingTime} </b> </p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className=" pl-5 pr-5 pb-5 flex flex-row justify-between space-x-2">
                    <Button variant="outline" onClick={closeWaitlistModal} className="flex-1 border-2 border-primary hover:bg-primary/20 hover:text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2">
                        BACK TO HOME
                    </Button>
                    <TransitionLink  href="schedule" mode="top"><Button onClick={myClassesOnClick}>
                        MY SCHEDULE
                    </Button></TransitionLink>
                </div>
            </Modal>

            <div className="flex flex-col items-center justify-center min-h-screen bg-[#E2E4EB] p-4">
                <div className="w-full max-w-md space-y-6">
                    <h1 className="text-5xl text-center playwrite-font">Welcome</h1>
                    <div className="ml-6 mr-6"><button className="w-full mx-auto text-center mt-6 bg-gray-100 p-1 rounded-xl">
                        <div onClick={() => setIsOverlayOpenRegistrationDates(true)}>
                            <p className="text-gray-600 text-base">You can register for classes on</p>
                            <p className="text-black font-bold text-xl">OCTOBER 29</p>
                        </div>
                    </button></div>

                    <div className="space-y-4">
                        <TransitionLink href="find-classes" mode="left">
                            <Button variant="default" className="w-full pt-6 pb-6 text-lg flex items-center justify-center font-bold text-black bg-blue-300 hover:bg-blue-300 
                                                                border-blue-300 border-4 hover:border-4 hover:border-blue-500  active:bg-blue-500 active:text-white">
                                <Image src='/search-icon.svg' alt="Search" width={24} height={24} className="active:brightness-1 object-contain brightness-0 mr-2"/>
                                FIND CLASSES
                            </Button>
                        </TransitionLink>

                        <TransitionLink href="courses" mode="left">
                            <Button variant="default" className="w-full pt-6 pb-6 text-lg flex items-center justify-center font-bold text-black bg-blue-300 hover:bg-blue-300 
                                                                border-blue-300 border-4 hover:border-4 hover:border-blue-500  active:bg-blue-500 active:text-white mt-4">
                                <Image src='/my-courses-icon.svg' alt="My Courses" width={25} height={25} className="object-contain brightness-0 mr-2"/>
                                MY COURSES
                            </Button>
                        </TransitionLink>

                        <TransitionLink href="schedule" mode="top">
                            <Button variant="default" className="w-full pt-6 pb-6 text-lg flex items-center justify-center font-bold text-black bg-blue-300 hover:bg-blue-300
                                                                border-blue-300 border-4 hover:border-4 hover:border-blue-500  active:bg-blue-500 active:text-white mt-4">
                                <Image src='/calendar-icon.svg' alt="Schedule" width={25} height={25} className="object-contain brightness-0 mr-2"/>
                                SCHEDULE
                            </Button>
                        </TransitionLink>
                    </div>
                </div>

                <div className="w-15 h-15 absolute bottom-4 right-4">
                    {/*Find a way to put them together*/}
                    {/*The svg icon doesn't show when just inserting the Image tag in the button*/}
                    {/*<div className="absolute bottom-4 right-4">*/}
                    {/*    <Image src='/profile-icon.svg' alt="Profile" width={30} height={30} className="mr-2"/>*/}
                    {/*</div>*/}

                    <Button variant="ghost" className="w-15 h-15 text-gray-500" onClick={() => setIsOverlayOpen(true)}>
                        <UserCircle/>
                    </Button>
                </div>

                {/* Move slide in overlay into  */}
                <SlideInOverlay isOpen={isOverlayOpen} title="Student Profile" onClose={() => setIsOverlayOpen(false)}>
                    <StudentProfileCard name="Regilax" studentId="346143" classLevel="Junior" avatarUrl="/lilguy.svg"
                                        programOfStudy="Computer Science B.S."></StudentProfileCard>
                </SlideInOverlay>

                <SlideInOverlay isOpen={isOverlayOpenRegistrationDates} title="Registration Dates" onClose={() => setIsOverlayOpenRegistrationDates(false)}>
                    <OpeningDatesCard openTime={"7:30AM"} timezone={"EST"} registrationDates={[
                        {creditHours: "90+", date: "October 29", day: "Tuesday"},
                        {creditHours: "75-89", date: "October 31", day: "Friday"},
                        {creditHours: "60-74", date: "November 1", day: "Friday"},
                        {creditHours: "50-59", date: "November 7", day: "Thursday"},
                        {creditHours: "40-49", date: "November 8", day: "Friday"},
                        {creditHours: "30-39", date: "November 11", day: "Monday"},
                        {creditHours: "20-29", date: "November 12", day: "Tuesday"},
                        {creditHours: "1-19", date: "November 13", day: "Wednesday"},
                        {creditHours: "0", date: "November 14", day: "Thursday"},]}
                    />
                </SlideInOverlay>
            </div>
        </div>
    )
}