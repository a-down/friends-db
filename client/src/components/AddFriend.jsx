import Header from './Header'
import Aside from './Aside'
import { useUserContext } from '../ctx/UserContext'
import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';

export default function AddFriend() {

  const { currUser } = useUserContext();
  const [username, setUsername] = useState('');
  const [apiUrl, setApiUrl] = useState('')
  const [foundUsers, setFoundUsers] = useState(null)
  const Navigate = useNavigate();
  const location = useLocation();
  console.log(currUser)

  useEffect(() => {
    setApiUrl(`/api/friend/find/user?username=${username}`)
  }, [username])

  useEffect(() => {
    search();
    console.log(apiUrl, username)
  }, [apiUrl])

  const search = async () => {
    try {
      const query = await fetch(apiUrl)
      const data = await query.json()
      setFoundUsers(data.payload)
      console.log(foundUsers)
    } catch (error) {
      console.error(error);
    }
  }

  // Extract the username from the URL query parameter

  const [updateFormState, setUpdateFormState] = useState(false)
  const [updateFormData, setUpdateFormData] = useState()


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
    const url = `/api/friend/find`;
    // Define the data you want to send in the request body
    const requestData = {
      friendUsername: username,
      currentUserID: currUser.data.user,
    };
    // Make the fetch POST request
    fetch(url, {
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
          <div className='md:ml-16 md:mt-[70px] w-full min-h-screen flex flex-col'>
            
            <div className='bg-[#484848] mb-10'>
              <div className=' p-4 md:w-[85%] lg:w-[70%] mx-auto'>
                <h2 className=' text-xl text-gray-100 font-bold mb-4' >Search for friends</h2>

                <form onSubmit={addFriend}>
                  <input
                    className='py-1 px-2 w-full rounded-sm bg-gray-100'
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Search for friends by username"
                  />
                  {/* <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Add Friend
                  </button> */}
                </form>

                {(foundUsers && username)  && foundUsers.map((user) => (
                <a href={`/profile/${user.username}`}>
                  <div 
                    key={user.username}
                    className='p-2 my-4 w-full rounded-lg flex gap-4 items-center font-sans'
                    style={{backgroundColor: user.userColor}}
                    >

                    <img src={user.userImage} className='max-h-12 rounded-full'/>
                    <p className='text-gray-800 text-lg'>{user.username}</p>
                    
                  </div>
                </a>
                ))}
              </div>
            </div>

            <div className=' p-4 w-full md:w-[85%] lg:w-[70%] mx-auto'>

              <h2 className=' text-xl font-bold' style={{color: currUser.data.userColor}}>Your Friends</h2>

              {(currUser.status === 'found') && currUser.data.friends.map((user) => (
              <a href={`/profile/${user.username}`}>
                <div 
                  key={user.username}
                  className='p-2 my-4 w-full rounded-lg flex gap-4 items-center font-sans bg-[#484848]'
                  style={{border: `2px solid ${user.userColor}`}}
                  >

                  <img src={user.userImage} className='max-h-12 rounded-full'/>
                  <p className='text-lg' style={{color: user.userColor}}>{user.username}</p>
                  
                </div>
              </a>
              ))}

            </div>

          </div>
        </div>
      </div>
    );
  }
}