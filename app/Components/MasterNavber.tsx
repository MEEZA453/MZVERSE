'use client'
import { useRouter , usePathname  } from 'next/navigation';
import { IoSearchOutline } from 'react-icons/io5';
import { useEffect, useState , useRef }  from 'react';
import React from 'react';
import dynamic from 'next/dynamic';
import { GoPlus } from "react-icons/go";

import { useAuth } from '../Context/AuthContext';

interface MasterNavberProps {
  setShowLoginInput?: React.Dispatch<React.SetStateAction<boolean>>;
  setShowSignupInput?: React.Dispatch<React.SetStateAction<boolean>>;

}
export default function MasterNavber({setShowLoginInput , setShowSignupInput}:MasterNavberProps) {
  const router = useRouter();

  
  const {isLoggedIn , profileLink} = useAuth();
  console.log(profileLink)
  const currentPath = usePathname();
const  dynamicButtonRef = useRef<HTMLButtonElement>(null)
  const outerMenu: { name: string; path: string }[] = [
    { name: 'Home', path: '/' },
    { name: 'Store', path: '/AllAssets' },
    { name: 'Gallary', path: '/posts' },
  ];

  const innerMenu: { name: string; path: string }[] = [
    { name: 'Texture', path: '/' },
    { name: 'Inspiration', path: '/' },
    { name: 'Presets', path: '/' },
    { name: 'Account', path: '/' },
  ];
  

  const [isLargeScreen, setIsLargeScreen] = useState(false);

  useEffect(() => {
    // Safe window access
    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 640);
    };

    handleResize(); // call once on mount
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
// useEffect(()=>{
// if(currentPath  === '/' && dynamicButtonRef.current){
//   dynamicButtonRef.current.innerText = 'Join community'
// }else{
//   dynamicButtonRef.current.innerText = 'Login'

// }
// },[])
  return (
    <nav className="w-screen  overflow-hidden">

      <div className="top  w-screen border-[#4d4d4d] flex justify-between items-center h-10 px-1 lg:px-2">
        {/* <img src="/logo.png" className="w-6 lg:w-7" /> */}
        <div>
        </div>
      </div>

      <div className="px-2 top-2 fixed z-[999] lg:px-3 bottom  border-[#4d4d4d] h-10 flex w-screen justify-between items-center">
        <div className="flex gap-3 lg:gap-6">
          {outerMenu.map((el, i) => (
            <h6 onClick={()=> router.push(el.path)} key={i}>{el.name}</h6>
          ))}
        </div>

        {isLargeScreen ? (
          <div className="flex gap-6">
            {innerMenu.map((el, i) => (
              <h6 key={i} onClick={() => router.push(el.path)}>
                {el.name}
              </h6>
            ))}
          </div>
        ) : null}

        <div className="flex gap-3 items-center lg:gap-6 lg:mr-4">
          <div className="search mt-0.5 relative">
      
            <IoSearchOutline
            
              size={18}
            />
          </div>
          {/* <h6>[ 10 ]</h6> */}
          {isLoggedIn? <div className='flex  gap-2 lg:gap-4'><div className='flex gap-2'>
                      <img onClick={()=>router.push(profileLink)} className='w-8 h-8 rounded-full full object-cover' src='/image.png'/>
                      
          
 </div><button className=" text-white border px-2.5 py-0.5 rounded"onClick={()=> router.push('/createProduct')} ref={dynamicButtonRef}>Create item</button></div>
          :<div className='flex gap-2 items-center'>
              <button className='border border-white px-2 rounded-[4px] py-0.5 text-[15px] text-white ' onClick={()=> setShowSignupInput(true)} ref={dynamicButtonRef}>Sign up</button>
            <button className='border bg-white px-2 py-0.5 text-[15px] text-black rounded-[3px]' onClick={()=> setShowLoginInput(true)} ref={dynamicButtonRef}>Login</button>
        
          </div>}
                  </div>
      </div>

    </nav>
  );
}
