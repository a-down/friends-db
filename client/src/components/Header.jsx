import { useState } from "react"
import { useUserContext } from "../ctx/UserContext"
import { HiUsers, HiUserAdd, HiMail, HiUserCircle } from 'react-icons/hi'

export default function Header() {
  const { currUser, logout } = useUserContext()

  return (
    <header className="h-[70px] w-full bg-dark flex justify-between items-center px-4">
      <HiUsers className='text-accent text-4xl' />

      <div className=" flex gap-4">
        <HiUserAdd className='text-accent text-3xl' />
        <HiMail className='text-accent text-3xl' />
        <HiUserCircle className='text-accent text-3xl' />
      </div>
    </header>
  )
}