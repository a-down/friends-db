import { useState } from "react"
import { useUserContext } from "../ctx/UserContext"
import { HiUserAdd, HiMail, HiUserCircle } from 'react-icons/hi'
import { FaUserFriends} from 'react-icons/fa'

export default function Header() {
  const { currUser, logout } = useUserContext()

  return (
    <header className="h-[70px] w-full bg-dark flex justify-between items-center px-4">
      <FaUserFriends className='text-gray-200 text-4xl' />
     
      <div className=" flex gap-4 ">
        <HiUserAdd className='text-gray-300 text-4xl hover:opacity-80' />
        <HiMail className='text-gray-300 text-4xl hover:opacity-80' />

        <a href="/profile">
          <HiUserCircle className='text-gray-300 text-4xl hover:opacity-80' style={{color: `${currUser.userColor}`}} />
        </a>
      </div>
    </header>
  )
}