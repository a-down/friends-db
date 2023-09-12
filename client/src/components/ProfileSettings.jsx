import { useState, useEffect } from 'react'
import { useUserContext } from "../ctx/UserContext"
import { CodeBlock, CopyBlock } from "react-code-blocks";
import { HiMiniPencilSquare } from 'react-icons/hi2'

import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";


export default function ProfileSettings() {
  const { currUser } = useUserContext()

  const emptyFormData = { 
    userColor: currUser.data.userColor, 
    userBio: currUser.data.userBio, 
    userImage: currUser.data.userImage
  }  
  
  const [updateFormState, setUpdateFormState] = useState(false)
  const [updateFormData, setUpdateFormData] = useState(emptyFormData)

  useEffect(() => {
    setUpdateFormData({ ...updateFormData, user: `${currUser.data._id}` })
  }, [currUser])

  function handleUpdateForm(event) {
    const { name, value } = event.target;
    setUpdateFormData({ ...updateFormData, [name]: value });
  }

  function formHandler() {
    updateFormState ? setUpdateFormState(false) : setUpdateFormState(true)
  }

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
        console.log('Profile Setting Changes were successful:', data);
        setUpdateFormData(emptyFormData)
        setUpdateFormState(false)
    
      })
      .catch((error) => {
        console.error('Error:', error);
        // Handle any errors that occurred during the fetch request
      });
  }

  const uploader = Uploader({
    apiKey: "free" // Get production API keys from Bytescale
  });

  const options = {
    multi: false,
    editor: {
      images: {
        crop: true,
        cropShape: "rect",
        cropRatio: 1 / 1 
      },
    }
  };


  return (
    <div className='flex flex-col justify-end'>
      <div className='py-1 px-2 rounded-md flex gap-2 items-center ' style={{ backgroundColor: `${currUser.data.userColor}`, cursor: 'pointer' }} onClick={formHandler}>
        <HiMiniPencilSquare />
        <p className='hidden md:inline'>
          Edit You Profile Settings
        </p>
      </div>

      {updateFormState && (
        <div>
          <form className="w-full bg-gray border border-dark-gray shadow-md mx-auto my-4 rounded-md flex flex-col gap-6 overflow-hidden">
          <div className="flex justify-between items-center text-gray-400">
            <label className="text-center">Select your Profile Color:</label>
            <input 
              className=' bg-white overflow-hidden w-[50%] rounded-md border' 
              type='color'
              name='userColor'
              value={updateFormData.userColor}
              onChange={handleUpdateForm}></input>
          </div>

            <div className='flex justify-between'>
              <textarea
                className='rounded-sm py-1 px-2 bg-gray-100 text-sm w-[45%]' placeholder='Update your Bio'
                name='userBio'
                value={updateFormData.userBio}
                onChange={handleUpdateForm}></textarea>


              <UploadButton
                uploader={uploader}
                options={options}
                onComplete={files => files.map(x => updateFormData.userImage = x.fileUrl)}>

                {({ onClick }) =>
                  <button
                    onClick={onClick}
                    className='rounded-md py-1 px-2 text-black text-sm bg-gray-100 w-[45%]'>
                    Upload a New Profile Image
                  </button>
                }
              </UploadButton>

            </div>

            <button
              className="w-full text-center text-sm h-8 rounded-t-sm hover:opacity-80 text-black"
              style={{ backgroundColor: `${currUser.data.userColor}` }}
              onClick={sendChange}>Submit Changes</button>
          </form>
        </div>
      )}

    </div>
  )

}