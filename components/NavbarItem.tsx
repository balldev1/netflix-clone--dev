import React from "react"

interface NavbarItemProps {
    label: string
}

// interface รูปแบบ type + React FC

const NavbarItem: React.FC<NavbarItemProps> = ({
    label
}) => {
  return (
    <div className='text-white cursor-pointer hover:text-gray-300 transition-none'>
      {label}
    </div>
  )
}

export default NavbarItem
