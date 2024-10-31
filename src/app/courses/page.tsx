'use client'

import { useState } from 'react'
import { ChevronLeft, ShoppingCart, ChevronDown, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import CourseCard from "@/components/ui/course-card"
import { Course, Section, Courses } from "@/components/ui/data"
import searchParams from "@/components/ui/global"

export default function CourseList() {
  const [myCourses, setMyCourses] = useState([]);

  return (
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen">
      {/* <header className="flex justify-between items-center p-4 bg-white">
        <Button variant="ghost" size="icon">
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <h1 className="text-xl font-semibold">Search Results</h1>
        <Button variant="ghost" size="icon">
          <ShoppingCart className="h-6 w-6" />
        </Button>
      </header> */}
      <main className="p-4">
        {Courses.map((course) => (course.sections.map((section) => {
          if (section.enrolled) {
            return <CourseCard
              section={section.id}
              days={section.days}
              time={section.time}
              location={section.location}
              professor={section.professor}
              seatsOpen={section.seatsOpen}
              seats={section.seats}
              code={course.id}>
              title={course.title}
            </CourseCard>
          }
        })))}
      </main>
    </div>
  );
}