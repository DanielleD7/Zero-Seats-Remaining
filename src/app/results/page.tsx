'use client'

import React, { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { ChevronLeft, ShoppingCart, ChevronDown, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import CourseCard from "@/components/ui/course-card"
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { Course, Section, Courses, Class, Account, Accounts } from "@/components/ui/data"
import Header from "@/components/ui/header"
import PageTransition from '@/components/meta/page-transition'
import CourseInfoCard from '@/components/ui/course-info-card'
import SlideInOverlay from '@/components/meta/slide-in-overlay-bottom'
import { read } from '@/lib/neo4j'
import GoToCartFAB from '@/components/ui/cart-fab' 
import Modal, { ModalRef } from '@/components/meta/modal'
import { useUser } from "@/components/meta/context"

var classNumber = "TEST 101"
var className = "Test Class"
var crn = "123405"
var description = "This is a test and shouldn't appear under normal circumstances"
var prerequisites = "None"
var corequisites = "None"

var confirmModalUp = false;

function CourseDropdown({course, sections} : {course: any, sections: any}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [infoCourse, setInfoCourse] = useState({})


  const DisplayClassInfo = async (courseCode : String) => {
    setIsOverlayOpen(true)
  }

  var callback = () => {}

  const openModal = (cb: () => void) => {
    callback = cb
    modalRef.current?.open()
  }
  const closeModal = () => {
    modalRef.current?.close()
  }

  const [confirmOpen, setConfirmOpen] = useState(false)
  // const [modal, setModal] = useState(false)
  const addToWaitlist = () => {
    callback()
    // addToWaitlistNotif()
    closeModal()
  }
  const modalRef = React.useRef<ModalRef>(null)

  const prereqModalRef = React.useRef<ModalRef>(null)
  let [preReqString, updatePreReqString] = useState("")

  const openPrereqModal = (string: string) => {
    updatePreReqString(string)
    prereqModalRef.current?.open()
  }
  const closePrereqModal = () => {
    prereqModalRef.current?.close()
  }
  console.log(course)
  return (
    <div>
      <Modal ref={modalRef} variant="waitlist" title="This section is full!">
        <div className="p-4 pt-0">
          <p>There are no seats remaining for this section. Do you want to add yourself to a waitlist? We'll reserve a seat and notify you if one becomes available.</p>
        </div>

        <div className=" pl-5 pr-5 pb-5 flex flex-row justify-between space-x-2">
          <Button variant="outline" onClick={closeModal} className="flex-1 border-2 border-primary hover:bg-primary/20 hover:text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <b>CANCEL</b>
          </Button>

          <Button variant="waitlist" onClick={addToWaitlist}  className="flex-1 border-2 border-primary hover:bg-primary/20 hover:text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2">
            <b>JOIN WAITLIST</b>
          </Button>
        </div>
      </Modal>

      <Modal
          title="MISSING PREREQUISITES"
          variant = "destructive"
          ref={prereqModalRef}>
          <div className = "pb-5 pl-5 pr-5" style={{textAlign: "left"}}>
            <p>{preReqString}</p>
          </div>
          <div className=" pl-5 pr-5 pb-5 flex flex-row justify-between space-x-2">
            <Button variant="outline" onClick={closePrereqModal} className="font-bold flex-1 border-2 text-white border-primary hover:text-white hover:bg-red-700 focus:ring-2 focus:ring-primary active:bg-red-800 focus:ring-offset-2  ml-20 mr-20 hover:ml-25 bg-red-600">
              OK
            </Button>
          </div>
      </Modal>
      
      <Card  className="mb-4 bg-white">
        <CardHeader onClick={() => setIsExpanded(!isExpanded)} className="p-4 flex flex-row items-center justify-between">
          <div className="flex flex-col">
            <CardTitle className="text-lg font-bold"> {course.Course_Code} </CardTitle>
            <div className="text-sm text-muted-foreground"> {course.Course_Name} </div>
          </div>

          <Button variant="ghost" size="sm" onClick={() => setIsExpanded(!isExpanded)}>
            <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? 'transform rotate-180' : ''}`}/>
          </Button>
        </CardHeader>

        <CardContent className="px-2 pb-2">
          {isExpanded && (
            <div className="mt-4 space-y-4 mb-1">
              {sections.map((sectionData: any) => (<CourseCard section={sectionData.section.properties} status={sectionData.status} onTouch={() => {DisplayClassInfo}} modal={openModal} modal2={openPrereqModal} dropModal={()=>{return false}}/>))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* TODO Implement Chex's Generic Popup System */}
      <SlideInOverlay title={course.Course_Name} isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)}>
        <CourseInfoCard classNumber={course.Course_Code} description={course.Description} className={course.Course_Name} prerequisites={course.Prerequisites} corequisites= {course.Corequisites}/>
      </SlideInOverlay>
    </div>
  )
}

export default function Results() {
  const searchParams = useSearchParams()
  const subject = searchParams.get('subject')
  const number = searchParams.get('number')

  const { user } = useUser()
  const [courses, setCourses] = useState<any[]>([])
  
  React.useEffect(() => {
    loadingNotif(queryData());
  }, []);

  const loadingNotif = ((promise: Promise<unknown> | (() => Promise<unknown>)) => toast.promise(promise, {
    pending: "Loading",
  }))

  const queryData = async () => {
    let queryParams = []
    subject ? queryParams.push(`Subject:"${subject}"`) : null
    number ? queryParams.push(`Course_Number:"${number}"`) : null

    let getCourses = 
    `MATCH (c:Course {${queryParams.join(", ")}}) <-[:SectionOf]- (s:Section)
     OPTIONAL MATCH (p:Profile {CWID: "${user}"}) -[r]-> (s) 
     RETURN c AS course, collect({section: s, status: TYPE(r)}) AS sections
     ORDER BY c.Course_Code`

    setCourses(await read(getCourses))
  }

  return (
    <div className="max-h-screen overflow-auto">
      <div className="mx-auto bg-gray-100 min-h-screen">
        <Header showShoppingCart={true} title="Search Results"/>
        
        <main className="p-4">
          {courses.map(({course, sections} : {course: any, sections: any}) => (<CourseDropdown course={course.properties} sections={sections}/>))}
        </main>

        <ToastContainer
          // toastStyle = {{ backgroundColor: "#e85d0d"}}
        />
        <GoToCartFAB/>
      </div>
    </div>
  );
}