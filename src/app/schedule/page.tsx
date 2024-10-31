'use client'

import { useState } from 'react'
import { ChevronLeft, ChevronDown } from 'lucide-react'
import Header from '@/components/ui/header'
import PageTransition from '@/components/meta/page-transition'

type Class = {
  name: string
  room: string
  day: string
  startTime: number
  endTime: number
  isWaitlisted: boolean
}

const semesters = ['2025 Spring', '2025 Fall', '2026 Spring', '2026 Fall']

// The class blocks do not work right. Try to change it to allow 5-minute intervals.
const classes: Class[] = [
  { name: 'CSCI 220', room: 'HWEA 302', day: 'T', startTime: 10, endTime: 11, isWaitlisted: false },
  { name: 'CSCI 220', room: 'HWEA 302', day: 'H', startTime: 10, endTime: 11, isWaitlisted: false },
  { name: 'CSIS 690', room: 'HWEA 300', day: 'T', startTime: 17, endTime: 20, isWaitlisted: false },
]
//   { name: 'MATH 101', room: 'MATH 201', day: 'M', startTime: 14, endTime: 15, isWaitlisted: true },

export default function Schedule() {
  const [selectedSemester, setSelectedSemester] = useState(semesters[0])
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const days = ['M', 'T', 'W', 'H', 'F']
  const hours = Array.from({ length: 16 }, (_, i) => i + 8) // 8am to 11pm

  const getClassForCell = (day: string, hour: number) => {
    return classes.find(c => c.day === day && hour >= c.startTime && hour < c.endTime)
  }

  return (
    <PageTransition>
    <div> <Header showShoppingCart={false} title="My Schedule" />

    <div className="max-w-4xl mx-auto p-4 bg-blue-100">
      
      <div className="relative mb-4">
        <button
          className="w-full bg-white p-2 rounded-md flex justify-between items-center"
          onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        >
          {selectedSemester}
          <ChevronDown className="w-4 h-4" />
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
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="border p-2"></th>
              {days.map(day => (
                <th key={day} className="border p-2">{day}</th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {hours.map(hour => (
              <tr key={hour}>
                <td className="border p-2 whitespace-nowrap">
                  {hour % 12 || 12}{hour < 12 ? 'am' : 'pm'}
                </td>
                {days.map(day => {
                  const classInfo = getClassForCell(day, hour)
                  return (
                    <td key={day} className="border p-2 relative h-16">
                      {classInfo && classInfo.startTime === hour && (
                        <div
                          className={`absolute inset-0 m-1 p-1 flex flex-col justify-center items-center text-xs
                            ${classInfo.isWaitlisted
                              ? 'bg-purple-100 border border-dashed border-purple-400'
                              : 'bg-purple-200 border border-purple-400'}
                          `}
                          style={{
                            height: `${(classInfo.endTime - classInfo.startTime) * 100}%`,
                          }}
                        >
                          <div>{classInfo.name}</div>
                          <div>{classInfo.room}</div>
                        </div>
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
    </PageTransition>

  )
}
