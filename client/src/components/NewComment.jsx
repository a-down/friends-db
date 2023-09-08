import { useUserContext } from "../ctx/UserContext";


export default function NewComment({ currUser }){


  return (
    <div className='w-full flex justify-between gap-4 mt-6'>
      <input className='w-full rounded-md bg-gray-200 py-1 px-2 text-sm'></input>
      <button className='py-1 px-2 rounded-md text-sm' style={{backgroundColor: `${post.user.userColor}`}}>Comment</button>
    </div>
  )
}