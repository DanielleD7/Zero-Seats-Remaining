'use client';

import { useState } from 'react'
import { ChevronLeft, ShoppingCart, Search, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react';
import AwesomeAlert from 'react-native-awesome-alerts';
import PageTransition from '../../components/meta/page-transition'
import { usePageTransition } from '@/components/meta/transition-link';
import SlideInOverlay from '@/components/meta/slide-in-overlay-bottom';
import Header from '@/components/ui/header'

export default function FindClasses() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [showMoreOptions, setShowMoreOptions] = useState(false)
  const [courseSubject, setCourseSubject] = useState('')
  const [courseNumber, setCourseNumber] = useState('')
  const [crn, setCrn] = useState('')
  const [selectedSemester, setSelectedSemester] = useState('Spring 2025')
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)

  const semesters = [
    "Spring 2025", "Fall 2024", "Spring 2024", "Fall 2023", "Spring 2023", "Fall 2022"
  ]

  const toResults = () => {
    const transition = usePageTransition()
    transition(router, `/results?subject=${courseSubject.toUpperCase()}&number=${courseNumber.toUpperCase()}`, "left");
    // router.push(`/results?subject=${courseSubject.toUpperCase()}&number=${courseNumber.toUpperCase()}`)
  }

  return (
    // <PageTransition>
      <div className="min-h-screen bg-blue-100 flex flex-col">
        <Header showShoppingCart={true} title="Find Classes"/>
        <main className="flex-grow flex flex-col">
          <div className="bg-white p-6 shadow-md">
            <div className="relative mb-4">
              <select
                  value={selectedSemester}
                  onChange={(e) => setSelectedSemester(e.target.value)}
                  className="w-full bg-gray-100 border border-gray-300 rounded-md py-2 px-4 appearance-none"
              >
                {semesters.map((semester) => (
                    <option key={semester} value={semester}> {semester} </option>
                ))}
              </select>

              <ChevronDown
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none"/>
            </div>

            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"/>

              <input
                  type="text"
                  placeholder="Type class name or CRN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full rounded-full bg-gray-100 border border-gray-300"
              />
            </div>

            <div className="flex items-center space-x-2 items-center justify-center mr-5">
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
            <div
                className={`space-y-4 overflow-hidden transition-all duration-300 ease-in-out ${showMoreOptions ? 'max-h-80 opacity-100 mb-6' : 'max-h-0 opacity-0'}`}>
              <input
                  type="text"
                  placeholder="Subject (ex. 'BIOL')"
                  value={courseSubject}
                  onChange={(e) => setCourseSubject(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-md py-2 px-4"
              />
              <input
                  type="text"
                  placeholder="Course # (ex. '101')"
                  value={courseNumber}
                  onChange={(e) => setCourseNumber(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-md py-2 px-4"
              />
              <input
                  type="text"
                  placeholder="CRN (ex. 20235)"
                  value={crn}
                  onChange={(e) => setCrn(e.target.value)}
                  className="w-full bg-white border border-gray-300 rounded-md py-2 px-4"
              />
            </div>

            <div className="mt-auto mx-6">
              <button onClick={toResults}
                      className="w-full bg-blue-500 text-white active:bg-blue-800 hover:bg-blue-700 text-3xl p-4  rounded-full font-semibold transition-colors duration-200">
                GO!
              </button>
            </div>
          </div>
        </main>

        <SlideInOverlay isOpen={isOverlayOpen} title="TEST TITLE" onClose={() => setIsOverlayOpen(false)}>
          <button
              onClick={() => setIsOverlayOpen(false)}
              className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors duration-200"
          >
            Close
          </button>
        </SlideInOverlay>
      </div>
      // </PageTransition>
  )
}