'use client'

import { useState } from 'react'
import { ChevronLeft, ShoppingCart, ChevronDown, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import CourseCard from "@/components/ui/course-card"
import { Course, Section, Courses } from "@/components/ui/data"
import searchParams from "@/components/ui/global"

export default function Cart() {

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen">
      <main className="p-4">
        {Courses.map((course) => (course.sections.map((section) => {
          if (section.inCart) {
            return <CourseCard
              section={section.id}
              days={section.days}
              time={section.time}
              location={section.location}
              professor={section.professor}
              seatsOpen={section.seatsOpen}
              seats={section.seats}
              code={course.id}
              title={course.title}>
            </CourseCard>
          }
        })))}
      </main>
    </div>
  );
}