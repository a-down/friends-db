import Header from './Header'
import Aside from './Aside'
import { useUserContext } from '../ctx/UserContext'
import { useState, useEffect } from 'react'


export default function AddFriend() {
  const { currUser } = useUserContext()
  const [ apiUrl, setApiUrl ] = useState('')
  const [ username, setUsername ] = useState('')

  const [updateFormState, setUpdateFormState] = useState(false)
  const [updateFormData, setUpdateFormData] = useState()

  // useEffect(() => {
  //   setApiUrl(`http://localhost:6500/api/friend/find/user?username=${username}`)
    
  //   // fetch(apiUrl, {

  //   // })

  // }, [username])

  function getFriends() {
    fetch(`/api/friend/user/${currUser.data.user}`)
    .then(res => {return res.json()})
    .then(data => {
      setUsername(data.payload)
    })
  }

  if ( currUser.status === 'searching') {
    return (
      <>
      </>
    )
  } else if ( currUser.status === "notfound" ) {
    window.location.href = '/landing'
    return ( 
      <>
      </>
    )
  } else {

  return (
    <div className='bg-dark-gray h-screen'>
      <Header/>

      <div className="flex">

        <Aside />

        <div>
      {/* {updateFormState && ( */}

          <form>
            <input className='m-2 border' value={username} onChange={(e) => setUsername(e.target.value)}>

            </input>
          </form>
        </div>
      
      </div>

    </div>
  )
}}