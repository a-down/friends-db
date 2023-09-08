import { useState, useEffect } from "react"
import { useUserContext } from "../ctx/UserContext"
import { Header, Post } from '../components'
import { HiMiniPencilSquare } from 'react-icons/hi2'
import * as Dialog from '@radix-ui/react-dialog';

export default function HomePage() {
  const { currUser } = useUserContext()
  const [ posts, setPosts ] = useState(null)

  function getPosts() {
    fetch(`/api/post/friendsposts/${currUser.data._id}`)
    .then(res => {return res.json()})
    .then(data => {
      setPosts(data.friendsPayload)
    })
  }
  
  useEffect(() => {
    if (currUser?.data?._id !== undefined) {
      getPosts()
    }

    // if (currUser?.data?.requests !== []) {
    //   // render friend request alert

    //     requests: [{
    //       requestingUser: '',
    //       requestingUserId: '',
    //     }]
    // }

  }, [currUser])

  if ( currUser.status === 'searching') {
    console.log('notfound')
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
    <>

      <Header />

      <div className="bg-dark-gray p-4" >
        <Dialog.Root >
          <Dialog.Trigger asChild>
            <div className='py-1 px-2 rounded-md flex gap-2 items-center ' style={{backgroundColor: `${currUser.data.userColor}`, cursor: 'pointer'}}>
              <HiMiniPencilSquare />
              <p >
                Make a Post
              </p>
            </div>
          </Dialog.Trigger>
          <Dialog.Portal>
            
          </Dialog.Portal>
        </Dialog.Root>
      </div>

      { posts &&

      (posts.map((post) => (
        <Post post={post} key={post._id}/>
      )))

      }

    </>
  )
}
}