'use client'

import { useState } from 'react'
import { ChevronLeft, ShoppingCart, ChevronDown, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import CourseCard from "@/components/ui/course-card"
import { Class } from "@/components/ui/data"
import searchParams from "@/components/ui/global"
import PageTransition from '@/components/meta/page-transition'
import Header from '@/components/ui/header'
import { useUser } from "@/components/meta/context"

export default function CourseList() {
  const { user } = useUser()
  
  return (
    <PageTransition>
      <div className="max-w-md mx-auto bg-gray-100 min-h-screen">
      <Header showShoppingCart={true} title="My Courses"/>
      
      <main className="p-4">
        {user?.enrolled.map((e : Class) => (
          <CourseCard
            section={e.section.id}
            days={e.section.days}
            time={e.section.time}
            location={e.section.location}
            professor={e.section.professor}
            seatsOpen={e.section.seatsOpen}
            seats={e.section.seats}
            code={e.course.id}
            title={e.course.title}>
          </CourseCard>
        ))}
      </main>

      <main className="p-4">
        {user?.waitlist.map((e : Class) => (
          <CourseCard
            section={e.section.id}
            days={e.section.days}
            time={e.section.time}
            location={e.section.location}
            professor={e.section.professor}
            seatsOpen={e.section.seatsOpen}
            seats={e.section.seats}
            code={e.course.id}
            title={e.course.title}>
          </CourseCard>
        ))}
      </main>
    </div>
    </PageTransition>
  );
}