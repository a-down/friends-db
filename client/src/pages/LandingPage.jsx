import { useState } from "react"
import sunTornado from '../assets/sun-tornado-black.svg'
import { FaUserFriends } from 'react-icons/fa'

import { Uploader } from "uploader"; // Installed by "react-uploader".
import { UploadButton } from "react-uploader";

export default function LandingPage() {
   // Defines state variables for Signup form
  const [signupData, setSignupData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    userColor: '#72FDCB',
    userImage: '',
    // userBio: '',
    // userCollab: ''
  });

  // Defines state variables for Login form
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  // // Defines state variables for Add Post form
  // const [postData, setPostData] = useState({
  //   image1: '',
  //   image2: '',
  //   code1: '',
  //   code2: '',
  //   text: '',
  // });

  // const handleInputChange = (event) => {
  //   const { name, value } = event.target;
  //   setPostData({ ...postData, [name]: value });
  // };


  // Login user
  const handleLogin = async (event) => {
    event.preventDefault();
    console.log(loginData);
    const query = await fetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(loginData),
      headers: { 'Content-Type':'application/json'}
    })
    if (!query) {
      return 
      //Logic to notify bad login
    } else {
      const result = await query.json()
      if (result.status === 'success' && result.payload) {
        window.location.href = '/'
      }
    }
  }

  // register new user
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(signupData)
    const query = await fetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(signupData),
      headers: { 'Content-Type':'application/json'}
    })
    if (!query.ok) {
      return 
      //Logic to notify user of signup failure
    } else {
      const result = await query.json()
      if (result.status === 'success' && result.payload ) {
        window.location.href = '/'
      }
    }
  };

/*
unfinished get posts
  const getPost = async (event) => {
    event.preventDefault();
    console.log(postData)
    const query = await fetch('/api/post', {
      method: 'GET',
    })
  }
  */

  // Event handler for Signup form input changes
  const handleSignupInputChange = (event) => {
    const { name, value } = event.target;
    setSignupData({ ...signupData, [name]: value });
  };

  console.log(signupData)

  // Event handler for Login form input changes
  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Event handler for Add Post form input changes/////////////////////////////
  const handlePostInputChange = (event) => {
    const { name, value } = event.target;
    setPostData({ ...postData, [name]: value });
  };

  // POST Post
  const handlePost = async (event) => {
    event.preventDefault();
                                        //double check this
    const query = await fetch('/api/post/post', {

      method: 'POST',
      body: JSON.stringify(postData),
      headers: { 'Content-Type':'application/json'}
    })
    if (!query) {
      return 
      //Logic to notify bad login
    } else {
      const result = await query.json()
      if (result.status === 'success' && result.payload) {
        window.location.href = '/'
      }
    }
////////////////////////////////////////////////////////////////////////////////



  const [ loginState, setLoginState ] = useState(true)
  const [ signupState, setSignupState ] = useState(false)

  function formSwitch(e) {
    e.preventDefault()
    loginState ? setLoginState(false) : setLoginState(true)
    signupState ? setSignupState(false) : setSignupState(true)
  }


  const inputStyle = "border border-gray-200 w-full py-1 px-2 rounded-md"
  let headerColor
  loginState ? headerColor = '#72FDCB' : headerColor = signupData.userColor

  const uploader = Uploader({
    apiKey: "free" // Get production API keys from Bytescale
  });

  const options = { 
    multi: false,
    styles: {
      primary: `${signupData.userColor}`
    }
   };

  return (
    <div className='m-0 min-h-screen flex flex-col justify-start gap-10 pt-24' style={{
      backgroundImage: `url(${sunTornado})`, 
      backgroundRepeat: 'no-repeat', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center'
    }}>

      <div className="flex flex-col gap-2">
        <h1 className="font-cursive text-4xl text-center" style={{color: `${headerColor}`}}>
          Website Name
        </h1>

        <FaUserFriends className='text-5xl text-gray-200 w-full'/>
      </div>

      {loginState && (
        <form className="w-[300px] bg-white shadow-md mx-auto rounded-md p-8 flex flex-col gap-6">
          <h4 className="text-xl">Log In</h4>
          <input 
            className={inputStyle} 
            placeholder='username'
            name='username'
            value={loginData.username}
            onChange={handleLoginInputChange}></input>
          <input 
            className={inputStyle} 
            type='password' 
            placeholder='password'
            name='password'
            value={loginData.password}
            onChange={handleLoginInputChange}></input>

          <button className=" bg-accent w-full text-center text-sm h-8 rounded-md hover:bg-accent-dark" onClick={handleLogin}>LOG IN</button>
          <a href='' onClick={formSwitch} className=" text-accent text-center w-full hover:text-accent-dark">New to us? Create an account!</a>
        </form>

      )}

      {signupState && (
        <form className="w-[300px] bg-white shadow-md mx-auto rounded-md p-8 flex flex-col gap-6">
          <h4 className="text-xl">Sign Up</h4>
          <input 
            className={inputStyle} 
            placeholder='username' 
            name='username'
            value={signupData.username}
            onChange={handleSignupInputChange}></input>
          <input 
            className={inputStyle} 
            type='password' 
            placeholder='password'
            name='password'
            value={signupData.password}
            onChange={handleSignupInputChange}></input>
          <input 
            className={inputStyle} 
            type='password' 
            placeholder='confirm password'
            name='confirmPassword'
            value={signupData.confirmPassword}
            onChange={handleSignupInputChange}></input>

          <div className="flex justify-between items-center text-gray-400">
            <label className="text-center">Profile Color</label>
            <input 
              className=' bg-white overflow-hidden w-[50%] rounded-md border' 
              type='color'
              name='userColor'
              value={signupData.userColor}
              onChange={handleSignupInputChange}></input>
          </div>

          <div className="flex justify-between items-center text-gray-400">
            <label>Profile Image</label>
            {/* <input 
              className='border border-gray-200 w-[50%]' 
              type='text' 
              placeholder='image'
              name='userImage'
              value={signupData.userImage}
              onChange={handleSignupInputChange}></input> */}
            
            <UploadButton 
              uploader={uploader}
              options={options}
              onComplete={files => files.map(x => signupData.userImage = x.fileUrl)}>

              {({onClick}) =>
                <button 
                  onClick={onClick}
                  style={{backgroundColor: `${signupData.userColor}`}}
                  className='rounded-md py-1 px-2 w-[50%] text-black text-sm'>
                  Upload image
                </button>
              }
            </UploadButton>
          </div>

          <button className=" w-full text-center text-sm h-8 rounded-md hover:bg-accent-dark" 
            onClick={handleSubmit}
            style={{backgroundColor: `${signupData.userColor}`}}>SIGN UP</button>

          <a href='' onClick={formSwitch} style={{color: `${signupData.userColor}`}} className=" text-center w-full hover:text-accent-dark">Have an account? Log in!</a>
        </form>

      )}
      <h3 className="w-full text-center text-xl text-gray-200" >Coding's better with friends</h3>

    </div>
  )

}