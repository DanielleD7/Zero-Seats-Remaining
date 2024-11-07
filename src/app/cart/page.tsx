'use client'

import { Button } from "@/components/ui/button"
import { Class } from "@/components/ui/data"
import { useUser } from "@/components/meta/context"
import CourseCard from "@/components/ui/course-card"
import Header from '@/components/ui/header'

export default function Cart() {
  const { user } = useUser()

  const register = (classes : Class[]) => {

  }

  return (
    <PageTransition>
      <div className="max-w-md mx-auto bg-gray-100 min-h-screen">
        <Header showShoppingCart={false} title="Course Cart"/>
        
        <main className="p-4">
          {user.cart.map((e : Class) => (
            <CourseCard
              course={e.course}
              section={e.section}
              onTouch={() => {}}
              showHeader={true}
              isAdded={true}>
            </CourseCard>
          ))}
        </main>
      </div>
    </PageTransition>
  );
}