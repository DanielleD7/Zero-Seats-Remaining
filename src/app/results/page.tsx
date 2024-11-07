'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChevronLeft, ShoppingCart, ChevronDown, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Course, Section, Courses } from "@/components/ui/data"
import { useUser } from "@/components/meta/context"

import Header from "@/components/ui/header"
import PageTransition from '@/components/meta/page-transition'
import CourseCard from "@/components/ui/course-card"
import CourseInfoCard from '@/components/ui/course-info-card'
import SlideInOverlay from '@/components/meta/slide-in-overlay-bottom'
import StudentProfileCard from '@/components/ui/student-profile-card'

function CourseDropdown({ course }: { course: Course }) {
  const { user } = useUser()
  const [isExpanded, setIsExpanded] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  const AddCourse = (course : Course, section : Section) => {
    user?.cart.push({course: course, section: section})
  }
  
  const DisplayClassInfo = () => {
    return (
      <SlideInOverlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)}>
        <CourseInfoCard></CourseInfoCard>
      </SlideInOverlay>
    );
  }

  return (
    <Card className="mb-4 bg-white">
      <CardHeader className="p-4 flex flex-row items-center justify-between">
        <div className="flex flex-col">
          <CardTitle className="text-lg font-bold"> {course.id} </CardTitle>
          <div className="text-sm text-muted-foreground"> {course.title} </div>
        </div>
        
        <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
          <ChevronDown className={ `h-5 w-5 transition-transform ${isExpanded ? 'transform rotate-180' : ''}` }/>
        </Button>
      </CardHeader>

      <CardContent className="px-4 pb-4">
        {isExpanded && (
          <div className="mt-4 space-y-4">
            {course.sections.map((section : Section) => (
              <CourseCard
                section={section.id}
                days={section.days}
                time={section.time}
                location={section.location}
                professor={section.professor}
                seatsOpen={section.seatsOpen}
                seats={section.seats}
                onAdd={() => AddCourse(course, section)}
                openFunction={DisplayClassInfo}>
              </CourseCard>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default function Results() {
  const searchParams = useSearchParams()
  const subject = searchParams.get('subject')
  const number = searchParams.get('number')

  return (
    <PageTransition>
      <div className="max-w-md mx-auto bg-gray-100 min-h-screen">
        <Header showShoppingCart={true} title="Search Results"/>
        
        <main className="p-4">
          {Courses.filter(
            (course : Course) => (['', course.subject].includes(subject!) && ['', course.number].includes(number!))
          ).map(
            (course : Course) => (<CourseDropdown course={course}/>)
          )}
        </main>
      </div>
    </PageTransition>
  );
}