import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useUserContext } from "../ctx/UserContext"

const HomePage = () => {
  const { currUser } = useUserContext()

  if( currUser.status === "searching" ) return <></>
  return (
    <>
      <h1>Home Page</h1>

      { currUser.status === "notfound" ? (
        <p>You are not logged in.</p>
      ) : (
        <p>You are logged in.</p>
      )}
    </>
  )
}

export default HomePage