import Header from './Header'
import Aside from './Aside'
import { useUserContext } from '../ctx/UserContext'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

export default function AddFriend() {
  const { currUser } = useUserContext();
  const [username, setUsername] = useState('');
  const Navigate = useNavigate();
  const location = useLocation();

  // Extract the username from the URL query parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const usernameParam = params.get('username');
    if (usernameParam) {
      setUsername(usernameParam);
    }
  }, [location.search]);

  function addFriend(e) {
    e.preventDefault();
    // Define the API endpoint URL where you handle friend requests
    const apiUrl = `/api/friend/find`;
    // Define the data you want to send in the request body
    const requestData = {
      friendUsername: username,
      currentUserID: currUser.data.user,
    };
    // Make the fetch POST request
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', 
      },
      body: JSON.stringify(requestData), 
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the server
        if (data.success) {
       
          console.log('Friend added successfully.');
        } else {
          // Friend addition failed (handle the error as needed)
          console.error('Failed to add friend:', data.error);
        }
      })
      .catch((error) => {
        // Handle any network or fetch-related errors
        console.error('Error adding friend:', error);
      });

    // Update the URL with the username as a query parameter
    Navigate(`/profile/${username}`);
  }

  if (currUser.status === 'searching') {
    return null; // or return a loading indicator
  } else if (currUser.status === 'notfound') {
    // Redirect to the landing page if the user is not found
    Navigate('/landing');
    return null;
  } else {
    return (
      <div className='bg-dark-gray h-screen'>
        <Header />
        <div className="flex">
          <Aside />
          <div className='md:ml-16 md:mt-[70px] w-full'>
            <div className="bg-[#454545] flex justify-between gap-6 p-4 items-center">
              <img
                src={currUser.data.userImage}
                className="rounded-full w-[96px] h-[96px]"
                style={{ border: `2px solid ${currUser.data.userColor}` }}
              />
            </div>
            <div>
              <form onSubmit={addFriend}>
                <input
                  className='m-2 border'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter friend's username"
                />
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Add Friend
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}