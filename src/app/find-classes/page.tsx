'use client';

import { useState } from 'react'
import { ChevronLeft, ShoppingCart, Search, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function FindClasses() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [subject, setSubject] = useState('')
  const [courseNumber, setCourseNumber] = useState('')
  const [crn, setCrn] = useState('')
  const [selectedSemester, setSelectedSemester] = useState('Spring 2025')

  const semesters = [
    "Spring 2025", "Fall 2024", "Spring 2024", "Fall 2023", "Spring 2023", "Fall 2022"
  ]

  const handleBackClick = () => {
    router.push('/welcome')
  }

  return (
    <div className="min-h-screen bg-blue-100 flex flex-col">


      <main className="flex-grow flex flex-col">
        <div className="bg-white p-6 shadow-md">
          <h1 className="text-2xl font-bold text-center mb-6">Find Classes</h1>

          <div className="relative mb-4">
            <select
              value={selectedSemester}
              onChange={(e) => setSelectedSemester(e.target.value)}
              className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 appearance-none"
            >
              {semesters.map((semester) => (
                <option key={semester} value={semester}>{semester}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
          </div>

          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Type class name or CRN..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-full bg-gray-100 border border-gray-300"
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="moreOptions"
              checked={showMoreOptions}
              onChange={(e) => setShowMoreOptions(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label
              htmlFor="moreOptions"
              className="text-sm font-medium text-gray-700"
            >
              More Options
            </label>
          </div>
        </div>

        <div className="flex-grow p-6 flex flex-col">
          <div className={`space-y-4 overflow-hidden transition-all duration-300 ease-in-out ${showMoreOptions ? 'max-h-80 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md py-2 px-4"
            />
            <input
              type="text"
              placeholder="Course #"
              value={courseNumber}
              onChange={(e) => setCourseNumber(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md py-2 px-4"
            />
            <input
              type="text"
              placeholder="CRN"
              value={crn}
              onChange={(e) => setCrn(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-md py-2 px-4"
            />
          </div>

          <div className="mt-auto">
            <button className="w-full bg-blue-200 text-blue-800 hover:bg-blue-300 text-lg py-6 rounded-full font-semibold transition-colors duration-200">
              GO!
            </button>
          </div>
        </div>
      </main>
    </div>
  )
}