import { useState } from 'react';
import { HiOutlineTrash } from 'react-icons/hi';

export default function Comment({ comment }) {
  // Added a state to track whether deletion is in progress
  const [deleting, setDeleting] = useState(false);

  // Function to handle comment deletion
  async function handleDelete() {
    try {
      // Sending a DELETE request to the server to delete the comment
      await fetch('/comments/' + comment.id, {
        method: 'DELETE',
      });

      // Set the 'deleting' state to true to show a "Deleting..." message
      setDeleting(true);
    } catch (err) {
      console.error(err);

      // Handle the error here, e.g., display an error message to the user
    }
  }

  return (
    <div>
      <div className='text-sm text-gray-200 relative mb-3'>
        <p className='font-bold' style={{ color: `${comment.user.userColor}` }}>
          {comment.user.username}
        </p>
        <p>{comment.commentText}</p>
        <a className='text-red-400 text-lg rounded-md absolute right-0 font-bold top-0'>
          <div>
            <button onClick={handleDelete}>
              <HiOutlineTrash />
            </button>
            {/* Conditional rendering to display "Deleting..." when 'deleting' state is true */}
            {deleting ? "Deleting..." : null}
            {/* You can add additional feedback here */}
          </div>
        </a>
      </div>
    </div>
  );
}
