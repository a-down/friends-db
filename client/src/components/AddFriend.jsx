import Header from './Header'
import Aside from './Aside'
import { useUserContext } from '../ctx/UserContext'
import { useState, useEffect } from 'react'


export default function AddFriend() {
  const { currUser } = useUserContext()
  const [username, setUsername] = useState('')
  const [apiUrl, setApiUrl] = useState(``)


  const [updateFormState, setUpdateFormState] = useState(false)
  const [updateFormData, setUpdateFormData] = useState()





  // // Define the API endpoint URL where you handle friend requests
  // const apiUrl2 = `/api/friend/add`;
  // // Define the data you want to send in the request body
  // const requestData = {
  //   friendUsername: friendUsername,
  //   currentUserID: currentUserID,
  // };
  // // Make the fetch POST request
  // fetch(apiUrl2, {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json', // Set the content type to JSON
  //   },
  //   body: JSON.stringify(requestData), // Convert the data to JSON format
  // })
  //   .then((response) => response.json()) // Parse the response JSON
  //   .then((data) => {
  //     // Handle the response from the server
  //     if (data.success) {
  //       // Friend was added successfully
  //       console.log('Friend added successfully.');
  //     } else {
  //       // Friend addition failed (handle the error as needed)
  //       console.error('Failed to add friend:', data.error);
  //     }
  //   })
  //   .catch((error) => {
  //     // Handle any network or fetch-related errors
  //     console.error('Error adding friend:', error);
  //   });








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
      console.log(data)
    } catch (error) {
      console.error(error);
    }
  }









  // useEffect(() => {
  //   search()
  // }, [apiUrl])



  // const search = async () => {
  //   try {

  //     const query = await fetch(apiUrl)
  //     const data = await query.json()
  //     console.log(data)
  //   } catch (error) {
  //     console.error(error);
  //   }

  // }

  // useEffect(() => {
  //   setApiUrl(`/api/friend/find/user?username=${username}`)
  //   console.log(username, apiUrl)
  // }, [username])






  // function getFriends2(e) {
  //   e.preventDefault();

  //   const apiUrl = `/api/friend/find/user?username=${username}`; 

  //   fetch(`/api/friend/user/${currUser.data.user}`)
  //     .then(res => { return res.json() })
  //     .then(data => {
  //       setUsername(data.payload)
  //     })
  //     console.log(username)
  // }

  if (currUser.status === 'searching') {
    return (
      <>
      </>
    )
  } else if (currUser.status === "notfound") {
    window.location.href = '/landing'
    return (
      <>
      </>
    )
  } else {

    return (
      <div className='bg-dark-gray h-screen'>
        <Header />

        <div className="flex">

          <Aside />

          <div className='md:ml-16 md:mt-[70px] w-full'>

            <div className=" bg-[#454545] flex justify-between gap-6 p-4 items-center">
              <img src={currUser.data.userImage} className=" rounded-full w-[96px] h-[96px]" style={{ border: `2px solid ${currUser.data.userColor}` }} />
              {/* <a href='' className='h-10 p-2 border border-dark text-dark rounded-lg hover:bg-dark-gray '>Edit Profile</a> */}
            </div>


            <div>
              {/* {updateFormState && ( */}



              <form>
                <input className='m-2 border' value={username} onChange={(e) => setUsername(e.target.value)}>
                </input>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }
}