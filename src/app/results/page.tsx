'use client'

import { useState } from 'react'
import { ChevronLeft, ShoppingCart, ChevronDown, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Course, Section, Courses } from "@/data"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import CourseCard from "@/components/ui/course-card"

function CourseDropdown({ course }: { course: Course }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const AddCourse = () => {}

  return (
    <Card className="mb-4 bg-white">
      <CardHeader className="p-4 flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <CardTitle className="text-lg font-bold"> {course.id} </CardTitle>
          <div className="text-sm text-muted-foreground"> {course.name} </div>
        </div>
        
        <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
          <ChevronDown className={ `h-5 w-5 transition-transform ${isExpanded ? 'transform rotate-180' : ''}` }/>
        </Button>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        {isExpanded && (
          <div className="mt-4 space-y-4">
            {course.sections.map((section: Section) => {
              <CourseCard
                section={section.id}
                days={section.days}
                time={section.time}
                location={section.location}
                professor={section.professor}
                seatsOpen={section.seatsOpen}
                seats={section.seats}
                onAdd={AddCourse}>
              </CourseCard>
            })}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function CourseList() {
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
        {Courses.map((course : Course) => (<CourseDropdown course={course}/>)) }
      </main>
    </div>
  );
}