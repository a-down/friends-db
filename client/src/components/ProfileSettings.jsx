import { useState, useEffect } from 'react'
import { useUserContext } from "../ctx/UserContext"
import { Alert } from '../components'
import { HiMiniPencilSquare } from 'react-icons/hi2'
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";


export default function ProfileSettings() {
  const { currUser } = useUserContext()

  const emptyFormData = { 
    userColor: currUser.data.userColor, 
    username: currUser.data.username,
    userBio: currUser.data.userBio, 
    userImage: currUser.data.userImage,
    github: currUser.data.github
  }  

  const defaultAlert = {
    type: '', 
    message: '',
  }
  
  const [updateFormState, setUpdateFormState] = useState(false)
  const [updateFormData, setUpdateFormData] = useState(emptyFormData)
  const [ alertState, setAlertState] = useState(defaultAlert)

  // populate form with currUser information preloaded
  useEffect(() => {
    setUpdateFormData({ ...updateFormData, user: `${currUser.data._id}` })
  }, [currUser])

  // handlers for the form
  function handleUpdateForm(event) {
    setAlertState(defaultAlert)
    const { name, value } = event.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  }

  function formHandler() {
    updateFormState ? setUpdateFormState(false) : setUpdateFormState(true)
  }

  // function to send fetch put to update profile settings according to the form
  function sendChange(e) {
    e.preventDefault();

    // Define the URL where you want to send the data
    const apiUrl = `/api/user/${currUser.data._id}`; 

    // Create a POST request to send the data
    fetch(apiUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify(updateFormData), // Convert the data to JSON format
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response JSON if needed
      })
      .then((data) => {
        window.location.href = `/profile/${currUser.data.username}`
      })
      .catch((error) => {
        setAlertState({type: 'error', message: 'There was a problem updating your settings. Please try again later.'})
      });
  }

  // uploader setup (image uploader)
  const uploader = Uploader({
    apiKey: "public_12a1ybE2nDsQYn25onxfG6kYhWHw" // Get production API keys from Bytescale
  });

  const options = {
    multi: false,
    editor: {
      images: {
        crop: true,
        cropShape: "circ",
        cropRatio: 1 / 1 
      },
    }
  };

  return (
    <div className='flex flex-col justify-end'>
      <div className='w-fit py-1 px-2 rounded-md flex gap-2 items-center bg-[#484848] hover:opacity-80 border-dark border text-dark' style={{cursor: 'pointer' }} onClick={formHandler}>
        <HiMiniPencilSquare />
        <p className=''>
          Edit You Profile Settings
        </p>
      </div>

      {updateFormState && (
        <div>
          <form className="w-full bg-[#484848] p-4 mx-auto my-4 rounded-md flex flex-col gap-6 overflow-hidden text-gray-400">
            <div className="flex justify-between items-center">
              <label className="text-center">Select your Profile Color:</label>
              <input 
                className=' bg-white overflow-hidden w-[60%] rounded-md border text-gray-600' 
                type='color'
                name='userColor'
                value={updateFormData.userColor}
                onChange={handleUpdateForm}></input>
            </div>

            <div className="flex justify-between items-center">
              <label className="text-center">Update Username:</label>
              <input
                  className='rounded-sm py-1 px-2 bg-gray-100 text-sm w-[60%] text-gray-600' placeholder='Update your Bio'
                  name='username'
                  value={updateFormData.username}
                  onChange={handleUpdateForm}></input>
            </div>

            <div className="flex justify-between items-center">
              <label className="text-center">Update Bio:</label>
              <textarea
                  className='rounded-sm py-1 px-2 bg-gray-100 text-sm w-[60%] text-gray-600' placeholder='Update your Bio'
                  name='userBio'
                  value={updateFormData.userBio}
                  onChange={handleUpdateForm}></textarea>
            </div>

            <div className="flex justify-between items-center">
              <label className="text-center">Update GitHub Collab Link:</label>
              <input
                  className='rounded-sm py-1 px-2 bg-gray-100 text-sm w-[60%] text-gray-600' placeholder='Update GitHub'
                  name='github'
                  value={updateFormData.github}
                  onChange={handleUpdateForm}></input>
            </div>

            <div className='flex flex-col hover:opacity-80'>
              <UploadButton
                uploader={uploader}
                options={options}
                onComplete={files => files.map(x => updateFormData.userImage = x.fileUrl)}>

                {({ onClick }) =>
                  <button
                    onClick={onClick}
                    className='rounded-md py-1 px-2 text-black text-sm bg-gray-100 w-full'>
                    Upload New Profile Picture
                  </button>
                }
              </UploadButton>

              {updateFormData.userImage !== currUser.data.userImage && (
                <p className='text-dark text-center my-2' style={{color: currUser.data.userColor}}>Image uploaded</p>
              )}
            </div>

            <button
              className="w-full text-center text-sm h-8 rounded-t-sm hover:opacity-80 text-black"
              style={{ backgroundColor: `${currUser.data.userColor}` }}
              onClick={sendChange}>
              Submit Changes
            </button>

            {alertState.type && (
              <Alert type={alertState.type} message={alertState.message} />
            )}

          </form>
        </div>
      )}

    </div>
  )

}