'use client'

import { useState } from 'react'
import {ChevronDown, X} from 'lucide-react'
import Header from '@/components/ui/header'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import * as React from "react";

interface ClassBlock {
  id: string
  courseCode: string
  courseName: string
  section: number
  instructor: string
  room: string
  days: number[]
  startTime: string
  endTime: string
  classType: string
  credits: number
  description: string
  isWaitlisted?: boolean
}

export default function Component() {
  const classes: ClassBlock[] = [
    {
      id: "1",
      courseCode: "CSCI 220",
      courseName: "Computer Programming I",
      section: 2,
      instructor: "RoxAnn Stalvey",
      room: "HWEA 302",
      days: [1, 3], // Tuesday and Thursday
      startTime: "08:30",
      endTime: "09:45",
      classType: "Lecture",
      credits: 3,
      description: "An introduction to programming and problem solving. Topics include data types, variables, assignment, control structures (selection and iteration), lists, functions, classes, and an introduction to object-oriented programming. Lectures three hours per week.",
      isWaitlisted: true
    },
    {
      id: "2",
      courseCode: "CSIS 690",
      courseName: "ST: Data Dependent Digital Forensics",
      section: 1,
      instructor: "Kris Ghosh",
      room: "HWEA 300",
      days: [1], // Tuesday only
      startTime: "17:30",
      endTime: "20:15",
      classType: "Lecture",
      credits: 3,
      description: "A course in the special study of an advanced or new topic in computer science, information science or software engineering.",
      isWaitlisted: false
    },
  ]

  const semesters = ['2025 Spring', '2024 Fall', '2024 Spring', '2023 Fall']
  const days = ["M", "T", "W", "H", "F"]
  const hours = Array.from({ length: 16 }, (_, i) => i + 8) // 8am to 11pm

  const [selectedSemester, setSelectedSemester] = useState(semesters[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [selectedClass, setSelectedClass] = useState<ClassBlock | null>(null)

  const getGridPosition = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number)
    return (hours - 8) * 12 + minutes / 5
  }

  const getBlockHeight = (startTime: string, endTime: string) => {
    const start = getGridPosition(startTime)
    const end = getGridPosition(endTime)
    return end - start
  }

  const formatTime = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number)
    const period = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 || 12
    return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${period}`
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
              <div className="px-8 bg-[#E3E9FA]"/>
              {/* That little rectangle in front of Monday block header,
                TODO Need to work on figuring out alignment, it's not quite perfect. Buuutt hiding the boarder makes it look good */}
              {days.map((day) => (
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
                <div className="sticky left-0 bg-white">
                  {/*Changing the style and classNames only effects the time column,*/}
                  {/*does not affect the rest of the grid.*/}
                  {hours.map((hour) => (
                      <div
                          key={hour}
                          className="border-b px-1.5 py-5 text-sm"
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
                {Array.from({length: 5}, (_, dayIndex) => (
                    <div key={dayIndex} className="relative border-l">
                      {classes
                          .filter((cls) => cls.days.includes(dayIndex))
                          .map((cls) => {
                            const top = getGridPosition(cls.startTime) * 5
                            const height = getBlockHeight(cls.startTime, cls.endTime) * 5
                            return (
                                <div
                                    key={cls.id}
                                    className="absolute left-0 right-0 border-2 rounded border-purple-800 bg-purple-300 p-1 text-[9px] font-bold flex flex-col justify-center items-center cursor-pointer overflow-hidden"
                                    style={{
                                      top: `${top}px`,
                                      height: `${height}px`,
                                      // paddingTop: `${height/4}px`, // causes problems when it gets smaller
                                      borderStyle: cls.isWaitlisted ? "dashed" : "solid",
                                      background: cls.isWaitlisted ? "rgba(243 232 255)" : "rgba(216 180 254)"
                                    }}
                                    onClick={() => setSelectedClass(cls)}
                                >
                                  <div className="font-light text-center">
                                    <div>{cls.courseCode}</div>
                                    <div>{cls.room}</div>
                                    <div>{formatTime(cls.startTime)} - {formatTime(cls.endTime)}</div>
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

        {/* Class Information Popup */}
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
              <DialogTitle>{selectedClass?.courseCode || 'Class Details'}</DialogTitle>
            </DialogHeader>
            <div className="h-px bg-gray-400 my-2" />
            <div className="mt-2 space-y-2">
              <div><strong>Course Name:</strong> {selectedClass?.courseName || 'N/A'}</div>
              <div><strong>Section:</strong> {selectedClass?.section || 'N/A'}</div>
              <div><strong>Instructor:</strong> {selectedClass?.instructor || 'N/A'}</div>
              <div><strong>Room:</strong> {selectedClass?.room || 'N/A'}</div>
              <div><strong>Days:</strong> {selectedClass?.days.map(day => days[day]).join(', ') || 'N/A'}</div>
              <div><strong>Time:</strong> {selectedClass && `${formatTime(selectedClass.startTime)} - ${formatTime(selectedClass.endTime)}` || 'N/A'}</div>
              <div><strong>Class Type:</strong> {selectedClass?.classType || 'N/A'}</div>
              <div><strong>Credits:</strong> {selectedClass?.credits || 'N/A'}</div>
              <div><strong>Description:</strong> {selectedClass?.description || 'No description available.'}</div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
  )
}