'use client'

import { Button } from "@/components/ui/button"
import { Class } from "@/components/ui/data"
import { useUser } from "@/components/meta/context"
import CourseCard from "@/components/ui/course-card"
import Header from '@/components/ui/header'
import PageTransition from '@/components/meta/page-transition'
import React from "react";
import { TransitionLink } from "@/components/meta/transition-link"

export default function Cart() {
  const { user } = useUser()

  const register = (classes : Class[]) => {

  }

  return (
    <div className="max-h-screen overflow-scroll">
      <div className="mx-auto bg-gray-100 min-h-screen">
        <Header showShoppingCart={false} title="Course Cart"/>

        <main className="p-4">
          {user.cart.map((e: Class) => (
              <CourseCard
              course={e.course}
              section={e.section}
              onTouch={() => {
              } }
              showHeader={true}
              isAdded={true} modal={function (callback: () => void): void {
                throw new Error("Function not implemented.")
              } }>
              </CourseCard>
          ))}

          {user.cart.length == 0 && <div className = "justify-center items-center flex-col flex">
            <p className="mb-5">Your Course Cart is empty!</p>
            <div className=" pl-5 pr-5 pb-5 flex flex-row justify-between space-x-2">
            <TransitionLink  href="find-classes" mode="right"><Button>
            FIND CLASSES
          </Button></TransitionLink>
          </div>
          </div>}
        </main>
      </div>
    </div>
  );
}