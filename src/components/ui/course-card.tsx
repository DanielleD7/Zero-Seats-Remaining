import { useState } from 'react'
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"
import { Class, Course, Section } from "@/components/ui/data"
import { useUser } from "@/components/meta/context"

interface CourseCardProps {
    course: Course
    section: Section
    onTouch: (code : string) => void
    showHeader: boolean
    isAdded: boolean
}

export default function CourseCard({course, section, onTouch, showHeader, isAdded}: CourseCardProps) {
    const { user } = useUser()
    const [ added, setAdded ] = useState(isAdded)

    const onButtonClick = () => {
        if (added) {
            user.cart = user.cart.filter((e : Class) => {
                e.course != course || e.section != section
            })
        }

        else {
            user.cart.push({course: course, section: section})
        }

        setAdded(!added)
    }

    const onCardClick = () => {
        onTouch(course.id)
    }

    return (
        <Card className="w-full max-w-xl bg-white overflow-hidden">
            {(showHeader) && (
                <CardHeader className="bg-slate-100 p-3 pb-2">
                    <div className="font-semibold text-primary"> {course.id} </div>
                    <div className="text-sm text-muted-foreground"> {course.title} </div>
                </CardHeader>
            )}
      
            <div className="flex items-stretch gap-4 p-4">
                <div className="text-4xl font-bold min-w-[3rem] flex items-center justify-center pr-4 border-r border-gray-200"> {section.id} </div>
                
                <div className="flex-1 flex flex-col" onClick={onCardClick}>
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex gap-2 text-sm mb-1">
                            { section.days.map((day, index) => (<span key={index} className="font-medium"> {day} </span>)) }
                        </div>
                    
                        <div className="font-medium"> {section.location} </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground"> {section.time} </div>
                    <div className="text-sm text-muted-foreground">{section.professor} </div>
                </div>

                <div className="flex flex-col justify-between items-end pl-4 border-l border-gray-200">
                    <div className="text-sm text-right mb-2"> Seats Left <br /> {section.seatsOpen}/{section.seats} </div>
                    
                    <Button size="icon" className={`rounded-full w-10 h-10 ${added ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-500 hover:bg-blue-600'}`} onClick={onButtonClick}>
                        {added ? <Minus className="h-6 w-6"/> : <Plus className="h-6 w-6"/>}
                        <span className="sr-only">Add course</span>
                    </Button>
                </div>
            </div>
        </Card>
    )
}