'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronDown } from 'lucide-react'
import Header from '@/components/ui/header'
import PageTransition from '@/components/meta/page-transition'
import * as React from "react";

interface ClassBlock {
  id: string
  name: string
  room: string
  startTime: string
  endTime: string
  days: number[]
  isWaitlisted?: boolean
}

// TODO Try to have the nav stay at the top
// TODO Pop up with more info on the class
export default function Component() {
  // TODO Possibly add more data to be shown in the class block and make it clickable for more details.
  const classes: ClassBlock[] = [
    {
      id: "1",
      name: "CSCI 220",
      room: "HWEA 302",
      startTime: "09:55",
      endTime: "11:10",
      days: [1, 3], // Tuesday and Thursday
      isWaitlisted: true
    },
    {
      id: "2",
      name: "CSIS 690",
      room: "HWEA 300",
      startTime: "17:30",
      endTime: "20:15",
      days: [1], // Tuesday only
      isWaitlisted: false
    },
  ]

  const semesters = ['2025 Spring', '2024 Fall', '2024 Spring', '2023 Fall']
  const days = ["M", "T", "W", "H", "F"]
  const hours = Array.from({ length: 16 }, (_, i) => i + 8) // 8am to 11pm

  const [selectedSemester, setSelectedSemester] = useState(semesters[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const getGridPosition = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number)
    return (hours - 8) * 12 + minutes / 5
  }

  const getBlockHeight = (startTime: string, endTime: string) => {
    const start = getGridPosition(startTime)
    const end = getGridPosition(endTime)
    return end - start
  }

  return (
      <PageTransition>
        {/*Little Nav Bar*/}
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

          <Header showShoppingCart={false} title="My Schedule"/>
          <div className="max-w-4xl mx-auto p-4 bg-[#E3E9FA]">

            {/*Drop Down*/}
            <div className="relative mb-4">
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

            {/************ SCHEDULE ************/}
            <div className="flex-1 overflow-hidden">
              <div className="grid grid-cols-[auto_repeat(5,1fr)] border-b bg-transparent text-sm">
                {/********** Days of the week header **********/}
                <div className="p-5"/>
                {/* That little rectangle in front of Monday block header,
                TODO Need to work on figuring out alignment, it's not quite perfect. Buuutt hiding the boarder makes it look good */}
                {days.map((day) => (
                    <div key={day} className="p-2 text-center font-bold bg-transparent">
                      {day}
                    </div>
                ))}
              </div>

              {/* Schedule Grid */}
              <div className="relative grid grid-cols-[auto_repeat(5,1fr)] overflow-auto bg-white">

                {/* Hours Column */}
                <div className="sticky left-0 bg-white">
                  {hours.map((hour) => (
                      // Changing the style and class names only effects the time column,
                      // does not affect the rest of the grid.
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

                {/* To change the class block to match the size of the grid, you gotta do some math
                and change sizes in multiple places in the grid.
                Such as the time grid, the whole grid for the blocks, and the class blocks*/}
                {/* TODO Figure that out later */}
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
                                    className="absolute left-0 right-0 border-2 border-purple-800 bg-purple-300 p-2 text-xs font-bold flex-col"
                                    style={{
                                      top: `${top}px`,
                                      height: `${height}px`,
                                      // paddingTop: `${height/4}px`, // causes problems when it gets smaller
                                      borderStyle: cls.isWaitlisted ? "dashed" : "solid",
                                      background: cls.isWaitlisted ? "rgba(243 232 255)" : "rgba(216 180 254)"
                                    }}
                                >
                                  {/*<div className="font-bold">*/}
                                  <div>{cls.name}</div>
                                  <div>{cls.room}</div>
                                  {/*<div>{cls.startTime}-{cls.endTime}</div>*/}
                                  {/*</div>*/}
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
      </PageTransition>
  )
}
