'use client'

import { useState } from 'react'
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

  return (
    <header className="bg-background border-b h-16">
      <div className="container h-full flex items-center justify-between">
        <div className="flex items-center">
          <TransitionLink href="PREV_PAGE" mode="right"><Button
            variant="ghost"
            size="icon"
            
            aria-label="Go back"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button></TransitionLink>
          <h1 className="ml-4 text-lg font-semibold">{title}</h1>
        </div>
        {showShoppingCart && (
          <Button
            variant="ghost"
            size="icon"
            className="relative p-0 pr-5"
            aria-label={`Shopping cart with ${user.cart.length} items`}
            onClick={() => router.push('/cart')}
          >
            <ShoppingCart className="h-8 w-8" />
            {user.cart.length > 0 && (
              <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
                {user.cart.length}
              </span>
            )}
          </Button>
        )}
      </div>
    </header>
  )
}