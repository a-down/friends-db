import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useUserContext } from "../ctx/UserContext"
import { Header } from '../components'

export default function HomePage() {
  const { currUser } = useUserContext()



  return (
    <>

      <Header />

      <h1>Home Page</h1>

    </>
  )
}