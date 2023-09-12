import { useState } from 'react'
import { useUserContext } from "../ctx/UserContext";


export default function NewComment({ post, reloadPost }){
  const { currUser } = useUserContext();
  const [commentText, setCommentText] = useState("");
  const handleCommentSubmit = async (e) => {
    e.preventDefault()
    //fetch call to POST comment
    try {
      const res = await fetch("/api/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          commentText: commentText,
          user: currUser.data._id,
          id: post._id
        })
      });
      const data = await res.json();
      console.log(data);
      setCommentText("");
      reloadPost()
    } catch (err) {
      console.error(err);
    }

    try {
      const res = await fetch ('api/notification', {
        method: 'POST', 
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: `${currUser.data.username} has commented on your post (${post.postText})`,
          user: post.user._id,
          read: false
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='w-full flex justify-between gap-4 mt-6'>
      <input
       className='w-full rounded-md bg-gray-200 py-1 px-2 text-sm'
      value={commentText}
      onChange={(e) => setCommentText(e.target.value)}></input>
      <button onClick={handleCommentSubmit}className='py-1 px-2 rounded-md text-sm' style={{backgroundColor: `${post.user.userColor}`}}>Comment</button>
    </div>
      )
  }
  
  
