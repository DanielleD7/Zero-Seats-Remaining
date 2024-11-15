'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUser } from "@/components/meta/context"
import { TransitionLink } from '../meta/transition-link'

interface HeaderProps {
  showShoppingCart?: boolean
  title?: string
}

export default function Header({ showShoppingCart = true, title = "" }: HeaderProps) {
  const { user } = useUser()
  const router = useRouter()
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
      // Function to run on each interval
      const pollCart = () => {
        setCartCount(user.cart.length)
      }
      pollCart()
      // Set up the interval
      const intervalId = setInterval(pollCart, 500)

      // Clean up function to clear the interval when the component unmounts
      return () => clearInterval(intervalId)
    }, []) // Empty dependency array means this effect runs once on mount

  return (
    <div>

    <header className="z-100 fixed top-0 left-0 right-0 bg-background border-b h-16">
      <div className="container h-full flex items-center justify-between">
        <div className="flex items-center ml-6">
          <TransitionLink href="PREV_PAGE" mode="right"><Button
            variant="ghost"
            size="icon"
            
            aria-label="Go back"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button></TransitionLink>
          <h1 className="ml-6 text-lg font-semibold">{title}</h1>
        </div>
        {showShoppingCart && (
          <TransitionLink href="/cart" mode="left">
          <Button
            variant="ghost"
            size="icon"
            className="relative p-0 pr-5 mr-5"
            aria-label={`Shopping cart with ${user.cart.length} items`}
            
          > 
            <ShoppingCart className="h-8 w-8 " />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-6 w-6 mr-2 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
                {cartCount}
              </span>
            )}
          </Button>
          </TransitionLink>
        )}
      </div>
    </header>
    <header className="bg-background border-b h-16"></header>
    </div>
  )
}