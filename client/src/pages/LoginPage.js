import { useState } from "react"

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
    <div style={{ width: "50%", marginLeft: "auto", marginRight: "auto" }}>
      <h1>Login Page</h1>

      <form className="form mb-3">
        <div className="form-group mb-3">
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
      )}
    </div>
  )

}

export default LoginPage