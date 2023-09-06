import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useUserContext } from "../ctx/UserContext"

const ChatPage = () => {







  const { currUser } = useUserContext()









  if( currUser.status === "searching" ) return <></>
  return (
    <>
      <h1>Chat Page</h1>
    </>
  )
}

export default ChatPage