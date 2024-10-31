import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader } from "@/components/ui/card"

interface CourseCardProps {
    section: string
    days: string[]
    time: string
    location: string
    professor: string
    seatsOpen: number
    seats: number
    onAdd?: () => void
    code?: string
    title?: string
}

export default function CourseCard({section, days, time, location, professor, seatsOpen, seats, onAdd = () => {}, code, title}: CourseCardProps) {
    return (
        <Card className="w-full max-w-xl bg-white overflow-hidden">
            {(code || title) && (
                <CardHeader className="bg-slate-100 p-3 pb-2">
                    { code && (<div className="font-semibold text-primary">{code}</div>) }
                    { title && (<div className="text-sm text-muted-foreground">{title}</div>) }
                </CardHeader>
            )}
      
            <div className="flex items-stretch gap-4 p-4">
                <div className="text-4xl font-bold min-w-[3rem] flex items-center justify-center pr-4 border-r border-gray-200"> {section} </div>
                
                <div className="flex-1 flex flex-col">
                    <div className="flex justify-between items-start mb-2">
                        <div className="flex gap-2 text-sm mb-1">
                            { days.map((day, index) => (<span key={index} className="font-medium"> {day} </span>)) }
                        </div>
                    
                        <div className="font-medium"> {location} </div>
                    </div>
                    
                    <div className="text-sm text-muted-foreground"> {time} </div>
                    <div className="text-sm text-muted-foreground">{professor} </div>
                </div>

                <div className="flex flex-col justify-between items-end pl-4 border-l border-gray-200">
                    <div className="text-sm text-right mb-2"> Seats Left <br /> {seatsOpen}/{seats} </div>
                    <Button size="icon" className="rounded-full w-10 h-10 bg-blue-500 hover:bg-blue-600" onClick={onAdd}>
                        <Plus className="h-6 w-6"/>
                        <span className="sr-only">Add course</span>
                    </Button>
                </div>
            </div>
        </Card>
    )
}