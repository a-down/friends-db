import React from 'react'
import { useState, useEffect } from "react"
import { useUserContext } from "../ctx/UserContext"
import { HiUserAdd, HiMail, HiUserCircle } from 'react-icons/hi'
import { FaDiceFive, FaUserFriends} from 'react-icons/fa'
import { RxBell } from 'react-icons/rx'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



export default function Header() {
  const { currUser, logout } = useUserContext()
  const [ toastMessages, setToastMessages ] = useState([])

  useEffect(() => {
    getNotifications()
  }, [])

  function getNotifications() {
    try {
      fetch(`/api/notification/${currUser.data._id}`)
      .then(res => {return res.json()})
      .then(data => {
        let messages = []
        data.notifications.map((notification) => {
          messages.push(notification)
        })
        setToastMessages(data.notifications)
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  function deleteNotifications(messagesArr) {
    try {
      fetch(`/api/notification`, {
        method: 'PUT', 
        body: JSON.stringify(messagesArr),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {return res.json()})
      .then(data => {
        
      })
    } catch (err) {
      throw new Error(err)
    }
  }
  
  const showToast = () => {
    console.log(toastMessages)
    toastMessages.map((message) => {
      toast(message.message, {
        position: toast.POSITION.TOP_RIGHT,
        theme: 'light',
        hideProgressBar: true,
        autoClose: false,
        // autoClose: 3000, // Close after 3 seconds
      });
    })
    console.log(toastMessages)
    deleteNotifications(toastMessages)
    setToastMessages([])
  };
  
  return (
    <header className="h-[70px] w-full bg-dark flex items-center justify-between px-4 md:fixed left-0 top-0 text-2xl" style={{zIndex: 2}}>
      <div className='flex gap-2 md:gap-7 items-center'>

        <h1 className="font-cursive text-2xl text-center flex justify-center items-end select-none" style={{color: currUser.data.userColor}}>
          friends<FaUserFriends className='text-xs mb-1 text-gray-200 inline'/>db
        </h1>
      </div>
      
      <div>
        <div onClick={showToast} className='flex flex-col gap-1 items-center justify-end text-gray-200 hover:opacity-80'>
          <div className='relative'>
            <RxBell/>
            {toastMessages && (
              <p className='text-sm text-center w-6 absolute -bottom-5 ' style={{color: currUser.data.userColor}}>{toastMessages.length}</p>
            )}
          </div>
          
          
          <ToastContainer style={{fontSize: '16px', textAlign: 'left', zIndex: 3}}/>
        </div> 
      </div>
    

    </header>
  )
}




