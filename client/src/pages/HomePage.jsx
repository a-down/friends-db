import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useUserContext } from "../ctx/UserContext"
import { Header, Post } from '../components'

export default function HomePage() {
  const { currUser } = useUserContext()
  const [ posts, setPosts ] = useState(null)

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
    function getPosts() {
      fetch(`/api/post/friendsposts/${currUser.data._id}`)
      .then(res => {return res.json()})
      .then(data => {
        setPosts(data.friendsPayload)
      })
    }
    getPosts()


  return (
    <>

      <Header />

      { posts &&

      (posts.map((post) => (
        <Post post={post} key={post._id}/>
      )))

      }

    </>
  )
}
}