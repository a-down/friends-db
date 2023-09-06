import { useState } from 'react'
import { HiOutlineHeart, HiHeart, HiChat, HiOutlineReply, HiOutlineTrash } from 'react-icons/hi'


export default function Post() {
  const userColor = '#bfdbfe'
  const defaultGray = '#d1d5db'

  const [ commentsState, setCommentsState ] = useState(false)
  const [ commentsIconColor, setCommentsIconColor ] = useState(defaultGray)

  function commentSectionHandler() {
    if (commentsState) {
      setCommentsState(false)
      setCommentsIconColor(defaultGray)
    } else if (!commentsState) {
      setCommentsState(true)
      setCommentsIconColor(userColor)
    }
    
  }

  return (
    <div className=" w-full flex flex-col item-stretch bg-blue-200">
      <swiper-container style={{aspectRatio: '16/9'}} slides-per-view='1'>
        <swipe-slide>
          <img src='https://placehold.co/20' className='h-full'/>
        </swipe-slide>
      </swiper-container>
      
      <div>
        <div className=" bg-dark-gray flex gap-6 p-4">
          <img src="https://placehold.co/50" className=" rounded-full border-2 border-blue-200 max-w-[50px] max-h-[50px]" />
          <p className="text-gray-200 text-sm">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        </div>

        <div className=" bg-dark-gray flex justify-end gap-4 p-4">

          {/* if post.upvotes does not include currUser._id, render outline heart */}
          <div>
            <HiOutlineHeart className=' text-2xl text-gray-300' />
            <p className='text-center text-blue-200'>16</p>
          </div>
          <div>
            <HiChat className=' text-2xl ' style={{color: `${commentsIconColor}`}} onClick={commentSectionHandler} />
            <p className='text-center text-blue-200'>4</p>
          </div>
          <div>
            <HiOutlineReply className=' text-2xl text-gray-300' />
          </div>
        </div>

        {commentsState && (
        <div>
          <div className='bg-[#484848] px-8 py-6'>
            <div className=' text-sm text-gray-200 relative mb-3'>
              <p className='font-bold text-blue-200'>a-down</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi nostrum nobis quaerat odit fugit voluptatum necessitatibus</p>
              <a className='text-red-400 text-lg rounded-md  absolute right-0 font-bold top-0'>
                <HiOutlineTrash />
              </a>
            </div>

            <div className=' text-sm text-gray-200 relative'>
              <p className='font-bold text-blue-200'>a-down</p>
              <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi nostrum nobis quaerat odit fugit voluptatum necessitatibus</p>
              <a className='text-red-400 text-lg rounded-md  absolute right-0 font-bold top-0'>
                <HiOutlineTrash />
              </a>
            </div>
          </div>

          <div className='w-full h-6 bg-dark-gray'></div>
        </div>
        )}

      </div>
    </div>
  )
}