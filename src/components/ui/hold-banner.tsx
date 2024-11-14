import { AlertTriangle } from 'lucide-react'
import React from 'react'

interface RegistrationHoldBannerProps {
  subheading?: string;
  onClick: () => void;
}

export default function Component({ subheading = "Academic Advising", onClick }: RegistrationHoldBannerProps) {
  return (
    <>
      <div 
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        className="fixed top-0 left-0 right-0 z-50 w-full bg-red-600 text-white py-3 px-4 text-center shadow-md hover:bg-red-700 transition-colors duration-200 cursor-pointer select-none dyslexia-font"
      >
        <AlertTriangle style={{position:'fixed', left:'24px', top:'24px'}} className="fixed w-6 h-6 mr-0" />
        <h2 className="text-lg font-bold mb-1">REGISTRATION HOLD!</h2>
        <AlertTriangle style={{position:'fixed', right:'24px', top:'24px'}} className="fixed w-6 h-6 mr-0" />
        {subheading && <p className="text-sm font-medium">{subheading}</p>}
      </div>
    </>
  )
}