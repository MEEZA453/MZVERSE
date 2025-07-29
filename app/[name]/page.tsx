'use client'

import { usePathname } from 'next/navigation'
import { useRef, useState } from 'react'
import { users } from '../lib/DummyUser'
import {useAuth } from '../Context/AuthContext'
export default function Account() {
const {logout} = useAuth()
  const currentPath = usePathname()
  const userPath = currentPath.split('/').pop()
  const user = users.find((el) => el.id === userPath)

  const [activeIndex, setActiveIndex] = useState(0)
  const tabs = ['Posts', 'Assets', 'About']
  console.log(activeIndex)

  return (
    <div className='w-screen'>
      <div className='absolute w-screen flex justify-between px-2 top-2 left-2'>
      <h4 >{user?.id}</h4>
<button onClick={()=>logout()} className='px-1 py-0.5 bg-red-500 text-white rounded-[2px]'>Logout</button>
      </div>

      <div className='profile relative flex flex-col h-90 border-b border-[#4d4d4d] gap-3 mt-10 items-center justify-center w-screen'>
        <img
          className='h-40 w-40 rounded-full bg-[#dadada] object-cover'
          src='/image.png'
          alt='profile'
        />
        <h4>{user?.name}</h4>
        <div className='flex gap-1'>
          <button className='border rounded text-[14px] px-4 py-0.5'>Instagram</button>
          <button className='bg-white text-black text-[14px] px-4 py-0.5 rounded'>Hire now</button>
        </div>

        <div className='w-screen absolute bottom-1 flex justify-around gap-3'>
          {tabs.map((tab, index) => (
            <h6
              key={index}
              onClick={() => setActiveIndex(index)}
              className={`cursor-pointer ${index === activeIndex ? 'text-white':'text-[#767676]'} text-sm`}
            >
              {tab}
            </h6>
          ))}
        </div>

        {/* Slider */}
        <div
          className='h-[2px] w-[33.33vw] -translate-x-[33.33vw] bg-white absolute bottom-0 transition-transform duration-300'
          style={{ transform: `translateX(${activeIndex * 33.33}vw)` }}
        />
      </div>
    </div>
  )
}
