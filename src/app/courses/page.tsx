'use client'

import React, { useState } from 'react'
import { ChevronLeft, ShoppingCart, ChevronDown, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import CourseCard from "@/components/ui/course-card"
import { Class } from "@/components/ui/data"
import PageTransition from '@/components/meta/page-transition'
import Header from '@/components/ui/header'
import { useUser } from "@/components/meta/context"

export default function CourseList() {
  const { user } = useUser()
  
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

        <Header showShoppingCart={false} title="My Courses"/>

        <main className="p-4">
          {user.enrolled.map((e: Class) => (
              <CourseCard
                  course={e.course}
                  section={e.section}
                  onTouch={() => {
                  }}
                  showHeader={true}
                  isAdded={true}>
              </CourseCard>
          ))}
        </main>

        <main className="p-4">
          {user.waitlist.map((e: Class) => (
              <CourseCard
                  course={e.course}
                  section={e.section}
                  onTouch={() => {
                  }}
                  showHeader={true}
                  isAdded={true}>
              </CourseCard>
          ))}
        </main>
      </div>
    </PageTransition>
  );
}