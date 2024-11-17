'use client'

import React, { useState } from 'react'
import { ChevronLeft, ShoppingCart, ChevronDown, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import CourseCard from "@/components/ui/course-card"
import { Class } from "@/components/ui/data"
import PageTransition from '@/components/meta/page-transition'
import Header from '@/components/ui/header'
import { useUser } from "@/components/meta/context"
import { read } from '@/lib/neo4j'

export default function CourseList() {
  const { user } = useUser()
  const [ enrolled, setEnrolled ] = useState<any[]>([])
  const [ waitlist, setWaitlist ] = useState<any[]>([])

  React.useEffect(() => {
    queryData()
  }, [])

  const queryData = async () => {
    let getEnrolled = `MATCH (:Profile {CWID: "${user}"}) -[:Enrolled]-> (section:Section) RETURN section`
    let getWaitlist = `MATCH (:Profile {CWID: "${user}"}) -[:Waitlist]-> (section:Section) RETURN section`

    setEnrolled(await read(getEnrolled))
    setWaitlist(await read(getWaitlist))
  }
  
  return (
    <PageTransition>
      <div className="max-w-md mx-auto bg-gray-100 min-h-screen">
        <Header showShoppingCart={false} title="My Courses"/>

        <main className="p-4">
          {enrolled.map((section: any) => (
            <CourseCard section={section.section.properties} onTouch={() => {}} showHeader={true} isAdded={true} modal={() => {throw new Error('Function not implemented.')}}/>
          ))}
        </main>

        <main className="p-4">
          {waitlist.map((section: any) => (
            <CourseCard section={section.section.properties} onTouch={() => {}} showHeader={true} isAdded={true} modal={() => {throw new Error('Function not implemented.')}}/>
          ))}
        </main>
      </div>
    </PageTransition>
  );
}