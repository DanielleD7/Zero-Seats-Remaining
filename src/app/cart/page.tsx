'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { useUser } from "@/components/meta/context"
import CourseCard from "@/components/ui/course-card"
import Header from '@/components/ui/header'
import React, { useState } from "react";
import { TransitionLink } from "@/components/meta/transition-link"
import Modal, { ModalRef } from "@/components/meta/modal"
import { read, write } from '@/lib/neo4j'
import { Card, CardContent } from "@/components/ui/card"
import { ToastContainer } from "react-toastify"


export default function Cart() {
  const { user } = useUser()
  const router = useRouter()
  const [ cart, setCart ] = useState<any[]>([])
  const modalRef = React.useRef<ModalRef>(null)
  const successModalRef = React.useRef<ModalRef>(null)
  const [registeredClassData, setRegisteredClassData] = useState<{ className: any; sectionNumber: string; meetingTime: string; meetingLocation: string; professor: any }[]>([])
  const [waitlistedClassData, setWaitlistedClassData] = useState<{ className: any; sectionNumber: string; meetingTime: string; meetingLocation: string; professor: any }[]>([])

  React.useEffect(() => {
    queryData()
  }, [])

  const queryData = async () => {
    let getCart = `MATCH (:Profile {CWID: "${user}"}) -[:Cart]-> (s:Section) RETURN s`
    let response = await read(getCart)

    setCart(response)
    console.log(response)
  }


  const openModal = () => {
    modalRef.current?.open()
  }
  const closeModal = () => {
    modalRef.current?.close()
  }

  const openSuccessModal = () => {
    let registered: { className: any; sectionNumber: string; meetingTime: string; meetingLocation: string; professor: any }[] = []
    let waitlist: { className: any; sectionNumber: string; meetingTime: string; meetingLocation: string; professor: any }[] = []
    cart.forEach((section)=>{
      let properties = section.s.properties
      console.log(properties);
      if(properties.seatsAvailable.toInt() > 1) {
        registered.push({className : properties.courseTitle, sectionNumber: `${properties.subject} ${properties.courseNumber}`, meetingTime: properties.room ? getTime(properties.beginTime.low, properties.endTime.low) : "", meetingLocation: `${properties.building} ${properties.room}`, professor: properties.instructor ? properties.instructor : "Instructor Not Yet Assigned"})
      }
      else {
        waitlist.push({className : properties.courseTitle, sectionNumber: `${properties.subject} ${properties.courseNumber}`, meetingTime: properties.room ? getTime(properties.beginTime.low, properties.endTime.low) : "", meetingLocation: `${properties.building} ${properties.room}`, professor: properties.instructor ? properties.instructor : "Instructor Not Yet Assigned"})
      }
    })
    console.log(registered)
    console.log(waitlist)
    setRegisteredClassData(registered)
    setWaitlistedClassData(waitlist)
    successModalRef.current?.open()
  }
  const closeSuccessModal = () => {
    successModalRef.current?.close()
  }
  function getTime(beginTime: number, endTime: number) {
    let start = new Date(0, 0, 0, ~~(beginTime / 100), (beginTime % 100))
    let end = new Date(0, 0, 0, ~~(endTime / 100), (endTime % 100))
    return `${start.toLocaleTimeString([], {hour: 'numeric', minute: 'numeric'})} - ${end.toLocaleTimeString([], {hour: 'numeric', minute: 'numeric'})}`
  }
  const register = async () => {
    let enroll = `MATCH (p:Profile {CWID: "${user}"}) -[r:Cart]-> (s:Section) WHERE s.seatsAvailable > 0 DELETE r CREATE (p) -[:Registered]-> (s)`
    let waitlist = `MATCH (p:Profile {CWID: "${user}"}) -[r:Cart]-> (s:Section) WHERE s.seatsAvailable < 1 DELETE r CREATE (p) -[:Waitlisted]-> (s)`

    await write(enroll)
    await write(waitlist)

    closeModal()
    openSuccessModal()
  }
  
  return (
    <>
    <div className="max-h-[calc(100vh-70px)] overflow-scroll">

    <Modal ref={modalRef} variant="info" title="Are you sure?">
        <div className="p-4 pt-0">
          <p>Selecting "CONFIRM" will add these courses to your official student transcript. Are you sure you want to register for these classes?</p>
        </div>

        <div className=" pl-5 pr-5 pb-5 flex flex-row justify-between space-x-2">
          <Button variant="outline" onClick={closeModal} className="flex-1 border-2 border-primary hover:bg-primary/20 hover:text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <b>GO BACK</b>
          </Button>

          <Button onClick={register} className="bg-blue-500 flex-1 border-2 border-primary hover:bg-blue-800 focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <b>CONFIRM</b>
          </Button>
        </div>
      </Modal>
      
      <Modal title="Success!" variant = "info" ref={successModalRef}>


                <div className="overflow-scroll max-h-[25rem]">
                
                {registeredClassData.length > 0 && <><div className = "pb-0 pl-7 pr-7" style={{textAlign: "left"}}>
                    <p className="font-black pt-2 pb-4 ml-6 mr-20">Registered:</p>
                </div>
                <hr className="mx-5" />
                <div className="space-y-4 mb-3 pl-3 pr-3">
                    {registeredClassData.map((classInfo, index) => (
                        <Card className="bg-blue-100 border-blue-500 border-4" key={index}>
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
                </div></>}

                {waitlistedClassData.length > 0 && <><div className = "pb-0 pl-7 pr-7" style={{textAlign: "left"}}>
                    <p className="font-black pt-2 ml-6 mr-20 pb-4 pt-5">Waitlisted:</p>
                </div>
                <hr className="mx-5" />
                <div className="space-y-4 mb-3 pl-3 pr-3">
                    {waitlistedClassData.map((classInfo, index) => (
                        <Card className="bg-orange-100 border-orange-500 border-4" key={index}>
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
                </div></>}
                
                <div className="p-2"></div>
                </div>
                <div className="pt-5 pl-5 pr-5 pb-5 flex flex-row justify-between space-x-2">
                <TransitionLink  href="welcome" mode="right"><Button variant="outline" className="flex-1 border-2 border-primary hover:bg-primary/20 hover:text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2">
                        BACK TO HOME
                    </Button></TransitionLink>
                    <TransitionLink  href="schedule" mode="top"><Button>
                        MY SCHEDULE
                    </Button></TransitionLink>
                </div>
            </Modal>

      <div className="mx-auto bg-gray-100 min-h-screen">
        <Header showShoppingCart={false} title="Course Cart"/>

        <main className="p-4">
          {cart.map((section: any) => (
            <CourseCard section={section.s.properties} status={"Cart"} onTouch={() => {}} showHeader={true} modal={() => {throw new Error('Function not implemented.')}} modal2={() => {throw new Error('Function not implemented.')}} dropModal={()=>{return false}}/>
          ))}
          {!cart.length && 
            <div className = "justify-center items-center flex-col flex">
              <p className="mb-5">Your Course Cart is empty!</p>

              <div className=" pl-5 pr-5 pb-5 flex flex-row justify-between space-x-2">
                <TransitionLink  href="find-classes" mode="right">
                  <Button> FIND CLASSES </Button>
                </TransitionLink>
              </div>
            </div>
          }
    
       

        <ToastContainer/>
        </main>
      
      </div>

    </div>
    {cart.length && (
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex justify-between space-x-4">
                <TransitionLink mode="top" href={"schedule"}>
                <Button variant="outline" className="px-8">
                  Schedule
                </Button>
                </TransitionLink>
                <Button className="flex-1" onClick={openModal}>
                  Register
                </Button>
              </div>
            </div>
          )}   
    </>
  );
}