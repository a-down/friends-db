import { useState, useEffect } from "react"
import { useUserContext } from "../ctx/UserContext"
import { Header, Post, MakePost, Aside } from '../components'


export default function HomePage() {
  const { currUser } = useUserContext()
  const [ posts, setPosts ] = useState(null)

   // get all friend posts when user is fetched
  useEffect(() => {
    if (currUser?.data?._id !== undefined) {
      getPosts()
    }
  }, [currUser])

  function getPosts() {
    fetch(`/api/post/friendsposts/${currUser.data._id}`)
    .then(res => {return res.json()})
    .then(data => {
      setPosts(data.friendsPayload.reverse())
    })
  }

  // verify user is logged in
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
    <div className="bg-dark-gray h-full min-h-screen">
      <Header/>
      <div className="flex">
        <Aside />

        <div className="md:mt-[70px] w-full md:ml-16 mb-20">
          <MakePost />

          {posts &&
            (posts.map((post) => (
              <Post postData={post} key={post._id}/>
            )))
          }
        </div>
      </div>

    </div>
  )
}
}