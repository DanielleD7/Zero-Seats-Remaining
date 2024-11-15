'use client'

import { Button } from "@/components/ui/button"
import { ShoppingCart } from 'lucide-react'
import { useRouter } from "next/navigation"

export default function GoToCartFAB() {
  const router = useRouter()

  const handleClick = () => {
    router.push('/cart') // Adjust this path to your cart page route
  }

  return (
    <Button
      onClick={handleClick}
      className="fixed bottom-4 right-4 rounded-full shadow-lg flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
    >
      <ShoppingCart className="h-5 w-5" />
      <span>Go to Cart</span>
    </Button>
  )
}