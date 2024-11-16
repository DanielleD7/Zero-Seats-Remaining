'use client'

import { useState } from 'react'
import {ChevronDown } from 'lucide-react'
import Header from '@/components/ui/header'
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
                  {hours.map((hour) => (
                      // Changing the style and classNames only effects the time column,
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
                                    className="absolute left-0 right-0 border-2 border-purple-800 bg-purple-300 p-2 text-xs font-bold flex-col"
                                    style={{
                                      top: `${top}px`,
                                      height: `${height}px`,
                                      // paddingTop: `${height/4}px`, // causes problems when it gets smaller
                                      borderStyle: cls.isWaitlisted ? "dashed" : "solid",
                                      background: cls.isWaitlisted ? "rgba(243 232 255)" : "rgba(216 180 254)"
                                    }}
                                >
                                  <div className="font-light">
                                    <div>{cls.name}</div>
                                    <div>{cls.room}</div>
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
      </div>
  )}