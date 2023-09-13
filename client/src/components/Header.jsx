import React from 'react'
import { useState, useEffect } from "react"
import { useUserContext } from "../ctx/UserContext"
import { HiUserAdd, HiMail, HiUserCircle } from 'react-icons/hi'
import { FaUserFriends} from 'react-icons/fa'
import { RxBell } from 'react-icons/rx'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Header() {
  const { currUser, logout } = useUserContext()

  useEffect(() => {
    getNotifications()
  }, [])

  function getNotifications() {
    try {
      fetch(`/api/user/username/${usernameParam}`)
      .then(res => {return res.json()})
      .then(data => {
        setUser(data.payload[0])
        getPosts(data.payload[0]._id)
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  let toastMessages = ['This is a message', 'Second Message']
  
  const showToast = () => {
    toastMessages.map((message) => {
      toast(message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: 'light',
        hideProgressBar: true,
        autoClose: false,
        // autoClose: 3000, // Close after 3 seconds
      });
    })

    toastMessages = []
  };
  
  return (
    <header className="h-[70px] w-full bg-dark flex items-center justify-between px-4 md:fixed left-0 top-0 text-2xl" style={{zIndex: 2}}>
      <div className='flex gap-2 md:gap-7 items-center'>
        {/* <a href='/'>
          <FaUserFriends className='text-gray-200 text-4xl hover:text-gray-400' />
        </a>

        <h2 className="font-cursive" style={{color: `${currUser.data.userColor}`}}>Website Name</h2> */}

        <h1 className="font-cursive text-2xl text-center flex justify-center items-end select-none" style={{color: currUser.data.userColor}}>
          friends<FaUserFriends className='text-xs mb-1 text-gray-200 inline'/>db
        </h1>
      </div>
      
      <div>
        <button onClick={showToast} className='flex flex-col gap-1 items-center justify-end text-gray-200 hover:opacity-80'>
          <div className='relative'>
            <RxBell/>
            {toastMessages.length && (
              <p className='text-sm absolute -bottom-5 left-2 ' style={{color: currUser.data.userColor}}>{toastMessages.length}</p>
            )}
          </div>
          
          
          <ToastContainer style={{fontSize: '16px', textAlign: 'left'}}/>
        </button> 
      </div>
    

    </header>
  )
}




