import { FaHome, FaEnvelope, FaUserFriends, FaPowerOff } from 'react-icons/fa'
import { useUserContext } from '../ctx/UserContext'


export default function Aside() {
  const { currUser, logout } = useUserContext()
  

  return (
    <aside className="flex items-center justify-around pt-4 gap-4 border-r border-dark bg-dark-gray fixed bottom-0 w-full text-3xl text-gray-300 py-2 md:top-[70px] md:w-16 md:flex-col md:justify-start" style={{zIndex: 1}}> 

        <a href={`/profile/${currUser.data.username}`}>
          <div className='flex flex-col gap-1 items-center hover:text-gray-400'>
            <img src={currUser.data.userImage} className='w-8 rounded-full hover:opacity-80 ' style={{border: `1px solid ${currUser.data.userColor}`}}/>
            <p className='text-sm text-gray-400'>Profile</p>
          </div>
        </a>

        <a href="/">
          <div className='flex flex-col gap-1 items-center hover:text-gray-400'>
            <FaHome/>
            <p className='text-sm text-gray-400'>Home</p>
          </div>
        </a>

        {/* <a href="/chats">
          <div className='flex flex-col gap-1 items-center hover:text-gray-400'>
            <FaEnvelope/>
            <p className='text-sm text-zinc-900'>Chats</p>
          </div>
        </a> */}

        <a href="/addfriend">
          <div className='flex flex-col gap-1 items-center hover:text-gray-400'>
            <FaUserFriends />
            <p className='text-sm text-center text-gray-400'>Friends</p>
          </div>
        </a>
  
        <div className='h-full flex md:items-end' onClick={logout}>
          {/* <button onClick={logout} className='text-red-800 text-xs py-1 px-1 md:mx-auto bg-red-400 rounded-sm hover:opacity-80 mb-6'>Log Out</button> */}
          <div className='flex flex-col gap-1 items-center text-red-400 hover:opacity-80' style={{cursor: 'pointer'}}>
            <FaPowerOff />
            <p className='text-sm text-center text-gray-400'>Log Out</p>
          </div>
        </div>

    </aside>
  )
}