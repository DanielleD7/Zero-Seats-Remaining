import React, { useState } from 'react'
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { Class, Course, Section } from "@/components/ui/data"
import { useUser } from "@/components/meta/context"
import { toast } from 'react-toastify'
import { write } from '@/lib/neo4j'

interface CourseCardProps {
    section: any
    isAdded: boolean
    onTouch: (code : string) => void
    modal: (callback: () => void) => void
    showHeader?: boolean
}

export default function CourseCard({section, onTouch, modal, isAdded, showHeader = false}: CourseCardProps) {
    const { user } = useUser()
    const [ added, setAdded ] = useState(isAdded)
    const [ classIsFull, setClassisFull ] = useState(Math.random() < 0.5)

    const [ code, setCode ] = useState('')
    const [ time, setTime ] = useState('')
    const [ days, setDays ] = useState<any[]>([])
    const [ location, setLocation ] = useState('')
    
    React.useEffect(() => {
        setCode(`${section.subject} ${section.courseNumber}`)
        setLocation(`${section.building} ${section.room}`)

        let startTime = new Date(0, 0, 0, ~~(section.beginTime.low / 100), (section.beginTime.low % 100))
        let endTime = new Date(0, 0, 0, ~~(section.endTime.low / 100), (section.endTime.low % 100))
        setTime(`${startTime.toLocaleTimeString([], {hour: 'numeric', minute: 'numeric'})} - ${endTime.toLocaleTimeString([], {hour: 'numeric', minute: 'numeric'})}`)

        let schedule = []
        section.sunday    ? schedule.push("S") : {}
        section.monday    ? schedule.push("M") : {}
        section.tuesday   ? schedule.push("T") : {}
        section.wednesday ? schedule.push("W") : {}
        section.thursday  ? schedule.push("H") : {}
        section.friday    ? schedule.push("F") : {}
        section.saturday  ? schedule.push("S") : {}
        setDays(schedule)
    }, [])

    const addToCartNotif = () => toast.info('Added to cart!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        className: 'registered-notif',
        style: { position: 'absolute', left: '15%', right: '25%', width:'calc(100vw - 40vw)',  backgroundColor: "rgb(59 130 246)"}
    });

    const removeFromCartNotif = () => toast.info('Removed from cart.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        className: 'registered-notif',
        style: { position: 'absolute', left: '15%', right: '25%', width:'calc(100vw - 40vw)'}
    });
    
    const addToWaitlistNotif = () => toast.info('Added to waitlist!', {
          position: "top-center",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          className: 'registered-notif',
          style: { position: 'absolute', left: '15%', right: '25%', width:'calc(100vw - 40vw)',  backgroundColor: "#e85d0d"}
    });

    const timeConflictNotif = () => toast.error("Couldn't add seat: TIME CONFLICT", {
        position: "top-right",
        autoClose: 7000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        className: 'registered-notif',
        style: { position: 'absolute', left: '15%', right: '25%', width:'calc(100vw - 40vw)'}
    });
    // set this based on whether the section has Zero Seats Remaining
    
    const toggleByWaitlist = () => {
        addSection()
        addToWaitlistNotif()
    }

    const addSection = () => {
        let query = `MATCH (p:Profile {CWID: "${user}"}) MATCH (s:Section {id: ${section.id.low}}) CREATE (p) -[:Cart]-> (s)`
        write(query)

        setAdded(true)
    }

    const removeSection = () => {
        let query = `MATCH (p:Profile {CWID: "${user}"}) -[r:Cart]-> (s:Section {id: ${section.id.low}}) DELETE r`
        write(query)

        setAdded(false)
    }

    const onButtonClick = () => {

        // whoever's over this, just set this variable to whether or not a time conflict occurred
        var timeConflict = false

        if (added) {
            removeSection()
            removeFromCartNotif()
        } 
        
        else {
            if (timeConflict) {
                timeConflictNotif()
            }

            else if (classIsFull) {
                modal(toggleByWaitlist)
            }

            else {
                addSection()
                addToCartNotif()
            }
        }
    }

    const onCardClick = () => {
        onTouch(code)
    }

    return (
        <Card className=" w-full max-w-xl bg-white overflow-hidden border mb-2">
            {(showHeader) && (
                <CardHeader className={`bg-white border-black p-3 pb-2 border-b-1 border-l-8 ${classIsFull ? "border-l-orange-500" : "border-l-blue-500"}`}>
                    <div className="font-semibold text-primary"> {code} </div>
                    <div className="text-sm text-muted-foreground"> {section.courseTitle} </div>
                </CardHeader>
            )}
      
      
            <div className={`${classIsFull ? 'bg-orange-50' : 'bg-blue-50'} flex items-stretch gap-4 p-4 border-l-8 ${classIsFull ? "border-orange-500" : "border-blue-500"}`}>
                {/* <div className="bg-blue-400 text-white flex items-center justify-center p-1"></div> */}
                <div className="text-2xl font-bold min-w-[3rem] flex items-center justify-center pr-4 border-r border-gray-200"> {`${section.sequenceNumber.low}`.padStart(2, '0')} </div>
                
                <div className="flex-1 flex flex-col" onClick={onCardClick}>
                    <div className="flex justify-between items-start mb-2">
                        <div className=" border-gray-200 rounded-lg bg-white  p-1 wflex gap-2 text-sm mb-1">
                            { section.days.map((day, index) => (<span key={index} className="text-xs"> {day} </span>)) }
                        </div>
                    
                        <div className=" border-gray-200 rounded-lg bg-white p-1 flex gap-1 text-sm mb-1"> {location} </div>
                    </div>
                    
                    <div className="mb-4 text-xs text-black"> {time} </div>
                    <div className="text-xs text-muted-foreground">{section.instructor} </div>
                </div>

                <div className="flex flex-col justify-between pl-4 border-l border-gray-200">
                    <div className="bg-white rounded-lg px-2 py-1 text-xs text-center mb-2"> Seats <br /> <p className='text-lg font-black pt-2'>{section.seatsAvailable.low}/{section.maximumEnrollment.low}</p> </div>
                    

                    <div className="justify-center flex">
                        <Button size="icon" className={`rounded-full w-12 h-12 ${added ? 'bg-red-500 hover:bg-red-600' : classIsFull ? 'bg-orange-500 hover:bg-orange-600' : 'bg-blue-500 hover:bg-blue-600'}`} onClick={onButtonClick}>
                            {added ? <Minus/> : <Plus/>}
                            <span className="sr-only">Add course</span>
                        </Button>
                    </div>
                </div>
            </div>
        </Card>
    )
}