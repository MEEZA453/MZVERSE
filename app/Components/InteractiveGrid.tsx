'use client';
import React, { useRef, useEffect , useState  } from "react";
import {useRouter} from 'next/navigation'
export default function InteractiveGrid() {
  const router = useRouter()
  const [isMobile , setIsMobile]  = useState(false)
  const GRID_SIZE = isMobile ? 20 : 8;
  const bgRef = useRef<HTMLDivElement | null>(null);

  const targetedImages: { row: number; col: number; src: string; alt?: string }[] = [
    { row: 1, col: 3, src: "/nostalogia.webp", alt: "Nostalogia" },
    { row: 2, col: 1, src: "/wanted.webp", alt: "Nostalogia" },

    
    { row: 3, col: 1, src: "/abundance.webp", alt: "Abundance" },
    { row: 4, col: 0, src: "/founder.webp", alt: "Founder" },
    { row: 3, col: 2, src: "/freedom.webp", alt: "Freedom" },
  ];
useEffect(()=>{
  const handleResize = ()=>{
    if(window.innerWidth < 640){
      setIsMobile(true)
    }else{
      setIsMobile(false)
    }
  }
window.addEventListener('resize' , handleResize)
return window.removeEventListener('resize' , handleResize)
},[])
useEffect(() => {
  let targetX = 0;
  let targetY = 0;
  let currentX = 0;
  let currentY = 0;

  const handleMouseMove = (e: MouseEvent) => {
    const { innerWidth, innerHeight } = window;
    targetX = (e.clientX / innerWidth - 0.5) * 20;
    targetY = (e.clientY / innerHeight - 0.5) * 20;
  };

  const animate = () => {
    currentX += (targetX - currentX) * 0.1;
    currentY += (targetY - currentY) * 0.1;

    if (bgRef.current) {
      bgRef.current.style.transform = `translate(${currentX}vw, ${currentY}vw)`;
    }

    requestAnimationFrame(animate);
  };

  window.addEventListener("mousemove", handleMouseMove);
  animate(); // Start the animation loop

  return () => {
    window.removeEventListener("mousemove", handleMouseMove);
  };
}, []);


  return (
    <div className="h-screen w-screen  sticky top-0  overflow-hidden">
      <div className="absolute w-screen h-80 bg-gradient-to-t from-black to-[#00000000] bottom-0 z-[10]"></div>
      <div className="absolute w-screen h-80 bg-gradient-to-b from-black to-[#00000000] top-0 z-[10]"></div>

      <div className="bg-black/60 h-screen w-screen  px-3 z-[10] absolute flex flex-col gap-2 items-center max-sm:items-start justify-center ">
      <h1 >A Design achive for visual thinking.</h1>
      <button className='bg-white text-black text-[16px] rounded-[2px] px-2 py-1' onClick={()=>router.push('/AllAssets')}>Join now</button>
      </div>
      <div
        ref={bgRef}
        className="w-[140vw] grid lg:grid-cols-10  grid-cols-4 -translate-x-[20vw] -translate-y-[20vh] max-sm:-translate-y-[40vh] max-sm:-translate-x-[40vw]  transition-transform duration-100"
      >
        {Array.from({ length: GRID_SIZE }, (_, row) =>
          Array.from({ length: GRID_SIZE }, (_, col) => {
            const img = targetedImages.find(
              (img) => img.row === row && img.col === col
            );
            return (
              <div
                key={`${row}-${col}`}
                className="border-l border-b border-[#414141] flex relative justify-center h-[40vw] lg:h-[15vw] items-center"
              >
                {img && <img src={img.src} className="w-[50%]" />}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
