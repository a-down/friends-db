import React from 'react'
import { useState } from "react"
import { useUserContext } from "../ctx/UserContext"
import { HiUserAdd, HiMail, HiUserCircle } from 'react-icons/hi'
import { FaUserFriends} from 'react-icons/fa'
import { RxBell } from 'react-icons/rx'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Header() {
  const { currUser, logout } = useUserContext()
  const showToast = () => {
    toast.success('This is a success message!', {
      position: toast.POSITION.TOP_CENTER,
      autoClose: 3000, // Close after 3 seconds
    });
  
  };
  
  return (
    <header className="h-[70px] w-full bg-dark flex items-center px-4 fixed left-0 top-0 gap-7 text-2xl" style={{zIndex: 1}}>
      <a href='/'>
        <FaUserFriends className='text-gray-200 text-4xl hover:text-gray-400' />
      </a>

      <h2 className="font-cursive" style={{color: `${currUser.data.userColor}`}}>Website Name</h2>

    <div>
        <button onClick={showToast} className='flex flex-col gap-1 items-center text-gray-200 hover:text-gray-400'>
          <RxBell/>
          <p className='text-sm text-center text-grey-200'>Notifications</p>
          <ToastContainer /> {/* This is where the notifications will be rendered */}
        </button> 
    </div>
    

    </header>
  )
}




   




