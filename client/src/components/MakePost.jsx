import { useState, useEffect } from 'react'
import { useUserContext } from "../ctx/UserContext"
import { HiMiniPencilSquare } from 'react-icons/hi2'
import { Alert } from '../components'
import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";


export default function MakePost() {
  const emptyFormData = { 
    postText: '', 
    user: '', 
    imageString1: '', 
    imageString2: '', 
    codeString1: '', 
    codeString2: '' 
  }

  const { currUser } = useUserContext()
  const [writeFormState, setWriteFormState] = useState(false)
  const [writeFormData, setWriteFormData] = useState(emptyFormData)
  const alertDefault = {type: '', message: ''}
  const [writeAlert, setWriteAlert] = useState(alertDefault)

  // add user._id to form to state for future fetch post
  useEffect(() => {
    setWriteFormData({ ...writeFormData, user: `${currUser.data._id}` })
  }, [currUser])

  // functions to handle visibility and data of write form
  function handleWriteForm(event) {
    const { name, value } = event.target;
    setWriteFormData({ ...writeFormData, [name]: value });
  }

  function formHandler() {
    writeFormState ? setWriteFormState(false) : setWriteFormState(true)
    setWriteAlert(alertDefault)
  }

  // function to make fetch post and reset form, as well as take the user to their profile to see the post
  function sendPost(e) {
    e.preventDefault();

    // Define the URL where you want to send the data
    const apiUrl = '/api/post'; 

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
          setWriteAlert({type: 'error', message: 'Could not publish post. Please try again.'})
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse the response JSON if needed
      })
      .then((data) => {
        setWriteAlert({type: 'success', message: 'Post published!'})
        window.location.href = `/profile/${currUser.data.username}`
      })
      .catch((error) => {
        console.error('Error:', error);
        setWriteAlert({type: 'error', message: 'Could not publish post. Please try again.'})
        // Handle any errors that occurred during the fetch request
      });
  }

  // uploader (image upload) setup
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
    <div className="bg-transparent p-4 flex flex-col gap-2 md:w-[85%] lg:w-[70%] mx-auto md:mb-10 md:px-0" >

      <Alert type={writeAlert.type} message={writeAlert.message} />

      <div className='py-1 px-2 rounded-md flex gap-2 items-center ' style={{ backgroundColor: `${currUser.data.userColor}`, cursor: 'pointer' }} onClick={formHandler}>
        <HiMiniPencilSquare />
        <p >
          Make a Post
        </p>
      </div>

      {writeFormState && (
        <div className='flex flex-col gap-4 py-4'>

          <form className="w-full bg-gray shadow-md mx-auto rounded-md flex flex-col gap-6 overflow-hidden">
            <textarea
              className="rounded-b-sm bg-gray-100 py-1 px-2 h-[100px] "
              placeholder='Post description'
              name='postText'
              value={writeFormData.postText}
              onChange={handleWriteForm}></textarea>

            <div className='flex justify-between'>
              <textarea
                className='rounded-sm py-1 px-2 bg-gray-100 text-sm w-[20%]' placeholder='Type code here...'
                name='codeString1'
                value={writeFormData.codeString1}
                onChange={handleWriteForm}></textarea>

              <textarea
                className='rounded-sm py-1 px-2 bg-gray-100 text-sm w-[20%]' placeholder='Type code here...'
                name='codeString2'
                value={writeFormData.codeString2}
                onChange={handleWriteForm}></textarea>

              <UploadButton
                uploader={uploader}
                options={options}
                onComplete={files => files.map(x => writeFormData.imageString1 = x.fileUrl)}>

                {({ onClick }) =>
                  <button
                    onClick={onClick}
                    className='rounded-md py-1 px-2 text-black text-sm bg-gray-100 w-[20%]'>
                    Upload Image 1
                  </button>
                }
              </UploadButton>

              <UploadButton
                uploader={uploader}
                options={options}
                onComplete={files => files.map(x => writeFormData.imageString2 = x.fileUrl)}>

                {({ onClick }) =>
                  <button
                    onClick={onClick}
                    className='rounded-md py-1 px-2 text-black text-sm bg-gray-100 w-[20%]'>
                    Upload Image 2
                  </button>
                }
              </UploadButton>
            </div>

            <button
              className="w-full text-center text-sm h-8 rounded-t-sm hover:opacity-80 text-black"
              style={{ backgroundColor: `${currUser.data.userColor}` }}
              onClick={sendPost}>POST</button>
          </form>
        </div>
      )}

    </div>
  )
}