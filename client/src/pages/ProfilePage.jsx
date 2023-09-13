import { useState, useEffect } from 'react'
import { Header, Post, ProfileSettings } from '../components'
import MakePost from '../components/MakePost'
import { HiCog } from 'react-icons/hi'
import { SiGithub } from 'react-icons/si'
import bitmoji from '../assets/bitmoji.png'
import { useUserContext } from "../ctx/UserContext"
import Aside from '../components/Aside'

const Profile = () => {
  const { currUser, logout } = useUserContext()
  const [ posts, setPosts] = useState()

  console.log(currUser.data)

  function getPosts() {
    try {
      fetch(`/api/post/myposts/${currUser.data._id}`)
      .then(res => {return res.json()})
      .then(data => {
        setPosts(data.payload.reverse())
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  useEffect(() => {
    if (currUser?.data?._id !== undefined) {
      getPosts()
    }
  }, [currUser])

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
    <div className='bg-dark-gray min-h-screen h-full'>

      <Header />

      <div className='flex'>
        <Aside />

        <div className='md:mt-[70px] w-full md:ml-16'>

          <div className=" bg-[#454545] flex justify-between gap-6 p-4 items-center">
            <img src={currUser.data.userImage} className=" rounded-full w-[96px] h-[96px]" style={{border: `2px solid ${currUser.data.userColor}`}}/>
            {/* <a href='' className='h-10 p-2 border border-dark text-dark rounded-lg hover:bg-dark-gray '>Edit Profile</a> */}
            <button onClick={logout} className='text-red-800 py-1 px-2 bg-red-400 rounded-md hover:opacity-80'>Log Out</button>
          </div>

          <div className='w-full bg-[#454545] px-4 py-2 flex flex-col gap-8 pb-8'>
            <div>
              <p className='font-bold text-xl' style={{color: `${currUser.data.userColor}`}}>{currUser.data.username}</p>
              <p className='text-gray-400'>{currUser.data.userBio}</p>
            </div>

            <div className='flex flex-col gap-4 max-w-[600px]'>

              {currUser.data.github && (
                <a href={currUser.data.github} target='_blank' className=' flex w-fit items-center gap-2 py-1 px-2 bg-dark-gray rounded-md hover:opacity-80 ' style={{color: `${currUser.data.userColor}`}}>
                    <SiGithub /> {currUser.data.github}
                </a>
              )}
              
              
              <ProfileSettings/>
            </div>
          
          </div>

          <div className="mt-6">
            <MakePost />

            {posts &&
            (posts.map((post) => (
              <Post postData={post} key={post._id}/>
            )))
            }
              
          </div>

        </div>

      </div>
        
    </div>
  )
  }
}

export default Profile