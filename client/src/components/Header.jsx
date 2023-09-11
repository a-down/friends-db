import { useState } from "react"
import { useUserContext } from "../ctx/UserContext"
import { HiUserAdd, HiMail, HiUserCircle } from 'react-icons/hi'
import { FaUserFriends} from 'react-icons/fa'

export default function Header() {
  const { currUser, logout } = useUserContext()

  return (
    <header className="h-[70px] w-full bg-dark flex items-center px-4 fixed left-0 top-0 gap-7 text-2xl">
      <a href='/'>
        <FaUserFriends className='text-gray-200 text-4xl hover:text-gray-400' />
      </a>

      <h2 className="font-cursive" style={{color: `${currUser.data.userColor}`}}>Website Name</h2>

    </header>
  )
}