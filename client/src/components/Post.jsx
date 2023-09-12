import { useState, useEffect, useRef } from 'react'
import { useUserContext } from "../ctx/UserContext"
import { HiOutlineHeart, HiHeart, HiChat, HiOutlineReply, HiOutlineTrash } from 'react-icons/hi'
import bitmoji from '../assets/bitmoji.png'
import Comment from './Comment'
import NewComment from './NewComment'
import { CodeBlock, CopyBlock } from "react-code-blocks";
import { motion } from "framer-motion"


export default function Post({ postData }) {
  // Access user context
  const { currUser, logout } = useUserContext();
  const defaultGray = '#d1d5db';

  // State for comments and icon color
  const [commentsState, setCommentsState] = useState(false);
  const [commentsIconColor, setCommentsIconColor] = useState(defaultGray);
  const [post, setPost] = useState(postData)

  // State to track whether the user has liked the post
  const [liked, setLiked] = useState(false);

  const reloadPost = async () => {
    fetch(`/api/post/${post._id}`)
    .then(res => {return res.json()})
    .then(data => {
      setPost(data.payload)
    })
  }

  const handleHeartClick = async () => {
    if (post.likes.includes(currUser.data._id)) {

      try {
        const response = await fetch(`api/post/unlike/${post._id}`, {
          method: 'PUT',
          body: JSON.stringify({id: currUser.data._id}),
          headers: {
            'Content-Type': 'application/json',
          },
      });

        if (!response.ok) {
          throw new Error('Heart click fetch failed');
        }
        
        reloadPost()
   
      } catch (error) {
        console.error('Error handling heart click:', error);
      }
    
    } else {

      try {
        const response = await fetch(`api/post/like/${post._id}`, {
          method: 'PUT',
          body: JSON.stringify({id: currUser.data._id}),
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Heart click fetch failed');
        }
        
        reloadPost()
     
      } catch (error) {
        console.error('Error handling heart click:', error);
      }

      try {
        const res = await fetch ('api/notification', {
          method: 'POST', 
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            message: `${currUser.data.username} has liked your post (${post.postText})`,
            user: post.user._id,
            read: false
          })
        })
      } catch (err) {
        console.log(err)
      }

    }
  
  };

  // Toggle comments section visibility
  function commentSectionHandler() {
    if (commentsState) {
      setCommentsState(false);
      setCommentsIconColor(defaultGray);
    } else if (!commentsState) {
      setCommentsState(true);
      setCommentsIconColor(post.user.userColor);
    }
  }

  // State for controlling width
  const [width, setWidth] = useState('20%');

  // Function to set full width
  function fullWidth() {
    setWidth('50%');
  }

  <motion.div
  initial={{ scale: 0 }}
  animate={{ rotate: 180, scale: 1 }}
  transition={{
    type: "spring",
    stiffness: 260,
    damping: 20
  }}
/>

  return (
    <div className="w-full md:w-[85%] lg:w-[70%] mx-auto flex flex-col justify-between item-stretch md:mb-20" style={{ backgroundColor: `${post.user.userColor}` }}>
      <div className="flex justify-around flex-wrap w-full py-6">
        {/* Code and image sections */}
        {post.codeString1 && (
          <div className="aspect-square overflow-scroll bg-white">
            <CodeBlock text={post.codeString1} showLineNumbers={true} />
          </div>
        )}
        {post.codeString2 && (
          <div className="aspect-square overflow-scroll bg-white">
            <CodeBlock text={post.codeString2} showLineNumbers={true} />
          </div>
        )}
        {post.imageString1 && (
          <img src={`${post.imageString1}`} style={{ width: '20%' }} alt="Image 1" />
        )}
        {post.imageString2 && (
          <img src={`${post.imageString2}`} style={{ width: '20%' }} alt="Image 2" />
        )}
      </div>
      <div>
        <div className="bg-zinc-600 flex gap-6 p-4 pb-0">
          <img src={bitmoji} className="rounded-full border-2 max-w-[50px] max-h-[50px]" style={{ border: `2px solid ${post.user.userColor}` }} alt="User avatar" />
          <div>
            <p className="font-bold" style={{ color: `${post.user.userColor}` }}>
              {post.user.username}
            </p>
            <p className="text-gray-200 text-sm">{post.postText}</p>
          </div>
        </div>
        <div className="bg-zinc-600 flex justify-end gap-4 p-4">
          {/* Heart icon with onClick */}

          <div onClick={handleHeartClick}>
            {post.likes.includes(currUser.data._id) ? (
            <motion.div
              initial={{ rotate: 180, scale: 0 }}
              animate={{ rotate: 360, scale: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20
              }}
            >
              <HiHeart
              className="text-2xl hover:opacity-80"
              style={{ cursor: 'pointer' , color: post.user.userColor}}
              />
            </motion.div>
              
            ) : (
              <HiOutlineHeart
                className="text-2xl text-gray-300 hover:opacity-80"
                style={{ cursor: 'pointer' }}
              />
            )}

            <p className="text-center py-2 select-none" style={{ color: post.user.userColor}}>
              {post.likes.length}
            </p>
          </div>

          {/* Comment icon with onClick */}
          <div>
            <HiChat
              className="text-2xl hover:opacity-80"
              style={{
                color: `${commentsIconColor}`,
                cursor: 'pointer',
              }}
              onClick={commentSectionHandler}
            />
            <p className="text-center py-2 select-none" style={{ color: `${post.user.userColor}` }}>
              {post.comments.length}
            </p>
          </div>
          {/* Reply icon */}
          <div>
            <HiOutlineReply className="text-2xl text-gray-300 hover:opacity-80" style={{ cursor: 'pointer' }} />
          </div>
        </div>
        {/* Comments section */}
        {commentsState && (
          <div>
            <div className='bg-[#484848] px-8 py-6'>

              {post.comments?.map((comment) => (
                <Comment comment={comment} reloadPost={reloadPost} post={post} reloadPost={reloadPost}/>
              ))}

              <NewComment currUser={currUser} post={post} reloadPost={reloadPost}/>
            </div>

            <div className='w-full h-6 bg-dark-gray'></div>
          </div>
        )}
      </div>
    </div>
  );
}