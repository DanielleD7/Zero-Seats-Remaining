'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ChevronLeft, ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface HeaderProps {
  showShoppingCart?: boolean
  title?: string
}

export default function Header({ showShoppingCart = true, title = "" }: HeaderProps) {
  const router = useRouter()
  const [cartItemsCount, setCartItemsCount] = useState(3) // Example initial count

  return (
    <header className="bg-background border-b h-16">
      <div className="container h-full flex items-center justify-between">
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => router.back()}
            aria-label="Go back"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>
          <h1 className="ml-4 text-lg font-semibold">{title}</h1>
        </div>
        {showShoppingCart && (
          <Button
            variant="ghost"
            size="icon"
            className="relative p-0 pr-5"
            aria-label={`Shopping cart with ${cartItemsCount} items`}
            onClick={() => router.push('/cart')}
          >
            <ShoppingCart className="h-8 w-8" />
            {cartItemsCount > 0 && (
              <span className="absolute -top-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-destructive text-xs font-bold text-destructive-foreground">
                {cartItemsCount}
              </span>
            )}
          </Button>
        )}
      </div>
    </header>
  )
}