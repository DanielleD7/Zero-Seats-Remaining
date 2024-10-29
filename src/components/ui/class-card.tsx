import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Plus } from "lucide-react"

interface ClassScheduleCardProps {
  id: string
  days: string[]
  timeSlot: string
  roomCode: string
  profName: string
  seatsLeft: number
  totalSeats: number
}

export default function ClassCard({
  id,
  days,
  timeSlot,
  roomCode,
  profName,
  seatsLeft,
  totalSeats
}: ClassScheduleCardProps = {
  id: "01",
  days: ["M", "T", "W", "H", "F"],
  timeSlot: "08:30 AM - 09:30 AM",
  roomCode: "HWEA 300",
  profName: "Prof Name",
  seatsLeft: 12,
  totalSeats: 20
}) {
  const daysOfWeek = ["M", "T", "W", "H", "F"]

  return (
    <Card className="w-full max-w-md">
      <CardContent className="p-0">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-16 h-full bg-gray-100 flex items-center justify-center text-4xl font-bold border-r">
            {id}
          </div>
          <div className="flex-grow p-4">
            <div className="flex justify-between items-center mb-2">
              <div className="flex space-x-1">
                {daysOfWeek.map((day) => (
                  <span
                    key={day}
                    className={`w-6 h-6 flex items-center justify-center text-sm ${
                      days.includes(day) ? "bg-primary text-primary-foreground" : "bg-gray-100"
                    } rounded`}
                  >
                    {day}
                  </span>
                ))}
              </div>
              <div className="text-sm text-gray-600">{timeSlot}</div>
            </div>
            <div className="text-lg font-semibold mb-1">{roomCode}</div>
            <div className="text-sm text-gray-600 mb-2">{profName}</div>
            <div className="flex justify-between items-center">
              <span className="text-sm">
                Seats Left {seatsLeft}/{totalSeats}
              </span>
              <Button size="sm" className="rounded-full">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}