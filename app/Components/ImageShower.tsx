'use client'
import Image from "next/image"
import { useRouter } from "next/navigation";
import { useRef, useState, useEffect } from "react"
import { HiOutlineDotsVertical } from "react-icons/hi";
import { IoIosArrowBack } from "react-icons/io";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md"

export default function ImageShower({ images = [], isMobile = false , name , amount , isMyProduct , setIsMenu }: { images?: string[]; isMobile?: boolean , name? : string , amount?: number , isMyProduct ?: boolean , setIsMenu ?: React.Dispatch<React.SetStateAction<boolean>> }) {
  const carouselRef = useRef<HTMLDivElement>(null)
  const isDragging = useRef(false)
  const startPos = useRef(0)
  const scrollStart = useRef(0)
  const animationFrame = useRef<number | null>(null)
const router  = useRouter()
  const [activeIndex, setActiveIndex] = useState(0)
  const targetScroll = useRef(0)
console.log(isMyProduct)
  // ---- Desktop Drag ----
  const handleMouseDown = (e: React.MouseEvent) => {
    isDragging.current = true
    startPos.current = e.pageX - (carouselRef.current?.offsetLeft || 0)
    scrollStart.current = carouselRef.current?.scrollLeft || 0
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging.current || !carouselRef.current) return
    const x = e.pageX - carouselRef.current.offsetLeft
    const walk = (x - startPos.current) * 2
    targetScroll.current = scrollStart.current - walk
    if (!animationFrame.current) {
      animationFrame.current = requestAnimationFrame(animateScroll)
    }
  }

  const handleMouseUp = () => (isDragging.current = false)
  const handleMouseLeave = () => (isDragging.current = false)

  // ---- Smooth Scroll Animation ----
  const animateScroll = () => {
    if (!carouselRef.current) return
    const current = carouselRef.current.scrollLeft
    const diff = targetScroll.current - current
    if (Math.abs(diff) < 0.5) {
      carouselRef.current.scrollLeft = targetScroll.current
      animationFrame.current = null
      return
    }
    carouselRef.current.scrollLeft += diff * 0.2
    animationFrame.current = requestAnimationFrame(animateScroll)
  }

  // ---- Scroll Handler (for arrows & thumbnails) ----
  const scrollToImage = (index: number) => {
    if (!carouselRef.current) return
    const child = carouselRef.current.children[index + (!isMobile ? 1 : 0)] as HTMLElement
    if (child) {
      targetScroll.current = child.offsetLeft
      if (!animationFrame.current) animationFrame.current = requestAnimationFrame(animateScroll)
      setActiveIndex(index)
    }
  }

  const prevImage = () => scrollToImage(Math.max(activeIndex - 1, 0))
  const nextImage = () => scrollToImage(Math.min(activeIndex + 1, images.length - 1))

  // ---- Track Active Image via IntersectionObserver ----
  useEffect(() => {
    if (!carouselRef.current) return
    setActiveIndex(0)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number(entry.target.getAttribute("data-index"))
            setActiveIndex(index)
          }
        })
      },
      { root: carouselRef.current, threshold: 0.6 }
    )

    const children = carouselRef.current.querySelectorAll("[data-index]")
    children.forEach((child) => observer.observe(child))
    return () => children.forEach((child) => observer.unobserve(child))
  }, [images])

  return (
    <div className="relative lg:w-[70vw] flex items-center  h-[55vh] lg:h-screen w-screen mb-4">
        <div className='w-full flex justify-between  lg:w-[70vw] items-center px-3 absolute z-[600] top-14 '>
                     <div className='flex gap-1 items-center justify-center'>
                     <button onClick={()=> router.back()}>
                       <IoIosArrowBack size={20} />
                       
                       </button>
                     <h4 >{name}</h4> { !isMyProduct  === undefined && <label className="bg-white text-black px-1.5 flex items-center justify-center py-2.5  " style={{fontFamily : 'inter' , lineHeight : 0, borderRadius :'40px', fontWeight : 300 ,fontSize : '11px'
                            }}>{amount === 0 ? null : '$'}{amount === 0 ? 'free':amount}</label>}</div>
             
                  { (isMyProduct === undefined || isMyProduct === true) && (
    <button 
      className="text-white" 
      onClick={() => setIsMenu(true)}
    >
      <HiOutlineDotsVertical />
    </button>
)}
</div>
      {/* Left Arrow */}
      {/* {!isMobile && (
        <div>
          {activeIndex !== 0 && (
            <button
              onClick={prevImage}
              className="absolute z-[999] left-6 top-1/2 -translate-y-1/2 bg-white/50 text-black items-center justify-center rounded-full h-7 w-7 flex pl-[5px] hover:bg-white/70"
            >
              <MdArrowBackIos />
            </button>
          )}
          {activeIndex !== images.length - 1 && (
            <button
              onClick={nextImage}
              className="absolute z-[999] right-6 top-1/2 -translate-y-1/2 bg-white/50 text-black items-center justify-center rounded-full h-7 w-7 flex hover:bg-white/70"
            >
              <MdArrowForwardIos />
            </button>
          )}
        </div>
      )} */}

      <div
        ref={carouselRef}
        className={`flex hide-scrollbar ${images?.length === 1? 'lg:ml-[15vw]':''}  snap-mandatory cursor-grab  ml flex items-center overflow-x-scroll snap-x lg:w-[70vw] lg:h-screen lg:overflow-x-scroll lg:snap-y`}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
      >
        {!isMobile && (
          <div className="gradient absolute pointer-events-none w-120 h-screen bg-gradient-to-l from-[#000000] to-[#00000000] z-[300] right-0 top-0"></div>
        )}

        {images.map((img: string, i: number) => (
          <div
            key={i}
            data-index={i}
            className={`flex-shrink-0 w-screen pointer-events-none  h-[55vh] snap-center flex items-center justify-center lg:w-[40vw] lg:h-[50vh] lg:h-fit ${
              i === images.length - 1 ? "" : ""
            }`}
          >
            <Image src={img} alt={`image-${i}`} width={1200} height={1200} className="w-full object-cover" />
          </div>
        ))}
      </div>

      <div className="pointer-events-none fixed w-screen h-80 bg-gradient-to-b from-[#00000070] to-transparent top-0 z-30" />

      {/* Thumbnail Controller */}
      {images.length > 1 && (
        <div className="absolute image-controller flex lg:left-[35vw] left-[35vw] bottom-2 gap-1">
          {images.map((el, i) => (
            <Image
              key={i}
              src={el}
              alt={`preview-${i}`}
              width={300}
              height={300}
              onClick={() => scrollToImage(i)}
              className={`lg:h-16 w-12 lg:w-16 h-12 object-cover cursor-pointer duration-300 border ${
                activeIndex === i ? "border-[#4d4d4d]" : "border-transparent hover:border-[#4d4d4d]"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
