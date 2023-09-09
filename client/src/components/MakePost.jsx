import { useState, useEffect } from 'react'
import { useUserContext } from "../ctx/UserContext"
import { CodeBlock, CopyBlock } from "react-code-blocks";
import { HiMiniPencilSquare } from 'react-icons/hi2'

import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";

export default function MakePost() {
  const { currUser } = useUserContext()
  const [ writeFormState, setWriteFormState ] = useState(false)
  const [ writeFormData, setWriteFormData ] = useState({postText: '', user: '', imageString1: '', imageString2: '', codeString1: '', codeString2: ''})

  useEffect(() => {
    setWriteFormData({...writeFormData, user: `${currUser.data._id}`})
  }, [currUser])

  function handleWriteForm(event) {
    const { name, value } = event.target;
    setWriteFormData({ ...writeFormData, [name]: value });
  }

  function formHandler() {
    writeFormState ? setWriteFormState(false) : setWriteFormState(true)
  }

  function sendPost(e) {
    e.preventDefault()
    console.log(writeFormData)
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
    <div className="bg-zinc-600 p-4" >
      <div className='py-1 px-2 rounded-md flex gap-2 items-center ' style={{backgroundColor: `${currUser.data.userColor}`, cursor: 'pointer'}} onClick={formHandler}>
        <HiMiniPencilSquare />
        <p >
          Make a Post
        </p>
      </div>

      {writeFormState && (
        <div>
          <form className="w-full bg-gray border border-dark-gray shadow-md mx-auto my-4 rounded-md flex flex-col gap-6 overflow-hidden">
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

                {({onClick}) =>
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

                {({onClick}) =>
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
              style={{backgroundColor: `${currUser.data.userColor}`}}
              onClick={sendPost}>POST</button>
          </form>
        </div>
      )}
    
    </div>
  )
}