
import React, { useState } from 'react';

export default function MyComponent() {
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

  return (
    <div>
      <form>
        <h2 className="text-red-400">Signup Form</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={signupData.username}
            onChange={handleSignupInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={signupData.password}
            onChange={handleSignupInputChange}
          />
        </div>
        <div>
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={signupData.confirmPassword}
            onChange={handleSignupInputChange}
          />
        </div>
        <button>Signup</button>
      </form>

      <form>
        <h2>Login Form</h2>
        <div>
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={loginData.username}
            onChange={handleLoginInputChange}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleLoginInputChange}
          />
        </div>
        <button>Login</button>
      </form>
      <form onSubmit={handleSubmit}>
        <h2>Add Post</h2>
        <div>
          <label>Image 1:</label>
          <input
            type="file"
            accept="image/*"
            name="image1"
            value={postData.image1}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Image 2:</label>
          <input
            type="file"
            accept="image/*"
            name="image2"
            value={postData.image2}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Code:</label>
          <input
            type="text"
            name="code1"
            value={postData.code1}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Code:</label>
          <input
            type="text"
            name="code2"
            value={postData.code2}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Text:</label>
          <input
            type="text"
            name="text"
            value={postData.text}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Post</button>
      </form>
    </div>
  );
}


