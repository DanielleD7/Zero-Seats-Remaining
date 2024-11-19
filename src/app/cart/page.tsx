'use client'

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
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
  const router = useRouter()
  const [ cart, setCart ] = useState<any[]>([])

  React.useEffect(() => {
    queryData()
  }, [])

  const queryData = async () => {
    let getCart = `MATCH (:Profile {CWID: "${user}"}) -[:Cart]-> (s:Section) RETURN s`
    let response = await read(getCart)

    setCart(response)
    console.log(response)
  }

  const register = async () => {
    let enroll = `MATCH (p:Profile {CWID: "${user}"}) -[r:Cart]-> (s:Section) WHERE s.seatsAvailable > 0 DELETE r CREATE (p) -[:Registered]-> (s)`
    let waitlist = `MATCH (p:Profile {CWID: "${user}"}) -[r:Cart]-> (s:Section) WHERE s.seatsAvailable < 1 DELETE r CREATE (p) -[:Waitlisted]-> (s)`

    await write(enroll)
    await write(waitlist)
  }

  return (
    <div className="max-h-screen overflow-scroll">
      <div className="mx-auto bg-gray-100 min-h-screen">
        <Header showShoppingCart={false} title="Course Cart"/>

        <main className="p-4">
          {cart.map((section: any) => (
            <CourseCard section={section.section.properties} status={"Cart"} onTouch={() => {}} showHeader={true} modal={() => {throw new Error('Function not implemented.')}}/>
          ))}

          {!cart.length && 
            <div className = "justify-center items-center flex-col flex">
              <p className="mb-5">Your Course Cart is empty!</p>

              <div className=" pl-5 pr-5 pb-5 flex flex-row justify-between space-x-2">
                <TransitionLink  href="find-classes" mode="right">
                  <Button> FIND CLASSES </Button>
                </TransitionLink>
              </div>
            </div>
          }

          {cart.length && (
            <div className="p-4 bg-white border-t border-gray-200">
              <div className="flex justify-between space-x-4">
                <Button variant="outline" className="flex-1" onClick={() => {router.push('/schedule')}}>
                  Schedule
                </Button>
                <Button className="flex-1" onClick={register}>
                  Register
                </Button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}