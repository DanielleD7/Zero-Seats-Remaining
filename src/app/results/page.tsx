'use client'

import { useState } from 'react'
import { ChevronLeft, ShoppingCart, ChevronDown, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

type Section = {
  id: string
  instructor: string
  location: string
  time: string
  seats: number
  totalSeats: number
}

type Course = {
  id: string
  name: string
  description: string
  sections: Section[]
}

type CourseGroup = {
  type: string;
  courses: Course[];
}

const courses: Course[] = [
  {
    id: 'CSIS601',
    name: 'CSIS 601',
    description: 'Model Data/Database Design',
    sections: [
      {
        id: '01',
        instructor: 'Ravan, John',
        location: 'The Citadel',
        time: '05:30 PM - 08:15PM',
        seats: 15,
        totalSeats: 15
      },
      {
        id: '02',
        instructor: 'Smith, Jane',
        location: 'Online',
        time: '06:00 PM - 08:45PM',
        seats: 20,
        totalSeats: 25
      }
    ]
  },
  {
    id: 'CSIS605',
    name: 'CSIS 605',
    description: 'Applied Algorithms',
    sections: [
      {
        id: '01',
        instructor: 'Ghosh, Kris',
        location: 'HWEA 300',
        time: '05:30 PM - 08:15PM',
        seats: 12,
        totalSeats: 12
      }
    ]
  },
  {
    id: 'CSIS614',
    name: 'CSIS 614',
    description: 'Advanced Operating Systems',
    sections: [
      {
        id: '01',
        instructor: 'LeClerc, Anthony',
        location: 'HWEA 300',
        time: '05:30 PM - 08:15PM',
        seats: 12,
        totalSeats: 12
      }
    ]
  },
]

const groupCoursesByType = (courses: Course[]): CourseGroup[] => {
  const groups: { [key: string]: Course[] } = {};
  courses.forEach(course => {
    const type = course.id.slice(0, 4);
    if (!groups[type]) groups[type] = [];
    groups[type].push(course);
  });
  return Object.entries(groups).map(([type, courses]) => ({ type, courses }));
};

function CourseDropdown({ course }: { course: Course }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
        <div className="w-full max-w-md space-y-8">
          <h1 className="text-3xl font-bold text-center">Welcome</h1>
          <p className="text-center text-gray-600">
            You can register for classes on OCTOBER 29
          </p>
          <div className="space-y-4">
            <Button variant="outline" className="w-full flex items-center justify-center">
              <span className="mr-2">🔍</span> Testing
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-center">
              <span className="mr-2">📚</span> 1, 2, 3
            </Button>
            <Button variant="outline" className="w-full flex items-center justify-center">
              <span className="mr-2">📅</span> Success
            </Button>
          </div>
        </div>
      </div>
    // <Card className="mb-4 bg-white">
    //   <CardHeader className="p-4 flex flex-row items-center justify-between">
    //     <CardTitle className="text-lg font-bold">{course.name}</CardTitle>
    //     <Button
    //       variant="ghost"
    //       size="sm"
    //       onClick={() => setIsExpanded(!isExpanded)}
    //     >
    //       <ChevronDown className={`h-5 w-5 transition-transform ${
    //         isExpanded ? 'transform rotate-180' : ''
    //       }`} />
    //     </Button>
    //   </CardHeader>
    //   <CardContent className="px-4 pb-4">
    //     <p className="text-sm text-gray-600 mb-2">{course.description}</p>
    //     {isExpanded && (
    //       <div className="mt-4 space-y-4">
    //         {course.sections.map(section => (
    //           <div key={section.id} className="border-t pt-4 first:border-t-0 first:pt-0">
    //             <div className="flex justify-between items-center">
    //               <div className="flex items-center space-x-2">
    //                 <div className="w-6 h-6 bg-gray-200 flex items-center justify-center rounded">
    //                   {section.id}
    //                 </div>
    //                 <div>
    //                   <p className="text-xs">{section.time}</p>
    //                   <p className="text-xs font-semibold">{section.location}</p>
    //                 </div>
    //               </div>
    //               <div className="text-right">
    //                 <p className="text-xs">Seats Left</p>
    //                 <p className="text-sm font-semibold">{section.seats}/{section.totalSeats}</p>
    //               </div>
    //             </div>
    //             <p className="text-sm mt-2">{section.instructor}</p>
    //             <Button size="sm" className="mt-2 rounded-full bg-blue-500 hover:bg-blue-600">
    //               <Plus className="h-4 w-4" />
    //             </Button>
    //           </div>
    //         ))}
    //       </div>
    //     )}
    //   </CardContent>
    // </Card>
  );
}

export default function CourseList() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4"> </div>
    // <div className="max-w-md mx-auto bg-gray-100 min-h-screen">
    //   <header className="flex justify-between items-center p-4 bg-white">
    //     <Button variant="ghost" size="icon">
    //       <ChevronLeft className="h-6 w-6" />
    //     </Button>
    //     <h1 className="text-xl font-semibold">Search Results</h1>
    //     <Button variant="ghost" size="icon">
    //       <ShoppingCart className="h-6 w-6" />
    //     </Button>
    //   </header>
    //   <main className="p-4">
    //     {courses.map((course) => (
    //       <CourseDropdown key={course.id} course={course} />
    //     ))}
    //   </main>
    // </div>
  );
}