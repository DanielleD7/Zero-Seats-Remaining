'use client'

import React, { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import CourseCard from "@/components/ui/course-card"
import Header from '@/components/ui/header'
import { useUser } from "@/components/meta/context"
import { read } from '@/lib/neo4j'

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
  
  return (
    <div className="flex flex-col h-screen bg-gray-100">
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
              />
            </>))}
          </section>
          <section>
          {waitlist.length && <h2 className="text-lg font-semibold mb-2">Waitlisted Courses</h2>}
            {waitlist.map((section: any) => (<>
              <CourseCard 
                key={section.section.properties.id}
                section={section.section.properties} 
                status="Waitlisted" 
                onTouch={() => {}} 
                showHeader={true} 
                modal={() => {}} 
                modal2={() => {}}
              />
            </>))}
          </section>
        </main>
      </div>
    </div>
  )
}