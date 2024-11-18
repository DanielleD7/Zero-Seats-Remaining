'use client'

import { useState } from 'react'
import {ChevronDown, X} from 'lucide-react'
import Header from '@/components/ui/header'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import * as React from "react";

interface ClassBlock {
  id: string
  name: string
  section: number
  room: string
  startTime: string
  endTime: string
  days: number[]
  isWaitlisted?: boolean
  instructor: string
  credits: number
  description: string
}

export default function Component() {
  const classes: ClassBlock[] = [
    {
      id: "1",
      name: "CSCI 220",
      section: 2,
      room: "HWEA 302",
      startTime: "08:30",
      endTime: "09:45",
      days: [1, 3], // Tuesday and Thursday
      isWaitlisted: true,
      instructor: "RoxAnn Stalvey",
      credits: 3,
      description: "An introduction to programming and problem solving. Topics include data types, variables, assignment, control structures (selection and iteration), lists, functions, classes, and an introduction to object-oriented programming. Lectures three hours per week."
    },
    {
      id: "2",
      name: "CSIS 690",
      section: 1,
      room: "HWEA 300",
      startTime: "17:30",
      endTime: "20:15",
      days: [1], // Tuesday only
      isWaitlisted: false,
      instructor: "Kris Ghosh",
      credits: 3,
      description: "A course that covers algorithms, focusing on foundations of algorithms, and applications to areas such as data science, cybersecurity, and software engineering."
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

  return (
      <div className="max-h-screen overflow-auto">
        {/* Nav bar with dropdown and the days of the week header */}
        <div className="max-w-4xl mx-auto">
          <div className="sticky top-0 z-50 bg-[#E3E9FA]">
            <Header showShoppingCart={false} title="My Schedule"/>

            {/*Drop Down*/}
            <div className="relative px-4 py-2">
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
          <div className="max-w-4xl mx-auto p-4 bg-[#E3E9FA]">

            {/************ SCHEDULE ************/}
            <div className="flex-1 overflow-hidden">

              {/* Schedule Grid */}
              <div className="relative grid grid-cols-[auto_repeat(5,1fr)] overflow-auto bg-white">

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
                                    className="absolute left-0 right-0 border-2 border-purple-800 bg-purple-300 p-1 text-[10px] font-bold flex flex-col justify-center items-center cursor-pointer overflow-hidden"
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
                                    <div>{cls.name}</div>
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
            <DialogHeader>
              <DialogTitle>{selectedClass?.name}</DialogTitle>
              <div className="h-px bg-gray-400 my-2" />
              <DialogDescription className="text-black">
                <div className="mt-2 space-y-2">
                  <p><strong>Instructor:</strong> {selectedClass?.instructor}</p>
                  <p><strong>Room:</strong> {selectedClass?.room}</p>
                  <p><strong>Time:</strong> {selectedClass && `${formatTime(selectedClass.startTime)} - ${formatTime(selectedClass.endTime)}`}</p>
                  <p><strong>Days:</strong> {selectedClass?.days.map(day => days[day]).join(', ')}</p>
                  <p><strong>Credits:</strong> {selectedClass?.credits}</p>
                  <p><strong>Status:</strong> {selectedClass?.isWaitlisted ? 'Waitlisted' : 'Enrolled'}</p>
                  <p><strong>Description:</strong> {selectedClass?.description}</p>
                </div>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
  )
}