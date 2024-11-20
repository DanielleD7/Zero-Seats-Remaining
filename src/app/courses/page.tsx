'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import CourseCard from "@/components/ui/course-card"
import Header from '@/components/ui/header'
import { useUser } from "@/components/meta/context"
import { read } from '@/lib/neo4j'
import Modal, { ModalRef } from '@/components/meta/modal'
import { ToastContainer } from 'react-toastify'

export default function CourseList() {
  const { user } = useUser()
  const [enrolled, setEnrolled] = useState<any[]>([])
  const [waitlist, setWaitlist] = useState<any[]>([])

  useEffect(() => {
    queryData()
  }, [user])

  const queryData = async () => {
    if (!user) return
    let enrollment = `MATCH (:Profile {CWID: "${user}"}) -[:Registered]-> (section:Section) RETURN section`
    let waitlistment = `MATCH (:Profile {CWID: "${user}"}) -[:Waitlisted]-> (section:Section) RETURN section`
    
    setEnrolled(await read(enrollment))
    setWaitlist(await read(waitlistment))
  }
  const modalRef = React.useRef<ModalRef>(null)
  var callback = () => {}
  const openModal = (cb: () => void) => {
    callback = cb
    modalRef.current?.open()
    return true;
  }
  const closeModal = () => {
    modalRef.current?.close()
  }
  const dropClass = () => {
    callback()
    // addToWaitlistNotif()
    closeModal()
  }
  return (
    <div className="flex flex-col h-screen bg-gray-100">
      <Modal ref={modalRef} variant="destructive" title="Drop Class">
        <div className="p-4 pt-0">
          <p>Do you wish to drop this class?</p>
        </div>

        <div className=" pl-5 pr-5 pb-5 flex flex-row justify-between space-x-2">
          <Button variant="outline" onClick={closeModal} className="flex-1 border-2 border-primary hover:bg-primary/20 hover:text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <b>CANCEL</b>
          </Button>

          <Button variant="destructive" onClick={dropClass}  className="flex-1 border-2 border-primary hover:bg-primary/20 hover:text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <b>DROP CLASS</b>
          </Button>
        </div>
      </Modal>
      <Header showShoppingCart={false} title="My Courses"/>
      <div className="flex-1 overflow-auto">
        <main className="p-4 space-y-4">
          <section>
            {enrolled.length && <h2 className="text-lg font-semibold mb-2">Enrolled Courses</h2>}
            {enrolled.map((section: any) => (<>
              
              <CourseCard 
                key={section.section.properties.id}
                section={section.section.properties} 
                status="Registered" 
                onTouch={() => {}} 
                showHeader={true} 
                modal={() => {}} 
                modal2={() => {}}
                dropModal={openModal}
              />
            </>))}
          </section>
          <section>
          {waitlist.length > 0 && <h2 className="text-lg font-semibold mb-2">Waitlisted Courses</h2>}
            {waitlist.map((section: any) => (<>
              <CourseCard 
                key={section.section.properties.id}
                section={section.section.properties} 
                status="Waitlisted" 
                onTouch={() => {}} 
                showHeader={true} 
                modal={() => {}} 
                modal2={() => {}}
                dropModal={openModal}
              />
            </>))}
          </section>
          <ToastContainer/>
        </main>
      </div>
    </div>
  )
}