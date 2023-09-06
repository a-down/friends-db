


export default function() {

  // Signup Component
  // Login Component
  // Basic Messaging Component
  // Quick form to add user by username
  // add post form

  return (
    <div>
      <form>
        <h2 className="text-red-400">Signup Form</h2>
        <div>
          <label className="text-blue-200">Username:</label>
          <input></input>
        </div>
        <div>
          <label>Password:</label>
          <input></input>
        </div>
        <div>
          <label>Confirm Password:</label>
          <input></input>
        </div>
        <button>Signup</button>
      </form>

      <form>
        <h2>Login Form</h2>
        <div>
          <label>Username:</label>
          <input></input>
        </div>
        <div>
          <label>Password:</label>
          <input></input>
        </div>
        <button>Signup</button>
      </form>

      <form>
        <h2 className=''>Add Post</h2>
        <div>
          <label>Image:</label>
          <input type='file' accept='image/*'></input>
        </div>
        <div>
          <label>Code:</label>
          <input></input>
        </div>
        <div>
          <label>Text:</label>
          <input></input>
        </div>
        <button>Signup</button>
      </form>


    </div>
  )
}