import { useState, useEffect } from 'react'
import { Header, Post, ProfileSettings, Aside, Alert, MakePost } from '../components'
import { useParams } from 'react-router-dom'
import { SiGithub } from 'react-icons/si'
import { useUserContext } from "../ctx/UserContext"


const Profile = () => {
  const emptyUser = {
    username: '',
    password: '',
    github: '',
    userBio: '',
    userColor: '',
    userImage: '',
    _id: ''
  }

  const {usernameParam} = useParams()
  const { currUser, logout } = useUserContext()
  const [ posts, setPosts] = useState()
  const [ user, setUser ] = useState(emptyUser)
  const [ currUserFriends, setCurrentUserFriends ] = useState([])

  const alertDefault = {type: '', message: ''}
  const [ followAlert, setFollowAlert ] = useState(alertDefault)

  useEffect(() => {
    if (currUser?.data?._id !== undefined) {
      let friends = []
      currUser.data.friends.map((friend) => {
        friends.push(friend._id)
      })
      setCurrentUserFriends(friends)
      getUser()
    }
  }, [currUser])

  function getUser() {
    try {
      fetch(`/api/user/username/${usernameParam}`)
      .then(res => {return res.json()})
      .then(data => {
        if (!data.payload.length) return (window.location.href = `/profile/${currUser.data.username}`)
        setUser(data.payload[0])
        getPosts(data.payload[0]._id)
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  function getPosts(id) {
    try {
      fetch(`/api/post/myposts/${id}`)
      .then(res => {return res.json()})
      .then(data => {
        setPosts(data.payload.reverse())
      })
    } catch (err) {
      throw new Error(err)
    }
  }

  function sendFollow() {
    try {
      fetch(`/api/friend/follow/${currUser.data._id}`, {
        method: 'PUT', 
        body: JSON.stringify({newFriend: `${user._id}`}),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {return res.json()})
      .then(data => {
        window.location.href = `/profile/${user.username}`
      })
    } catch (err) {
      setFollowAlert({type: 'error', message: 'Something went wrong. Please try again later.'})
      throw new Error(err)
    }

    // creates a notification for the friend that was followed
    try {
      fetch ('/api/notification', {
        method: 'POST', 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: `${currUser.data.username} has followed you!`,
          user: user._id,
          read: false
        })
      })
    } catch (err) {
      // no alert because a failed notification post is not critical
    }
  }

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
  }

  return (
    <div className='bg-dark-gray min-h-screen h-full'>

      <Header />

      <div className='flex'>
        <Aside />

        <div className='md:mt-[70px] w-full md:ml-16'>

          <div className=" bg-[#454545] flex justify-between gap-6 p-4 lg:px-10 items-center">
            <img src={user.userImage} className=" rounded-full w-[96px] h-[96px]" style={{border: `2px solid ${user.userColor}`}}/>

            {(currUser.data._id !== user._id) && (
              <div className='flex flex-col items-end'>
                {(currUserFriends.includes(`${user._id}`)) ? (
                  <button 
                    className='py-2 px-4 rounded-lg font-semibold '
                    style={{border: `2px solid ${user.userColor}`, color: user.userColor, cursor: 'auto'}}>
                    Following
                  </button>
                ) : (
                  <button 
                    className='py-2 px-4 rounded-lg font-semibold text-[#454545] hover:opacity-80'
                    style={{backgroundColor: user.userColor}}
                    onClick={sendFollow}>
                    Follow Friend
                  </button>
                )}
                
                {followAlert.type && (
                  <div className='w-[132px] top-40 absolute'>
                    <Alert type={followAlert.type} message={followAlert.message} />
                  </div>
                )}
              </div>
            )}
          
          </div>

          <div className='w-full bg-[#454545] px-4 lg:px-10 py-2 flex flex-col gap-8 pb-8'>
            <div>
              <p className='font-bold text-xl' style={{color: user.userColor}}>{user.username}</p>
              <p className='text-gray-400'>{user.userBio}</p>
            </div>

            <div className='flex flex-col gap-4 max-w-[600px]'>

              {user.github && (
                <a href={user.github} target='_blank' className=' flex w-fit items-center gap-2 py-1 px-2 bg-dark-gray rounded-md hover:opacity-80 ' style={{color: user.userColor}}>
                    <SiGithub /> {user.github}
                </a>
              )}
              
              {user._id === currUser.data._id && (
                <ProfileSettings/>
              )}

            </div>
          
          </div>

          <div className="mt-6">
            {user._id === currUser.data._id && (
              <MakePost />
            )}

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

export default Profile