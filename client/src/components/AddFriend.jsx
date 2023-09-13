import Header from './Header'
import Aside from './Aside'
import { useUserContext } from '../ctx/UserContext'

import React, { useState } from 'react';


// search for username, turns the array of usernames into a list. 
export default function UsernameSearch() {
  const { currUser } = useUserContext()
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUsername, setSelectedUsername] = useState('');

  const usernames = ['mike', 'austinslater', 'katyvincent', 'garytalmes'];
  // get it to pull list of usernames instead of this temp list

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSelect = (username) => {
    setSelectedUsername(username);
  };
  // filter names based on what is typed
  const filteredUsernames = usernames.filter((username) =>
    username.toLowerCase().includes(searchTerm.toLowerCase())
  );


  if (currUser.status === 'searching') {
    return (
      <>
      </>
    )
  } else if (currUser.status === "notfound") {
    window.location.href = '/landing'
    return (
      <>
      </>
    )
  } else {

  return (
    <>
      <div className='bg-dark-gray h-screen'>
        <Header />

        <div className="flex">

          <Aside />

          <div className='md:ml-16 md:mt-[70px] w-full'>
            <h1>Find a Friend</h1>
            <input
              type="text"
              placeholder="Search for a username"
              value={searchTerm}
              onChange={handleSearch}
            />
            <ul>
              {filteredUsernames.map((username) => (
                <li key={username}>
                  <button onClick={() => handleSelect(username)}>
                    {username}
                  </button>
                </li>
              ))}
            </ul>
            {selectedUsername && (
              // user name selected appears here
              <p>{selectedUsername}</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
}
