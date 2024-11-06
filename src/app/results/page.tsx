'use client'

import { useState } from 'react'
import { ChevronLeft, ShoppingCart, ChevronDown, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import CourseCard from "@/components/ui/course-card"

import { Course, Section, Courses } from "@/components/ui/data"
import searchParams from "@/components/ui/global"
import Header from "@/components/ui/header"
import PageTransition from '@/components/meta/page-transition'
import CourseInfoCard from '@/components/ui/course-info-card'
import SlideInOverlay from '@/components/meta/slide-in-overlay-bottom'
import StudentProfileCard from '@/components/ui/student-profile-card'
import { read } from '@/lib/neo4j'



function CourseDropdown({ course }: { course: Course }) {
  const [isExpanded, setIsExpanded] = useState(false);

  const AddCourse = () => {}
  
  var classNumber = "TEST 101"
  var className = "Test Class"
  var crn = "123405"
  var description = "This is a test and shouldn't appear under normal circumstances"
  var prerequisites = "None"
  var corequisites = "None"

  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const DisplayClassInfo = async () => {
    const query = "MATCH (c:Course {Course_Code: $CourseCode}) RETURN c.Course_Number as CourseCode, c.Course_Name as Name, c.Description as Desc, c.Prerequisites as Prereq, c.Prerequisites_And_Or_Corequisites as Precoreq, c.Corequisites as Coreq;"
    const params = {CourseCode: "CSCI 220"}
    const neo4jData = await read(query, params)
    classNumber = neo4jData[0]["CourseCode"]
    className = neo4jData[0]["Name"]
    description = neo4jData[0]["Desc"]
    prerequisites = neo4jData[0]["Prereq"]
    corequisites = neo4jData[0]["Coreq"]
    console.log(classNumber)
    setIsOverlayOpen(true)
  }

  return (
    <div>
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
                  onAdd={AddCourse}
                  openFunction={DisplayClassInfo}>
                </CourseCard>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
      {/* TODO Implement Chex's Generic Popup System */}
      <SlideInOverlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)}>
        <CourseInfoCard className={className} classNumber={classNumber} crn={crn} description={description} prerequisites={prerequisites} corequisites={corequisites}></CourseInfoCard>
      </SlideInOverlay>
    </div>
  )
}

export default function Results() {
  return (
    <PageTransition>
    <div className="max-w-md mx-auto bg-gray-100 min-h-screen">
      <Header showShoppingCart={true} title="Search Results"/>
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
        { Courses.filter(
          (course : Course) => ((course.subject == searchParams.subject || searchParams.subject == '') && (course.number == searchParams.number || searchParams.number == ''))
        ).map(
          (course : Course) => (<CourseDropdown course={course}/>)
        )}
      </main>
    </div>
    </PageTransition>
  );
}