'use client'

import { useState } from 'react'
import {ChevronDown, X} from 'lucide-react'
import Header from '@/components/ui/header'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import * as React from "react";
import {read} from "@/lib/neo4j";
import {useUser} from "@/components/meta/context";

// For the hard coded classes
// interface ClassBlock {
//   id: string
//   courseCode: string
//   courseName: string
//   subject: string
//   courseNumber: number
//   section: number
//   instructor: string
//   room: string
//   days: number[]
//   startTime: string
//   endTime: string
//   classType: string
//   credits: number
//   description: string
//   isWaitlisted?: boolean
// }

export default function Component() {

  // Hard Coded Classes
  // const classes: ClassBlock[] = [
  //   {
  //     id: "1",
  //     courseCode: "CSCI 220",
  //     courseName: "Computer Programming I",
  //     subject: "CSCI",
  //     courseNumber: 220,
  //     section: 2,
  //     instructor: "RoxAnn Stalvey",
  //     room: "HWEA 302",
  //     days: [1, 3], // Tuesday and Thursday
  //     startTime: "08:30",
  //     endTime: "09:45",
  //     classType: "Lecture",
  //     credits: 3,
  //     description: "An introduction to programming and problem solving. Topics include data types, variables, assignment, control structures (selection and iteration), lists, functions, classes, and an introduction to object-oriented programming. Lectures three hours per week.",
  //     isWaitlisted: true
  //   },
  //   {
  //     id: "2",
  //     courseCode: "CSIS 690",
  //     courseName: "ST: Data Dependent Digital Forensics",
  //     subject: "CSIS",
  //     courseNumber: 690,
  //     section: 1,
  //     instructor: "Kris Ghosh",
  //     room: "HWEA 300",
  //     days: [1], // Tuesday only
  //     startTime: "17:30",
  //     endTime: "20:15",
  //     classType: "Lecture",
  //     credits: 3,
  //     description: "A course in the special study of an advanced or new topic in computer science, information science or software engineering.",
  //     isWaitlisted: false
  //   },
  // ]

  const semesters = ['2025 Spring', '2024 Fall', '2024 Spring', '2023 Fall']
  const daysOfWeek = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday']
  const daysLetters = ["M", "T", "W", "H", "F"]
  const hours = Array.from({ length: 16 }, (_, i) => i + 8) // 8am to 11pm

  const getDaysString = (classDays: { [x: string]: unknown }) => {
    return daysOfWeek
        .filter(day => classDays[day])
        .map(day => day.charAt(0).toUpperCase())
        .join(', ')
  }

  const [selectedSemester, setSelectedSemester] = useState(semesters[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState<any>(null)

  // Database Use Set Up
  const { user } = useUser()
  const [ courses, setClasses ] = useState<any[]>([])

  React.useEffect(() => {
    queryData()
  }, [])

  const queryData = async () => {
    let courses = `MATCH (:Profile {CWID: "${user}"}) -[r]-> (section:Section) RETURN TYPE(r) AS status, section`
    // let response = await read(courses)
    // console.log(JSON.stringify(response, null, 2))
    setClasses(await read(courses))
  }

  const getGridPosition = (time: number) => {
    let hours = ~~(time / 100)
    let minutes = (time % 100)

    return (hours - 8) * 12 + minutes / 5
  }

  const getBlockHeight = (startTime: number, endTime: number) => {
    const start = getGridPosition(startTime)
    const end = getGridPosition(endTime)

    return end - start
  }

  const formatTime = (time: number) => {
    let hours = ~~(time / 100)
    let minutes = (time % 100)
    let newTime = new Date(0, 0, 0, hours, minutes)

    return `${newTime.toLocaleTimeString([], {hour: 'numeric', minute: 'numeric'})}`
  }

  // Might use for the class block on the schedule grid due to text cut off on smaller screens
  const formatTimeNoAM_PM = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number)
    const formattedHours = hours % 12 || 12

    return `${formattedHours}:${minutes.toString().padStart(2, '0')}`
  }

  return (
      <div className="max-h-screen overflow-auto">
        {/* Nav bar with dropdown and the days of the week header */}
        <div className="max-w-4xl mx-auto">
          <div className="sticky top-0 z-50 bg-[#E3E9FA]">
            <Header showShoppingCart={false} title="My Schedule"/>

            {/*Drop Down*/}
            <div className="relative px-2 py-2">
              <button
                  className="w-full bg-white p-2 rounded-md flex justify-between items-center"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {selectedSemester}
                <ChevronDown className="w-4 h-4"/>
              </button>

              {isDropdownOpen && (
                  <ul className="absolute w-full bg-white mt-1 rounded-md shadow-lg z-10">
                    {semesters.map((semester) => (
                        <li
                            key={semester}
                            className="p-2 hover:bg-blue-100 cursor-pointer"
                            onClick={() => {
                              setSelectedSemester(semester)
                              setIsDropdownOpen(false)
                            }}
                        >
                          {semester}
                        </li>
                    ))}
                  </ul>
              )}
            </div>
            {/*Drop Down END*/}

            {/********** Days of the week header **********/}
            <div className="pt-1 grid grid-cols-[auto_repeat(5,1fr)] border-none bg-transparent text-sm">
              <div className="px-6 bg-[#E3E9FA]"/>
              {/* That little rectangle in front of Monday block header,
                TODO Need to work on figuring out alignment, it's not quite perfect. Buuutt hiding the boarder makes it look good */}
              {daysLetters.map((day) => (
                  <div key={day} className="p-2 text-center font-bold bg-[#E3E9FA]">
                    {day}
                  </div>
              ))}
            </div>
            {/* Days of the week header END */}
          </div>
          {/* Nav bar with dropdown and the days of the week header END */}

          {/*The colored area underneath the grid and dropdown*/}
          <div className="max-w-4xl mx-auto p-2 bg-[#E3E9FA] rounded-b">

            {/************ SCHEDULE ************/}
            <div className="flex-1 overflow-hidden">

              {/* Schedule Grid */}
              <div className="relative grid grid-cols-[auto_repeat(5,1fr)] overflow-auto bg-white rounded">

                {/* Hours Column */}
                <div className="sticky left-0">
                  {/*Changing the style and classNames only effects the time column,*/}
                  {/*does not affect the rest of the grid.*/}
                  {hours.map((hour) => (
                      <div
                          key={hour}
                          className="border-b text-[12px] px-0.5 py-5 text-center"
                          style={{height: "60px"}}
                      >
                        {hour % 12 || 12}
                        {hour < 12 ? "am" : "pm"}
                      </div>
                  ))}
                </div>

                {/* To change the class block to match the size of the grid, you have to
                change sizes in multiple areas in the schedule grid.
                Such as the time grid, the whole grid for the blocks, and the class blocks*/}
                {daysOfWeek.map ( (day) => (
                    <div key={day} className="relative border-l">
                      {courses
                          .filter((cls) => cls.section.properties[day])

                          .map((cls) => {
                            const top = getGridPosition(cls.section.properties.beginTime.low) * 5
                            const height = getBlockHeight(cls.section.properties.beginTime.low, cls.section.properties.endTime.low) * 5
                            return (
                                <div
                                    key={cls.section.properties.id}
                                    className="absolute left-0 right-0 border-2 rounded p-1 text-[9px] font-bold flex flex-col justify-center items-center cursor-pointer overflow-hidden"
                                    style={{
                                      top: `${top}px`,
                                      height: `${height}px`,
                                      // paddingTop: `${height/4}px`, // causes problems when it gets smaller
                                      borderStyle: cls.status == "Waitlisted" ? "dashed" : "solid",
                                      borderColor: cls.status == "Waitlisted" ? "rgba(249 115 22)" : "rgba(59 130 246)",
                                      background: cls.status == "Waitlisted" ? "rgba(255 247 237)" : "rgba(239 246 255)",
                                      // background: cls.isWaitlisted ? "rgba(243 232 255)" : "rgba(216 180 254)"
                                    }}
                                    onClick={() => setSelectedClass(cls)}
                                    // onClick={() => (console.log(JSON.stringify(cls, null, 2)))}
                                >
                                  <div className="font-light text-center">
                                    <div>
                                      <span className="text-[7px] mr-0.5">{cls.section.properties.subject}</span>
                                      <span>{cls.section.properties.courseNumber}</span>
                                    </div>

                                    <div>
                                      <span className="text-[7px] mr-0.5">{cls.section.properties.building}</span>
                                      <span>{cls.section.properties.room}</span>
                                    </div>

                                    <div>{formatTime(cls.section.properties.beginTime.low)} - {formatTime(cls.section.properties.endTime.low)}</div>
                                  </div>
                                </div>
                            )
                          })}
                      {Array.from({length: hours.length}, (_, i) => (
                          <div
                              key={i}
                              className="border-b"
                              style={{height: "60px"}} // This is for the MAIN grid, does NOT affect the class block
                          />
                      ))}
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/*/!* Class Information Popup *!/*/}
        <Dialog open={!!selectedClass} onOpenChange={() => setSelectedClass(null)}>
          <DialogContent className="text-black">
            <button
                onClick={() => setSelectedClass(null)}
                className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </button>

            <DialogHeader className="text-left">
              <DialogTitle>{selectedClass?.section?.properties?.subject || 'N/A'} {selectedClass?.section?.properties?.courseNumber || 'N/A'}</DialogTitle>
            </DialogHeader>
            <div className="h-px bg-gray-400 my-2" />
            <div className="mt-2 space-y-2">
              <div><strong>Course Name:</strong> {selectedClass?.section?.properties?.courseTitle || 'N/A'}</div>
              <div><strong>Section:</strong> {selectedClass?.section?.properties?.sequenceNumber?.low || 'N/A'}</div>
              <div><strong>Instructor:</strong> {selectedClass?.section?.properties?.instructor || 'N/A'}</div>
              <div><strong>Room:</strong> {selectedClass?.section?.properties?.building || 'N/A'} {selectedClass?.section?.properties?.room || 'N/A'}</div>
              <div><strong>Days:</strong> {selectedClass ? getDaysString(selectedClass.section.properties) : 'N/A'}</div>
              <div><strong>Time:</strong> {selectedClass && `${formatTime(selectedClass?.section?.properties?.beginTime?.low)} - ${formatTime(selectedClass?.section?.properties?.endTime?.low)}` || 'N/A'}</div>
              <div><strong>Class Type:</strong> {selectedClass?.section?.properties?.scheduleTypeDescription || 'N/A'}</div>
              <div><strong>Credits:</strong> {selectedClass?.section?.properties?.creditHourLow?.low || 'N/A'}</div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
  )
}