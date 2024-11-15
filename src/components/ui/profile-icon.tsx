import { useState } from 'react'

interface ProfileIconProps {
  size?: number
  color?: string
  onClick?: () => void
}

export default function ProfileIcon({ size = 100, color = '#6B7280', onClick }: ProfileIconProps = {}) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
    >
      <circle
        cx="12"
        cy="12"
        r="11.5"
        fill={isHovered ? '#E5E7EB' : 'white'}
        stroke={color}
      />
      <circle cx="12" cy="8" r="5" stroke={color} fill={isHovered ? '#E5E7EB' : 'white'} />
      <path
        d="M4 19.2C5.5 15.4 8.5 13 12 13C15.5 13 18.5 15.4 20 19.2"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}