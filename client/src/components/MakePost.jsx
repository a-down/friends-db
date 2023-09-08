import { useState, useEffect } from 'react'
import { useUserContext } from "../ctx/UserContext"
import { CodeBlock, CopyBlock } from "react-code-blocks";
import { HiMiniPencilSquare } from 'react-icons/hi2'

export default function MakePost() {
  const { currUser } = useUserContext()
  const [ writeFormState, setWriteFormState ] = useState(false)

  function formHandler() {
    if (commentsState) {
      setCommentsState(false)
      setCommentsIconColor(defaultGray)
    } else if (!commentsState) {
      setCommentsState(true)
      setCommentsIconColor(post.user.userColor)
    }
  }


  return (
    <div className="bg-dark-gray p-4" >
      <div className='py-1 px-2 rounded-md flex gap-2 items-center ' style={{backgroundColor: `${currUser.data.userColor}`, cursor: 'pointer'}}>
        <HiMiniPencilSquare />
        <p >
          Make a Post
        </p>
      </div>

      {writeFormState && (
        <div>
          <form className="w-full bg-gray border-2 border-gray-100 shadow-md mx-auto my-4 rounded-md p-4 flex flex-col gap-6">
            <textarea
              className="rounded-sm bg-gray-100 py-1 px-2 h-[100px]"
              placeholder='Post description'></textarea>
  
            <button className="w-full text-center text-sm h-8 rounded-md hover:opacity-80 text-black" style={{backgroundColor: `${currUser.data.userColor}`}}>POST</button>
          </form>
        </div>
      )}
    
    </div>
  )
}