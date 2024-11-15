'use client'

import { Button } from "@/components/ui/button"
import { ShoppingCart } from 'lucide-react'
import { useRouter } from "next/navigation"
import { TransitionLink } from "../meta/transition-link"
import { useUser } from "@/components/meta/context"
import { useEffect, useState } from "react"

export default function GoToCartFAB() {
  const router = useRouter()
  const { user } = useUser()
  const [cartCount, setCartCount] = useState(0)
  
  useEffect(() => {
    // Function to run on each interval
    const pollCart = () => {
      setCartCount(user.cart.length)
    }
    pollCart()
    // Set up the interval
    const intervalId = setInterval(pollCart, 1000)

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, []) // Empty dependency array means this effect runs once on mount

  const handleClick = () => {
    router.push('/cart') // Adjust this path to your cart page route
  }

  return (
    <TransitionLink href="/cart" mode="left">
      {cartCount>0 && (<Button
        onClick={handleClick}
        className="fixed bottom-4 right-4 h-12 rounded-full flex items-center gap-2 px-6 py-2 bg-primary text-primary-foreground hover:bg-primary/90"
      >
        <ShoppingCart className="h-5 w-5" />
        <span>Go to Cart</span>
      </Button>)}
    </TransitionLink>
  )
}