import { useState } from "react"
import { useUserContext } from "../ctx/UserContext"

const Header = () => {
  const { currUser, logout } = useUserContext()

  return (
    <header>

    </header>
  )
}


export default Header