import { X } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function CourseInfoCard({classNumber='Class 101', className='ClassName', description='Test Description', prerequisites='None', corequisites='None'}) {
  return (
    <div>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div>
          <CardTitle className="text-xl font-bold">{classNumber}</CardTitle>
        </div>
        <div className="flex items-center space-x-2">
          {/* <span className="text-medium font-medium"><p className='text-right text-2xs/[10px] text-gray-500'>CRN</p> {crn}</span> */}

        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-sm pt-2">{description}</p>
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
    </div>
  )
}