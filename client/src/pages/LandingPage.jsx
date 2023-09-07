import { useState } from "react"
import sunTornado from '../assets/sun-tornado-black.svg'
import { FaUserFriends } from 'react-icons/fa'

export default function LandingPage() {
   // Defines state variables for Signup form
  const [signupData, setSignupData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
  });

  // Defines state variables for Login form
  const [loginData, setLoginData] = useState({
    username: '',
    password: '',
  });

  // Defines state variables for Add Post form
  const [postData, setPostData] = useState({
    image1: '',
    image2: '',
    code1: '',
    code2: '',
    text: '',
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPostData({ ...postData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission, e.g., send data to a server
  };

  // Event handler for Signup form input changes
  const handleSignupInputChange = (event) => {
    const { name, value } = event.target;
    setSignupData({ ...signupData, [name]: value });
  };

  // Event handler for Login form input changes
  const handleLoginInputChange = (event) => {
    const { name, value } = event.target;
    setLoginData({ ...loginData, [name]: value });
  };

  // Event handler for Add Post form input changes
  const handlePostInputChange = (event) => {
    const { name, value } = event.target;
    setPostData({ ...postData, [name]: value });
  };

  const [ loginState, setLoginState ] = useState(true)
  const [ signupState, setSignupState ] = useState(false)

  function formSwitch(e) {
    e.preventDefault()
    loginState ? setLoginState(false) : setLoginState(true)
    signupState ? setSignupState(false) : setSignupState(true)
  }

  const inputStyle = "border border-gray-200 w-full py-1 px-2 rounded-md"

  return (
    <div className='m-0 min-h-screen flex flex-col justify-start gap-10 pt-24' style={{
      backgroundImage: `url(${sunTornado})`, 
      backgroundRepeat: 'no-repeat', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center'
    }}>

      <div className="flex flex-col gap-2">
        <h1 className="font-cursive text-4xl text-center text-accent">
          Website Name
        </h1>

        <FaUserFriends className='text-5xl text-gray-200 w-full'/>
      </div>

      {loginState && (
        <form className="w-[300px] bg-white shadow-md mx-auto rounded-md p-8 flex flex-col gap-6">
          <h4 className="text-xl">Log In</h4>
          <input className={inputStyle} placeholder='username'></input>
          <input className={inputStyle} type='password' placeholder='password'></input>

          <button className=" bg-accent w-full text-center text-sm h-8 rounded-md hover:bg-accent-dark">LOG IN</button>
          <a href='' onClick={formSwitch} className=" text-accent text-center w-full hover:text-accent-dark">New to us? Create an account!</a>
        </form>

      )}

      {signupState && (
        <form className="w-[300px] bg-white shadow-md mx-auto rounded-md p-8 flex flex-col gap-6">
          <h4 className="text-xl">Sign Up</h4>
          <input className={inputStyle} placeholder='username'></input>
          <input className={inputStyle} type='password' placeholder='password'></input>
          <input className={inputStyle} type='password' placeholder='confirm password'></input>

          <button className=" bg-accent w-full text-center text-sm h-8 rounded-md hover:bg-accent-dark">SIGN UP</button>
          <a href='' onClick={formSwitch} className=" text-accent text-center w-full hover:text-accent-dark">Have an account? Log in!</a>
        </form>

      )}
      <h3 className="w-full text-center text-xl text-gray-200" >Coding's better with friends</h3>

    </div>
  )

}