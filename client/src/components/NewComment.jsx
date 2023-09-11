import { useUserContext } from "../ctx/UserContext";


export default function NewComment({ currUser }){
  // stateful variable to track the data in the input field
  // add value={} onChange={}
  // add a function when you click 'Comment Button' onClick={functionName}
  // fetch call to POST new comment inside of that function
    // commentText is in the form
    // user will be currUser.data._id

  return (
    <div className='w-full flex justify-between gap-4 mt-6'>
      <input className='w-full rounded-md bg-gray-200 py-1 px-2 text-sm'></input>
      <button className='py-1 px-2 rounded-md text-sm' style={{backgroundColor: `${post.user.userColor}`}}>Comment</button>
    </div>
  )
}