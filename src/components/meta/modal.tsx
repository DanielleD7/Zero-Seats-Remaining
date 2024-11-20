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
  variant?: "default" | "destructive" | "waitlist" | "info"
  defaultOpen?: boolean
}

export interface ModalRef {
  open: () => void
  close: () => void
}

const Modal = React.forwardRef<ModalRef, ModalProps>(({
  title = "Registration Hold",
  children,
  trigger,
  variant = "default",
  defaultOpen = false,
}, ref) => {
  const [open, setOpen] = React.useState(defaultOpen)

  React.useEffect(() => {
    if (defaultOpen) {
      setOpen(true)
    }
  }, [defaultOpen])

  const headerClass = variant === "destructive" ? "bg-destructive text-destructive-foreground" : 
                      variant ===  "waitlist" ? "bg-waitlist text-destructive-foreground" : 
                      variant === "info" ? "bg-blue-500 text-white" :
                                   "bg-background text-foreground"

  const handleOpen = React.useCallback(() => setOpen(true), [])
  const handleClose = React.useCallback(() => setOpen(false), [])

  React.useImperativeHandle(ref, () => ({
    open: handleOpen,
    close: handleClose,
  }))

  return (
      <Dialog open={open} onOpenChange={setOpen}>
        {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
        <DialogContent style={{}} className="max-w-md border-none p-0 shadow-lg rounded-lg">
          <DialogHeader className={`${headerClass} flex flex-row items-center justify-between rounded-t-lg p-4`}>
            <DialogTitle className="text-xl font-semibold">{title}</DialogTitle>
            <DialogClose asChild>
              <button className="rounded-full p-0 hover:bg-gray-200">
                <X className="h- w-4"/>
                <span className="sr-only">Close</span>
              </button>
            </DialogClose>
          </DialogHeader>
          <div className=" ">
          {typeof children === 'function'
              ? (children as (props: { close: () => void }) => React.ReactNode)({close: handleClose})
              : children}
              </div>
        </DialogContent>
      </Dialog>
  )
})

Modal.displayName = "Modal"

export default Modal