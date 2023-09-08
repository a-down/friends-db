import { useState } from 'react'
import { Header, Post } from '../components'
import { HiCog } from 'react-icons/hi'
import { SiGithub } from 'react-icons/si'
import bitmoji from '../assets/bitmoji.png'
import { useUserContext } from "../ctx/UserContext"

const Profile = () => {
  const { currUser, logout } = useUserContext()

  console.log(currUser.data)

  if ( currUser.status === 'searching') {
    return (
      <>
      </>
    )
  } else if ( currUser.status === "notfound" ) {
    window.location.href = '/landing'
    return ( 
      <>
      </>
    )
  } else {

  return (
    <div className='bg-dark-gray h-screen'>

      <Header />

      <div className=" bg-[#454545] flex justify-between gap-6 p-4 items-center">
        <img src={currUser.data.userImage} className=" rounded-full w-[96px] h-[96px]" style={{border: `2px solid ${currUser.data.userColor}`}}/>
        {/* <a href='' className='h-10 p-2 border border-dark text-dark rounded-lg hover:bg-dark-gray '>Edit Profile</a> */}
      </div>

      <div className='w-full bg-[#454545] px-4 py-2 mb-20 pb-8'>
        <p className='font-bold text-xl' style={{color: `${currUser.data.userColor}`}}>{currUser.data.username}</p>
        <p className='text-gray-400'>{currUser.data.bio}</p>
          
        <div className='flex justify-between'>
          <a href='' className=' flex w-fit items-center gap-2 py-1 px-2 bg-dark-gray rounded-md mt-10 hover:opacity-80 ' style={{color: `${currUser.data.userColor}`}}>
            <SiGithub /> /a-down/group-project-03
          </a>

          <a href='' className=' flex w-fit items-center gap-2 py-1 px-2 bg-dark-gray rounded-md mt-10 hover:opacity-80' style={{color: `${currUser.data.userColor}`}}>Edit Profile
          </a>
        </div>
      </div>

      <button onClick={logout}>Log Out</button>

    </div>
  )
  }
}

export default Profile