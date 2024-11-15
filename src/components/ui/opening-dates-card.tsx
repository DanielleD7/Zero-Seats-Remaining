import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { X, ArrowRight } from "lucide-react"
import React from "react"

interface RegistrationDate {
  creditHours: string
  date: string
  day: string
}

interface OpeningDatesProps {
  openTime: string
  timezone: string
  registrationDates: RegistrationDate[]
}

export default function OpeningDatesCard({
  openTime = "7:30AM",
  timezone = "EST",
  registrationDates = [
    { creditHours: "90+", date: "October 29", day: "Tuesday" },
    { creditHours: "75-89", date: "October 31", day: "Friday" },
    { creditHours: "60-74", date: "November 1", day: "Friday" },
    { creditHours: "50-59", date: "November 7", day: "Thursday" },
    { creditHours: "40-49", date: "November 8", day: "Friday" },
    { creditHours: "30-39", date: "November 11", day: "Monday" },
    { creditHours: "20-29", date: "November 12", day: "Tuesday" },
    { creditHours: "1-19", date: "November 13", day: "Wednesday" },
    { creditHours: "0", date: "November 14", day: "Thursday" },
  ]
}: OpeningDatesProps) {
  return (
    // <Card className="bg-purple-100 text-gray-800 max-w-md mx-auto">
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        {/*<CardTitle className="text-xl font-bold">Opening Dates</CardTitle>*/}
        {/*<button className="text-gray-500 hover:text-gray-700" aria-label="Close">*/}
        {/*  <X className="h-6 w-6" />*/}
        {/*</button>*/}
      </CardHeader>
      <CardContent>
        <p className="text-center text-sm text-gray-600 mb-4">
          Opens at {openTime} {timezone}.
        </p>
        
        <div className="grid grid-cols-[auto,auto,1fr] gap-2 items-center ">
          <div className="text-sm font-semibold col-span-2" style={{textAlign: "right"}}>Earned credit hours</div>
          <div className="text-sm font-semibold text-center">Available on</div>
          
          {registrationDates.map((item, index) => (
            <React.Fragment key={index}>
              <div className={`text-center pr-2`}>{item.creditHours}</div>
              <ArrowRight className="h-4 w-4" />
              <div>
                {item.date} <span className={`text-gray-500`}>({item.day})</span>
              </div>
            </React.Fragment>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}