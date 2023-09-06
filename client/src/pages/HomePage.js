import { useState, useEffect } from "react"
import { Link } from "react-router-dom";
import { useUserContext } from "../ctx/UserContext"
import { Header, Post } from '../components'

export default function HomePage() {
  const { currUser } = useUserContext()

  const posts = [
    {
      user: 
        {
          username: 'schmidt',
          userColor: '#92e1c0'
        },
      text: 'text text text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      comments: [
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          user: {
            username: 'a2',
            userColor: '#92e1c0'
          }
        },
        {
          text: 'This is amazing!',
          user: {
            username: 'timothy',
            userColor: '#FACB6C'
          }
        }
      ]
    },
    {
      user: 
        {
          username: 'a-down',
          userColor: '#FACB6C'
        },
      text: 'text text text Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      comments: [
        {
          text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
          user: {
            username: 'schmidt',
            userColor: '#92e1c0'
          }
        },
        {
          text: 'This is amazing!',
          user: {
            username: 'timothy',
            userColor: '#FACB6C'
          }
        }
      ]
    },
  ]

  return (
    <>

      <Header />

      { posts.map((post) => (
        <Post post={post}/>
      ))}

    </>
  )
}