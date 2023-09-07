import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useUserContext } from "../ctx/UserContext"
import Button from 'react-bootstrap/Button';

const ChatPage = () => {
  const [ chats, setChats ] = useState([])






  const { currUser } = useUserContext()



  const fetchChats = async () => {
    const data = await fetch('/api/chat')
    const result = await data.json()
    console.log(result.payload)
    setChats(result.payload)
    
  }

  useEffect(() => {
    fetchChats()
  }, [])



  if (currUser.status === "searching") return <></>
  return (
    <div className="chat">
          <Button variant="primary">Primary</Button>

      <div>{chats.map((chat)=> (
        <div key={chat._id}>{chat.chatName}</div>
      ))}</div>
    </div>
  )
}

export default ChatPage