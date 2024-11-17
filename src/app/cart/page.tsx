'use client'

import { Button } from "@/components/ui/button"
import { Class } from "@/components/ui/data"
import { useUser } from "@/components/meta/context"
import CourseCard from "@/components/ui/course-card"
import Header from '@/components/ui/header'
import PageTransition from '@/components/meta/page-transition'
import React, { useState } from "react";
import { TransitionLink } from "@/components/meta/transition-link"
import { read, write } from '@/lib/neo4j'

export default function Cart() {
  const { user } = useUser()
  const [ cart, setCart ] = useState<any[]>([])

  React.useEffect(() => {
    queryData()
  }, [])

  const queryData = async () => {
    let getCart = `MATCH (:Profile {CWID: "${user}"}) -[:Cart]-> (section:Section) RETURN section`
    let response = await read(getCart)

    setCart(response)
  }

  const register = (classes : Class[]) => {
    // for (var section in cart) {
    //   let query = ``
    //   write()
    // }
  }

  return (
    <div className="max-h-screen overflow-scroll">
      <div className="mx-auto bg-gray-100 min-h-screen">
        <Header showShoppingCart={false} title="Course Cart"/>

        <main className="p-4">
          {cart.map((section: any) => (
            <CourseCard section={section.section.properties} onTouch={() => {}} showHeader={true} modal={() => {throw new Error('Function not implemented.')}}/>
          ))}

          {cart.length == 0 && 
            <div className = "justify-center items-center flex-col flex">
              <p className="mb-5">Your Course Cart is empty!</p>

              <div className=" pl-5 pr-5 pb-5 flex flex-row justify-between space-x-2">
                <TransitionLink  href="find-classes" mode="right">
                  <Button> FIND CLASSES </Button>
                </TransitionLink>
              </div>
            </div>
          }
        </main>
      </div>
    </div>
  );
}