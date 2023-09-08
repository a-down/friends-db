


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
   


<div className="flex h-screen">
      {/* Sidebar */}
      <div className="flex flex-col items-center w-16 pb-4 border-r border-gray-300">
        {/* Sidebar items */}
        <a className="sidebar-item" href="#">
          <svg className="w-8 h-8" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {/* Icon */}
          </svg>
        </a>
        {/* More sidebar items */}
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-grow">
        {/* Top Header */}
        <div className="flex items-center h-16 px-8 border-b border-gray-300">
          <h1 className="text-lg font-medium">Page Title</h1>
          <button className="action-button">
            Action 1
          </button>
          <button className="action-button">
            Action 2
          </button>
          {/* More action buttons */}
        </div>

        {/* Content */}
        <div className="flex-grow p-6 overflow-auto bg-gray-200">
          {/* Message and Friends Box */}
          <div className="flex h-full">
            {/* Message Box */}
            <div className="message-box bg-white shadow-lg rounded-lg p-4 flex-grow">
              {/* Messages */}
              <div className="messages bg-gray-100 p-2 rounded-lg h-60" style={{ overflowY: 'auto' , maxHeight: 'calc(100% - 675px)', minHeight: '670px' }}>
                <div className="message received mb-2">
                  <p className="message-text bg-blue-200 text-blue-800 py-2 px-4 rounded-lg">
                    Hello, how can I help you?
                  </p>
                </div>
                <div className="message sent mb-2">
                  <p className="message-text bg-green-200 text-green-800 py-2 px-4 rounded-lg">
                    I have a question about your services.
                  </p>
                </div>
                {/* More messages */}
              </div>

              {/* Input and Button */}
              <div className="mt-4">
                <input type="text" placeholder="Type your message..." className="input border border-gray-400 rounded-lg flex-grow py-2 px-4 input rounded-lg w-full py-2 px-4" />
                <button className="send-button bg-blue-500 hover:bg-blue-600 text-white rounded-lg py-2 px-4 mt-2 w-full">Send</button>
              </div>
            </div>

            {/* Friends Box */}
            <div className="friends-box bg-white shadow-lg rounded-lg p-4 ml-4 flex-grow">
              <h2 className="text-lg font-medium mb-2">Friends</h2>
              <ul className="friend-list">
                <li className="friend">Friend 1</li>
                <li className="friend">Friend 2</li>
                <li className="friend">Friend 3</li>
                {/* Add more friends */}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

 


</div>

    
  );
}