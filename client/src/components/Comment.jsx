import { useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';
import { useUserContext } from '../ctx/UserContext'

export default function Comment({ comment, post, reloadPost }) {
  const { currUser } = useUserContext()

  // Function to handle comment deletion
  async function handleDelete() {
    try {
      // Sending a DELETE request to the server to delete the comment
      await fetch(`api/comment/${post._id}/${comment._id}`, {
        method: 'DELETE',
      });

      // Set the 'deleting' state to true to show a "Deleting..." message
      reloadPost()
    } catch (err) {
      console.error(err);

      // Handle the error here, e.g., display an error message to the user
    }
  }

  return (
    <div>
      <div className='text-sm text-gray-200 relative mb-3' style={{zIndex: '0'}}>
        <p className='font-bold' style={{ color: `${comment.user.userColor}` }}>
          {comment.user.username}
        </p>
        <p>{comment.commentText}</p>
        <a className='text-red-400 text-lg rounded-md absolute right-0 font-bold top-0'>
          <div>
            
            {comment.user._id === currUser.data._id ? (
              <button onClick={handleDelete}>
                <HiOutlineTrash />
              </button>
            ) : null}

          </div>
        </a>
      </div>
    </div>
  );
}
