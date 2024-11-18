'use client'

import { Button } from "@/components/ui/button"
import { Class, Course } from "@/components/ui/data"
import { useUser } from "@/components/meta/context"
import CourseCard from "@/components/ui/course-card"
import Header from '@/components/ui/header'
import PageTransition from '@/components/meta/page-transition'
import React, { useState } from "react";
import { TransitionLink } from "@/components/meta/transition-link"
import { read } from "@/lib/neo4j"
import Modal, { ModalRef } from "@/components/meta/modal"
import { List } from "lucide-react"

export default function Cart() {
  const { user } = useUser()
  
  const [preReqMissing, setPreReqMissing] = React.useState(false)
  const prereqModalRef = React.useRef<ModalRef>(null)

  const openPrereqModal = () => {
    console.log("Working?")
    prereqModalRef.current?.open()
  }
  const closePrereqModal = () => {
      prereqModalRef.current?.close()
  }
  var missingPrereqs: { Prereq: string; Course: string }[] = []
  let [preReqString, updatePreReqString] = useState("")
  const checkPrereq = async (cart: Class[]) => {
    let string = ""
    console.log(preReqString)
    const query = `MATCH (p:Profile {CWID: $cwid})-[:Taken]-(c:Course) WITH c.Course_Code AS code RETURN code;`
    const neo4jData = await read(query, {"cwid" : "32480132"})
    console.log(neo4jData)
    cart.forEach((cartData) =>{
      cartData.course.prereqs.forEach((prereq)=>{
        let preReqMet = false
        console.log(cartData)
        neo4jData.forEach((data)=>{
          if (data['code'] == prereq) {
            preReqMet = true
          }
        })
        if(!preReqMet) {
          console.log("Yay")
          missingPrereqs.push({"Prereq" : prereq, "Course" : cartData.course.id})
          setPreReqMissing(true)
        }
      })
    })
    missingPrereqs.forEach((preReq)=>{updatePreReqString(string += ("Missing " + preReq['Prereq'] + " for " + preReq['Course'] + "\n"))})
    console.log("Prereq: " +  preReqString)
    openPrereqModal()
  }

  const register = (classes : Class[]) => {

  }
  
  return (
    <div className="max-h-screen overflow-scroll">
      {preReqMissing && 
      <Modal
                title="MISSING PREREQUISITES"
                variant = "destructive"
                ref={prereqModalRef}
            >
                <div className = "pb-5 pl-5 pr-5" style={{textAlign: "left"}}>
                  <p>{preReqString}</p>
                </div>
                <div className=" pl-5 pr-5 pb-5 flex flex-row justify-between space-x-2">
                    <Button variant="outline" onClick={closePrereqModal} className="font-bold
                                                            flex-1 border-2
                                                            text-white
                                                            border-primary 
                                                            hover:text-white 
                                                            hover:bg-red-700 
                                                            focus:ring-2 
                                                            focus:ring-primary 
                                                            active:bg-red-800 
                                                            focus:ring-offset-2 
                                                            ml-20 mr-20 
                                                            hover:ml-25
                                                            bg-red-600">

                        OK
                    </Button>
                </div>
            </Modal>
            }
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
          <Button onClick={()=>checkPrereq(user.cart)}>Register</Button>
        </main>
      </div>
    </div>
  );
}