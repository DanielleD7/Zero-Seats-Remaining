// USAGE INSTRUCTIONS:
// import Modal from "@/components/meta/modal"
// then include a <Modal /> element anywhere:
//
// <Modal 
//   title = "HEADER TEXT"
//   variant = "default"|"destructive"
//   trigger = {clickableElement} {*/ like "<a>click me!!</a>" /*}
//   defaultOpen = false {*/ whether the popup opens automatically /*}
// />
//

"use client"

import { X } from "lucide-react"
import * as React from "react"

import {
  Dialog, 
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface ModalProps {
  title?: string
  children: React.ReactNode | ((props: { close: () => void }) => React.ReactNode)
  trigger?: React.ReactNode
  variant?: "default" | "destructive"
  defaultOpen?: boolean
}

export default function Modal({
  title = "Registration Hold",
  children,
  trigger,
  variant = "default",
  defaultOpen = false,
}: ModalProps) {
  const [open, setOpen] = React.useState(defaultOpen)

  React.useEffect(() => {
    if (defaultOpen) {
      setOpen(true)
    }
  }, [defaultOpen])

  const headerClass = variant === "destructive" ? "bg-destructive text-destructive-foreground" : "bg-background text-foreground"

  const handleClose = React.useCallback(() => setOpen(false), [])

  return (
      <Dialog open={open} onOpenChange={setOpen}>
        <style jsx global>{` @font-face {
          font-family: 'Dyslexia Font';
          src: url('/Dyslexia_Font.ttf') format('truetype');
          font-weight: normal;
          font-style: normal;
        }

        .dyslexia-font {
          font-family: 'Dyslexia Font', sans-serif;
        } `}</style>

        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent style={{}} className="max-w-md border-none p-0 shadow-lg rounded-lg dyslexia-font">
          <DialogHeader className={`${headerClass} flex flex-row items-center justify-between rounded-t-lg p-4 dyslexia-font`}>
            <DialogTitle className="text-xl font-semibold dyslexia-font">{title}</DialogTitle>
            <DialogClose asChild>
              <button className="rounded-full p-0 hover:bg-gray-200">
                <X className="h- w-4"/>
                <span className="sr-only">Close</span>
              </button>
            </DialogClose>
          </DialogHeader>
          {typeof children === 'function'
              ? (children as (props: { close: () => void }) => React.ReactNode)({close: handleClose})
              : children}
        </DialogContent>
      </Dialog>
  )
}