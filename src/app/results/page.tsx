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

var classNumber = "TEST 101"
var className = "Test Class"
var crn = "123405"
var description = "This is a test and shouldn't appear under normal circumstances"
var prerequisites = "None"
var corequisites = "None"

var confirmModalUp = false;

function CourseDropdown({course} : {course : any}) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)
  const [infoCourse, setInfoCourse] = useState({})
  const [sections, setSections] = useState<any[]>([])
  
  React.useEffect(() => {
    queryData()
  }, [])

  const queryData = async () => {
    let query = `MATCH (section:Section) -[:SectionOf]-> (:Course {Course_Code: "${course.Course_Code}"}) RETURN section`
    let response = await read(query)

    setSections(response)
  }

  const DisplayClassInfo = async (courseCode : String) => {
    //const query = "MATCH (c:Course {Course_Code: $CourseCode}) RETURN c.Course_Code as CourseCode, c.Course_Name as Name, c.Description as Desc, c.Prerequisites as Prereq, c.Prerequisites_And_Or_Corequisites as Precoreq, c.Corequisites as Coreq;"
    
    let query = `MATCH (c:Course {Course_Code: "${courseCode}"}) RETURN c;`
    let results = await read(query)

    setInfoCourse(results[0].c.properties)

    // classNumber = neo4jData[0]["CourseCode"]
    // className = neo4jData[0]["Name"]
    // description = neo4jData[0]["Desc"]
    // prerequisites = neo4jData[0]["Prereq"]
    // corequisites = neo4jData[0]["Coreq"]
    // console.log(classNumber)
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
      
      <Card className="mb-4 bg-white">
        <CardHeader className="p-4 flex flex-row items-center justify-between">
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
              {sections.map((section: any) => (
                <CourseCard section={section.section.properties} onTouch={DisplayClassInfo} showHeader={false} modal={openModal}/>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* TODO Implement Chex's Generic Popup System */}
      <SlideInOverlay title={"CLASS TITLE"} isOpen={isOverlayOpen} onClose={() => setIsOverlayOpen(false)}>
        <CourseInfoCard classNumber={"TEST 123-01"} crn={"12345"} description={"All told, the decision to acquire InfoWars was an easy one for the Global Tetrahedron executive board. Founded in 1999 on the heels of the Satanic “panic” and growing steadily ever since, InfoWars has distinguished itself as an invaluable tool for brainwashing and controlling the masses. With a shrewd mix of delusional paranoia and dubious anti-aging nutrition hacks, they strive to make life both scarier and longer for everyone, a commendable goal. They are a true unicorn, capable of simultaneously inspiring public support for billionaires and stoking outrage at an inept federal state that can assassinate JFK but can’t even put a man on the Moon."}
                        prerequisites={"Test"} corequisites={"Test"}/>
      </SlideInOverlay>
    </div>
  )
}

export default function Results() {
  const searchParams = useSearchParams()
  const subject = searchParams.get('subject')
  const number = searchParams.get('number')

  const [courses, setCourses] = useState<any[]>([])

  React.useEffect(() => {
    queryData();
  }, []);

  const queryData = async () => {
    let queryParams = []
    subject ? queryParams.push(`Subject:"${subject}"`) : {}
    number ? queryParams.push(`Course_Number:${number}`) : {}

    let getCourses = `MATCH (course:Course {${queryParams.toString()}}) WHERE EXISTS {MATCH (course) <-[:SectionOf]- (:Section {term: 202520})} RETURN course ORDER BY course.Course_Code`
    setCourses(await read(getCourses))
  }

  return (
    <div className="max-h-screen overflow-auto">
      <div className="mx-auto bg-gray-100 min-h-screen">
        <Header showShoppingCart={true} title="Search Results"/>
        
        <main className="p-4">
          {courses.map((course : any) => (<CourseDropdown course={course.course.properties}/>))}
        </main>

        <ToastContainer
          // toastStyle = {{ backgroundColor: "#e85d0d"}}
        />
        <GoToCartFAB/>
      </div>
    </div>
  );
}