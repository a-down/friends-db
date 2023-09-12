import {
  RxEnvelopeClosed,
  RxAvatar,
  RxPlusCircled
} from 'react-icons/rx'


export default function Aside() {
  

  return (
    <aside className="flex flex-col items-center w-16 pt-4 gap-4 border-r border-dark bg-dark-gray fixed top-[70px] h-screen text-3xl text-gray-300 ">
        <a href="/profile">
          <div className='flex flex-col gap-1 items-center hover:text-gray-400'>
            <RxAvatar />
            <p className='text-sm text-zinc-900'>Profile</p>
          </div>
        </a>

        <a href="/chats">
          <div className='flex flex-col gap-1 items-center hover:text-gray-400'>
            <RxEnvelopeClosed/>
            <p className='text-sm text-zinc-900'>Chats</p>
          </div>
        </a>

        <a href="/addfriend">
          <div className='flex flex-col gap-1 items-center hover:text-gray-400'>
            <RxPlusCircled/>
            <p className='text-sm text-center text-zinc-900'>Friend</p>
          </div>
        </a>

    </aside>
  )
}