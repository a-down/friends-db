import { useState } from 'react'
import { HiOutlineTrash } from 'react-icons/hi'

export default function Comment({comment}) {
    const [text, setText] = useState('')
    console.log(comment)

return (
  <div>
    <div className=' text-sm text-gray-200 relative mb-3'>
      <p className='font-bold' style={{color: `${comment.user.userColor}`}}>{comment.user.username}</p>
      <p>{comment.commentText}</p>
      <a className='text-red-400 text-lg rounded-md  absolute right-0 font-bold top-0'>
        <HiOutlineTrash />
      </a>
    </div>
    
  </div>
)
}