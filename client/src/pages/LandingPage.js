import { useState } from "react"
import sunTornado from '../assets/sun-tornado.svg'
import { FaUserFriends } from 'react-icons/fa'

const LoginPage = () => {
  const defForm = { email: "", password: "" }
  const [ formData, setFormData ] = useState(defForm)
  const [ loginResult, setLoginResult ] = useState("")

  const handleInputChange = (e) => {
    setFormData({...formData, [e.target.name]: e.target.value})
  }

  const handleFormSubmit = async (e) => {
    e.preventDefault()
    const query = await fetch("/api/auth/login", {
      method: "post",
      body: JSON.stringify(formData),
      headers: {
        "Content-Type": "application/json"
      }
    })
    const result = await query.json()

    if( result && result.payload ){
      window.location.href = "/"
    } else {
      setLoginResult("fail")
    }
  }



  return (
    <div className='m-0 h-screen flex flex-col justify-center' style={{
      backgroundImage: `url(${sunTornado})`, 
      backgroundRepeat: 'no-repeat', 
      backgroundSize: 'cover', 
      backgroundPosition: 'center'
    }}>

      <div className="flex flex-col gap-2">
        <h1 className="font-cursive text-4xl text-center">
          Website Name
        </h1>

        <FaUserFriends className='text-5xl w-full'/>
      </div>

      <form className="w-[300px] bg-white shadow-md mx-auto rounded-sm px-10 py-4">
        <h4>Log In</h4>
        <input className="border border-gray-200 w-full py-1 px-2" placeholder='username'></input>
        <input className="border border-gray-200 w-full py-1 px-2" type='password' placeholder='password'></input>

        <button className=" bg-accent w-full text-center h-8 rounded-sm">LOG IN</button>
        <a href='' className=" text-accent">New to us? Create an account!</a>
      </form>





























      {/* <h1>Login Page</h1>

      <form className="">
        <div className="">
          <label>Email Address</label>
          <input   
            type="text"
            name="email"
            placeholder="john@gmail.com"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mb-3">
          <label>Password</label>
          <input   
            type="password"
            name="password"
            className="form-control"
            value={formData.password}
            onChange={handleInputChange}
          />
        </div>

        <div className="form-group mb-3 mt-2">
          <button className="btn btn-primary" onClick={handleFormSubmit}>Log Me In!</button>
        </div>
      </form>

      { loginResult === "success" && (
        <div className="alert alert-success" role="alert">
          Login successful!
        </div>
      )}

      { loginResult === "fail" && (
        <div className="alert alert-danger" role="alert">
          Login failed!
        </div>
      )} */}

    </div>
  )

}

export default LoginPage