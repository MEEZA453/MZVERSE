'use client'
import { useRouter } from 'next/navigation';
import { IoSearchOutline } from 'react-icons/io5';
import { useEffect, useState }  from 'react';
import React from 'react';
interface MasterNavberProps {
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function MasterNavber({setShowInput}:MasterNavberProps) {
  const router = useRouter();
  const outerMenu: { name: string; path: string }[] = [
    { name: 'Home', path: '/' },
    { name: 'Store', path: '/AllAssets' },
    { name: 'About', path: '/' },
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

        <div className="flex gap-3 lg:gap-6 lg:mr-4">
          <div className="search mt-0.5 relative">
      
            <IoSearchOutline
            
              size={18}
            />
          </div>
          <h6>[ 10 ]</h6>
          <button className='border bg-white px-1 py-0.5 text-[15px] text-black rounded-[3px]' onClick={()=> setShowInput(true)}>Join community</button>
        </div>
      </div>

<div className="fixed pointer-events-none w-screen h-80 bg-gradient-to-b from-black to-[#00000000] z-[900] top-0"></div>
    </nav>
  );
}
