  'use client'
  import Image from "next/image"
  import { useRouter } from "next/navigation";
  import { useRef, useState, useEffect } from "react"
  import { HiOutlineDotsVertical } from "react-icons/hi";
  import { IoIosArrowBack } from "react-icons/io";
  import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md"
  import { useThemeContext } from "../Context/ThemeContext";

  export default function DynamicImageShower({ images = [], isMobile = false , opacity, name , amount , isMyProduct , setIsMenu, scale }: { images?: string[]; opacity:number; isMobile?: boolean , name? : string , amount?: number , isMyProduct ?: boolean , setIsMenu ?: React.Dispatch<React.SetStateAction<boolean>>, scale:number }) {
      const {isLightMode} = useThemeContext()
  
    

    return (    
      <div style={{opacity}} className="sticky z-[400] px-2  top-2 left-10 mb-4">
          {images.map((img: string, i: number) => (
            <div
              key={i}
              data-index={i}
            className="w-[100vw] h-[50vh]"
            >
              <Image style= {{ scale, transformOrigin: "top left" }} src={img} alt={`image-${i}`} width={1200} height={1200} className=" h-[48vh] lg:h-full w-full rounded-md  object-cover" />
            </div>
          ))}
    
      </div>
    )
  }
