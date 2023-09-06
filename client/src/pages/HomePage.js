import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useUserContext } from "../ctx/UserContext"
import { Header, Post } from '../components'

export default function HomePage() {
  const { currUser } = useUserContext()



  return (
    <>

      <Header />

      <Post />

      <Post />

      <Post />

      <Post />

    </>
  )
}