'use client'

import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useUser } from "@/components/meta/context"
import { TransitionLink } from '../meta/transition-link'
import { read } from '@/lib/neo4j'

interface HeaderProps {
  showShoppingCart?: boolean
  title?: string
}

export default function Header({ showShoppingCart = true, title = "" }: HeaderProps) {
  const { user } = useUser()
  const router = useRouter()
  
  const [ cart, setCart ] = useState<any[]>([])

  useEffect(() => {
    // Function to run on each interval
    const pollCart = async () => {
      queryData()
    }
    pollCart()
    // Set up the interval
    const intervalId = setInterval(pollCart, 1000)

    // Clean up function to clear the interval when the component unmounts
    return () => clearInterval(intervalId)
  }, []) // Empty dependency array means this effect runs once on mount


  React.useEffect(() => {
    queryData()
  }, [])

  const queryData = async () => {
    let getCart = `MATCH (:Profile {CWID: "${user}"}) -[:Cart]-> (section:Section) RETURN section`
    setCart(await read(getCart))
  }

  return (
    <div>
      <header className="z-100 fixed top-0 left-0 right-0 bg-background border-b h-16">
        <div className="container h-full flex items-center justify-between">
          <div className="flex items-center ml-6">
            <TransitionLink href="PREV_PAGE" mode="right">
              <Button variant="ghost" size="icon" aria-label="Go back">
                <ChevronLeft className="h-6 w-6"/>
              </Button>
            </TransitionLink>
            
            <h1 className="ml-6 text-lg font-semibold"> {title} </h1>
          </div>

          {showShoppingCart && (
            <TransitionLink href="/cart" mode="left">
              <Button variant="ghost" size="icon" className="relative p-0 pr-5 mr-5" aria-label={`Shopping cart with ${cart.length} items`}> 
                <ShoppingCart className="h-8 w-8 "/>
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 flex h-6 w-6 mr-2 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
                    {cart.length}
                  </span>
                )}
              </Button>
            </TransitionLink>
          )}
        </div>
      </header>

      <header className="bg-background border-b h-16"> </header>
    </div>
  )
}