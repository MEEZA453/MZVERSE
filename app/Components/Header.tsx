import { useRouter } from 'next/navigation'
import React from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import { IoIosArrowBack } from 'react-icons/io'

function Header({isLightMode, setIsMenu}) {
const router = useRouter()

  return (
           <div className={`  fixed top-0 ${isLightMode? 'bg-white':'bg-black'} h-9 z-[100] w-screen px-2  flex justify-between items-center`}>
                 <div className='flex items-center gap-5'>
                                <button onClick={()=> router.back()}>
                           <IoIosArrowBack   color={isLightMode ? 'black': 'white'} size={17} />
                           
                           </button>
                            {/* <button 
          className="text-white" 
          onClick={() => setIsMenu(true)}
        >
          <IoBookmarksOutline size={16} color={isLightMode ? 'black': 'white'}/>
        </button> */}
          
                          </div>
                            <button 
          className="text-white" 
          onClick={() => setIsMenu(true)}
        >
          <HiOutlineDotsVertical  color={isLightMode ? 'black': 'white'}/>
        </button>
           </div>
  )
}

export default Header