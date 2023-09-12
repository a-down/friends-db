import { useState, useEffect } from "react"
import { useUserContext } from "../ctx/UserContext"
import { Header, Post, MakePost } from '../components'
import { HiMiniPencilSquare } from 'react-icons/hi2'
import { CodeBlock, CopyBlock } from "react-code-blocks";
import Aside from '../components/Aside'

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

      <Header/>

      <div className="flex">

        <Aside />

        <div className="md:mt-[70px] w-full md:ml-16">
          <MakePost />

            { posts &&
            (posts.map((post) => (
              <Post postData={post} key={post._id}/>
            )))
            }
            
        </div>
      </div>

    </>
  )
}
}