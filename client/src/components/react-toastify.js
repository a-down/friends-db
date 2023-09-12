import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ToastifyTest() {
    const showToast = () => {
      toast.success('This is a success message!', {
        position: toast.POSITION.TOP_RIGHT,
        autoClose: 3000, // Close after 3 seconds
      });
    
    };
  
    return (
      <div>
        <button onClick={showToast}>Show Toast</button>
        <ToastContainer /> {/* This is where the notifications will be rendered */}
      </div>
    );
  }
  
  export default ToastifyTest;
  
  
  
  
  
  
  