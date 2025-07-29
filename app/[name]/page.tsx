'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useRef, useState } from 'react'
import Loading from '../Components/loading'
import { users } from '../lib/DummyUser'
import {useAuth } from '../Context/AuthContext'
import { IoMenuOutline } from "react-icons/io5";

export default function Account() {
const {logout} = useAuth()
  const currentPath = usePathname()

  const router = useRouter()
  const userPath = currentPath.split('/').pop()
  const user = users.find((el) => el.id === userPath)

  const [activeIndex, setActiveIndex] = useState(0)
  const tabs = ['Posts', 'Assets', 'About']
  const handleClick = (path : string):void=>{
    window.location.href = 'http://localhost:3000/AllAssets/'+path
  }

  return (
    <div className='w-screen overflow-hidden'>
      <div className='absolute w-screen flex justify-between px-2 top-2 '>
      <h4 >{user?.id}</h4>
<IoMenuOutline onClick={()=>logout()} className='  text-white  rounded-[2px]'  size={24}/>
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
          className='h-[2px] w-[33.33vw] -translate-x-[33.33vw] bg-white absolute bottom-0 transition-transform duration-500'
          style={{ transform: `translateX(${activeIndex * 33.33}vw)` }}
        />
      </div>

<div className='w-[300vw] flex duration-500' style={{transform :`translate(${-activeIndex*100}vw)`}}>
  <div className='posts w-screen lg:grid-cols-5 grid-cols-2 grid '>
    {user.post.map((p , i)=>{
      return <div key={i}  className="group relative flex flex-col items-center justify-center p-4 border-r border-b border-[#4d4d4d] h-10 lg:h-90 min-h-[220px]"><img className=' w-[70%] mb-4 lg:w-[55%]' src={p.images[0]}/></div>
    })}
  </div>
  <div className='assets w-screen h-90'>
      <div className='lg:grid-cols-5 grid-cols-2 grid'>
        {user.assets.map((product, index) => (
          <div
          onClick={()=>handleClick(product.name)}
            key={index}
            className="group relative flex flex-col items-center justify-center p-4 border-r border-b border-[#4d4d4d] h-10 lg:h-90 min-h-[220px]"
          >
            <img src={product.images[0]} className=" w-[70%] mb-4 lg:w-[55%]" />
            <div className="absolute  group-hover:-translate-y-7 duration-200 left-2 top-[88%]">
              <div className="flex items-center gap-2">
                <h5>{product.name}</h5> 
              </div>
              <p className="w-[70%] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {product.name} 
              </p>
            </div>
          </div>
        ))}
      </div> 
  </div>
  <div className='About w-screen h-90 bg-[#ebebeb]'></div>

</div>


    </div>
  )
}
