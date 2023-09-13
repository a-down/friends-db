import Header from './Header'
import Aside from './Aside'
import { useUserContext } from '../ctx/UserContext'
import { useState, useEffect } from 'react'


export default function AddFriend() {
  const { currUser } = useUserContext()
  const [apiUrl, setApiUrl] = useState('')
  const [username, setUsername] = useState('')

  const [updateFormState, setUpdateFormState] = useState(false)
  const [updateFormData, setUpdateFormData] = useState()

  // useEffect(() => {
  //   setApiUrl(`http://localhost:6500/api/friend/find/user?username=${username}`)

  //   // fetch(apiUrl, {

  //   // })

  // }, [username])

  function getFriends(e) {
    e.preventDefault();

    const apiUrl = `/api/friend/find/user?=username=${username}`; 

    fetch(`/api/friend/user/${currUser.data.user}`)
      .then(res => { return res.json() })
      .then(data => {
        setUsername(data.payload)
      })
      console.log(username)
  }

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