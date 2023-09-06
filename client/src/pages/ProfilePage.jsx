import { useState } from 'react'
import { Header, Post } from '../components'
import { HiCog } from 'react-icons/hi'
import { SiGithub } from 'react-icons/si'

export default function Profile() {


  return (
    <div className='bg-dark-gray h-screen'>

      <Header />

      <div className=" bg-dark-gray flex justify-between gap-6 p-4">
        <img src="https://placehold.co/64" className=" rounded-full border-2 border-blue-200 max-w-[64px] max-h-[64px]" />
        <HiCog className=' text-2xl text-gray-200 mx-1.5'/>
      </div>

      <div className='w-full bg-[#454545] px-4 py-2 mb-20'>
        <p className='font-bold text-blue-200'>a-down</p>
        <p className='text-gray-200'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Modi nostrum nobis quaerat odit fugit voluptatum necessitatibus</p>
          
        <a href='' className=' flex w-fit items-center gap-2 py-1 px-2 bg-blue-200 rounded-md ml-auto mr-0 mt-12'>
          <SiGithub /> /a-down/group-project-03
        </a>
      </div>

      <Post />
      <Post />
      <Post />

    </div>
  )
}