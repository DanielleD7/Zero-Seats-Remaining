import { X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CourseInfoCard({classNumber='Class 101', className='ClassName', crn='11111', description='Test Description', prerequisites='None', corequisites='None'}) {
  return (
    <Card className="w-full max-w-md bg-blue-100">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-bold">{classNumber}</CardTitle>
          <p className="text-sm font-medium text-muted-foreground">{className}</p>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">{crn}</span>
          <button className="text-gray-500 hover:text-gray-700">
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm">{description}</p>
          <div className="space-y-2">
            <p className="text-sm">
              <span className="font-semibold">Prerequisites:</span> {prerequisites}
            </p>
            <p className="text-sm">
              <span className="font-semibold">Corequisites:</span> {corequisites}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}