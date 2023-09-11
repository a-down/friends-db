import { useUserContext } from "../ctx/UserContext";


export default function NewComment({ currUser }){
// stateful variable to track the data in the input field
//add value = () onChange = ()
// add a function when you click 'comment button' onClick=(functionName)
//fetch call to POST comment inside of that function
// commenttext is in the form
// user will be currUser.data._id
  const { currUser } = useUserContext();
  const [commentText, setCommentText] = useState("");
  const handleCommentSubmit = async () => {
    //fetch call to POST comment
    try {
      const res = await fetch("/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          text: commentText,
          user: currUser.data._id
        })
      });
      const data = await res.json();
      console.log(data);
      setCommentText("");
    } catch (err) {
      console.error(err);
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
  
  
