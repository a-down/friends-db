import { HiOutlineHeart, HiHeart, HiChat, HiOutlineReply } from 'react-icons/hi'


export default function Post() {


  return (
    <div className=" w-full flex flex-col item-stretch bg-red-400">
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

          <HiOutlineHeart className=' text-2xl text-gray-300' />
          <HiChat className=' text-2xl text-gray-300' />
          <HiOutlineReply className=' text-2xl text-gray-300' />
        </div>
      </div>
    </div>
  )
}