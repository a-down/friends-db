import { useState, useEffect, useRef } from 'react'
import { useUserContext } from "../ctx/UserContext"
import { HiOutlineHeart, HiHeart, HiChat, HiOutlineReply, HiOutlineTrash } from 'react-icons/hi'
import bitmoji from '../assets/bitmoji.png'
import Comment from './Comment'
import NewComment from './NewComment'
import { CodeBlock, CopyBlock } from "react-code-blocks";


export default function Post({ post }) {
  const { currUser, logout } = useUserContext()
  console.log(currUser)
  const defaultGray = '#d1d5db'

  const [ commentsState, setCommentsState ] = useState(false)
  const [ commentsIconColor, setCommentsIconColor ] = useState(defaultGray)

  function commentSectionHandler() {
    if (commentsState) {
      setCommentsState(false)
      setCommentsIconColor(defaultGray)
    } else if (!commentsState) {
      setCommentsState(true)
      setCommentsIconColor(post.user.userColor)
    }
  }

  const [ width, setWidth ] = useState('20%')

  function fullWidth() {
    setWidth('50%')
  }

  return (
    <div className=" w-full flex flex-col justify-between item-stretch" style={{backgroundColor: `${post.user.userColor}`}}>
      <div className='flex justify-around flex-wrap w-full py-6'>

        {post.codeString1 && (
          <div className=' aspect-square overflow-scroll bg-white'>
            <CodeBlock
                text={post.codeString1}
                showLineNumbers={true}
                />
          </div>
        )}
        
        {post.codeString2 && (
          <div className=' aspect-square overflow-scroll bg-white'>
            <CodeBlock
                text={post.codeString2}
                showLineNumbers={true}
                />
          </div>
        )}
        
        {post.imageString1 && (
          <img src={`${post.imageString1}`} style={{width: '20%'}}/>
        )}
        
        {post.imageString2 && (
          <img src={`${post.imageString2}`} style={{width: '20%'}}/>
        )}
        
      </div>
      
      <div>
        <div className=" bg-zinc-600 flex gap-6 p-4 pb-0">
          <img src={bitmoji} className=" rounded-full border-2 max-w-[50px] max-h-[50px]" style={{border: `2px solid ${post.user.userColor}`}}/>
          <div>
            <p className='font-bold' style={{color: `${post.user.userColor}`}}>{post.user.username}</p>
            <p className="text-gray-200 text-sm">{post.postText} </p>
          </div>
        </div>

        <div className=" bg-zinc-600 flex justify-end gap-4 p-4">
          {/* if post.upvotes does not include currUser._id, render outline heart */}
          <div>
            <HiOutlineHeart 
              className=' text-2xl text-gray-300 hover:opacity-80'
              style={{cursor: 'pointer'}} />
            <p className='text-center py-2' style={{color: `${post.user.userColor}`}}>16</p>
          </div>

          <div>
            <HiChat 
              className=' text-2xl hover:opacity-80' 
              style={
                {color: `${commentsIconColor}`, 
                cursor: 'pointer'}} 
              onClick={commentSectionHandler} />
            <p className='text-center py-2' style={{color: `${post.user.userColor}`}}>4</p>
          </div>

          <div>
            <HiOutlineReply 
              className=' text-2xl text-gray-300 hover:opacity-80'
              style={{cursor: 'pointer'}} />
          </div>
        </div>

        {commentsState && (
        <div>
          <div className='bg-[#484848] px-8 py-6'>

            {post.comments.map((comment) => (
              <Comment comment={comment}/>
            ))}
            
            <NewComment postColor={post.user.userColor} postId={post._id}/>
          </div>

          <div className='w-full h-6 bg-dark-gray'></div>
          </div>
        )}

      </div>
    </div>
  )
}