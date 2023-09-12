import { useState, useEffect } from 'react'
import { useUserContext } from "../ctx/UserContext"
import { CodeBlock, CopyBlock } from "react-code-blocks";
import { HiMiniPencilSquare } from 'react-icons/hi2'

import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";


export default function ProfileSettings() {
  const emptyFormData = { 
    userColor: '', 
    userBio: '', 
    userImage: '' 
  }  
  
  const { currUser } = useUserContext()
  const [writeFormState, setWriteFormState] = useState(false)
  const [writeFormData, setWriteFormData] = useState(emptyFormData)

  useEffect(() => {
    setWriteFormData({ ...writeFormData, user: `${currUser.data._id}` })
  }, [currUser])

  function handleWriteForm(event) {
    const { name, value } = event.target;
    setWriteFormData({ ...writeFormData, [name]: value });
  }

  function formHandler() {
    writeFormState ? setWriteFormState(false) : setWriteFormState(true)
  }

  function sendChange(e) {
    e.preventDefault();

    // Define the URL where you want to send the data
    const apiUrl = '/api/user'; 

    // Create a POST request to send the data
    fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json', // Set the content type to JSON
      },
      body: JSON.stringify(writeFormData), // Convert the data to JSON format
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response JSON if needed
      })
      .then((data) => {
        console.log('Profile Setting Changes were successful:', data);
        setWriteFormData(emptyFormData)
        setWriteFormState(false)
        alert('Profile Settings uploaded')
    
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
        <p >
          Edit You Profile Settings
        </p>
      </div>

      {writeFormState && (
        <div>
          <form className="w-full bg-gray border border-dark-gray shadow-md mx-auto my-4 rounded-md flex flex-col gap-6 overflow-hidden">
          <div className="flex justify-between items-center text-gray-400">
            <label className="text-center">Select your Profile Color:</label>
            <input 
              className=' bg-white overflow-hidden w-[50%] rounded-md border' 
              type='color'
              name='userColor'
              value={writeFormData.userColor}
              onChange={handleWriteForm}></input>
          </div>

            <div className='flex justify-between'>
              <textarea
                className='rounded-sm py-1 px-2 bg-gray-100 text-sm w-[45%]' placeholder='Update your Bio'
                name='userBio'
                value={writeFormData.userBio}
                onChange={handleWriteForm}></textarea>


              <UploadButton
                uploader={uploader}
                options={options}
                onComplete={files => files.map(x => writeFormData.userImage = x.fileUrl)}>

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