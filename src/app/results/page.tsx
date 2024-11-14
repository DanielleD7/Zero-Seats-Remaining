'use client'

import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChevronLeft, ShoppingCart, ChevronDown, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import CourseCard from "@/components/ui/course-card"

import { Course, Section, Courses, Class, Account, Accounts } from "@/components/ui/data"
import Header from "@/components/ui/header"
import PageTransition from '@/components/meta/page-transition'
import CourseInfoCard from '@/components/ui/course-info-card'
import SlideInOverlay from '@/components/meta/slide-in-overlay-bottom'
import { read } from '@/lib/neo4j'
import * as React from "react";

// const [infoCourse, setInfoCourse] = useState({})

function CourseDropdown({ course }: { course: Course }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  const [infoCourse, setInfoCourse] = useState({})
  
  const DisplayClassInfo = async (courseCode : String) => {
    //const query = "MATCH (c:Course {Course_Code: $CourseCode}) RETURN c.Course_Code as CourseCode, c.Course_Name as Name, c.Description as Desc, c.Prerequisites as Prereq, c.Prerequisites_And_Or_Corequisites as Precoreq, c.Corequisites as Coreq;"
    
    let query = `MATCH (c:Course {Course_Code: "${courseCode}"}) RETURN c;`
    let results = await read(query)

    // setInfoCourse(neo4jData[0].properties)
    // let text = JSON.stringify(results[0], null, 4);
    // console.log(text)

    setInfoCourse(results[0].c.properties)

    // classNumber = neo4jData[0]["CourseCode"]
    // className = neo4jData[0]["Name"]
    // description = neo4jData[0]["Desc"]
    // prerequisites = neo4jData[0]["Prereq"]
    // corequisites = neo4jData[0]["Coreq"]
    // console.log(classNumber)
    setIsOverlayOpen(true)
  }

  return (
      <div className="dyslexia-font">
        <style jsx global>{` @font-face {
          font-family: 'Dyslexia Font';
          src: url('/Dyslexia_Font.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }

        .dyslexia-font {
          font-family: 'Dyslexia Font', sans-serif;
        } `}</style>

        <Card className="mb-4 bg-white">
          <CardHeader className="p-4 flex flex-row items-center justify-between">
            <div className="flex flex-col">
              <CardTitle className="text-lg font-bold"> {course.id} </CardTitle>
              <div className="text-sm text-muted-foreground"> {course.title} </div>
            </div>

            <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
              <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}/>
            </Button>
          </CardHeader>

          <CardContent className="px-4 pb-4">
            {isExpanded && (
                <div className="mt-4 space-y-4">
                  {course.sections.map((section: Section) => (
                      <CourseCard
                          course={course}
                          section={section}
                          onTouch={DisplayClassInfo}
                          showHeader={false}
                          isAdded={false}>
                      </CourseCard>
                  ))}
                </div>
            )}
          </CardContent>
        </Card>
        {/* TODO Implement Chex's Generic Popup System */}
        <SlideInOverlay isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)}>
          <CourseInfoCard className={"Test"} classNumber={"Test"} crn={"Test"} description={"Test"}
                          prerequisites={"Test"} corequisites={"Test"}></CourseInfoCard>
        </SlideInOverlay>
      </div>
  )
}

export default function Results() {
  const searchParams = useSearchParams()
  const subject = searchParams.get('subject')
  const number = searchParams.get('number')


  let query = `MATCH (course:Course {Subject: "CSIS"}) RETURN course`

  return (
      <PageTransition>
        <div className="max-w-md mx-auto bg-gray-100 min-h-screen dyslexia-font">
          <style jsx global>{` @font-face {
          font-family: 'Dyslexia Font';
          src: url('/Dyslexia_Font.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }

        .dyslexia-font {
          font-family: 'Dyslexia Font', sans-serif;
        } `}</style>

          <Header showShoppingCart={true} title="Search Results"/>
          <main className="p-4">
            {Courses.filter(
                (course: Course) => (['', course.subject].includes(subject!) && ['', course.number].includes(number!))
            ).map(
                (course: Course) => (<CourseDropdown course={course}/>)
            )}
          </main>
        </div>
      </PageTransition>
  );
}