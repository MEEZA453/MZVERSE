    'use client'
    import Image from "next/image"
    import { useRouter } from "next/navigation";
    import { useRef, useState, useEffect } from "react"
    import { HiOutlineDotsVertical } from "react-icons/hi";
    import { IoIosArrowBack } from "react-icons/io";
    import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md"
    import { useThemeContext } from "../Context/ThemeContext";

interface ImageShowerProps {
  images?: string[];
  isMobile?: boolean;
  name?: string;
  amount?: number;
  isMyProduct?: boolean;
  setIsMenu?: React.Dispatch<React.SetStateAction<boolean>>;
  style?: React.CSSProperties; // add style prop
  panelY?: number
  setPanelY?: React.Dispatch<React.SetStateAction<Number>>;

}

export default function ImageShower({
  images = [],
  isMobile = false,
  name,
  amount,
  isMyProduct,
  setIsMenu,
  panelY,
  setPanelY,
  style,
}: ImageShowerProps) {

     const [loaded, setLoaded] = useState(false);
     
      const carouselRef = useRef<HTMLDivElement>(null)
      const isDragging = useRef(false)
      const startPos = useRef(0)
      const {isLightMode} = useThemeContext()
      const scrollStart = useRef(0)
      
      const animationFrame = useRef<number | null>(null)
    const router  = useRouter()

      const [activeIndex, setActiveIndex] = useState(0)
      const targetScroll = useRef(0)
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
        <div className="relative sticky top-0 lg:w-[70vw] bg-white flex items-center justify-center lg:h-screen w-screen mb-4">

          <div
            ref={carouselRef}
            className={`flex hide-scrollbar ${images?.length === 1? 'lg:ml-[15vw]':''}  snap-mandatory cursor-grab  ml flex items-center overflow-x-scroll snap-x lg:w-[70vw] lg:h-screen lg:overflow-x-scroll lg:snap-y `}
            onMouseDown={handleMouseDown}
            onMouseLeave={handleMouseLeave}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove}
          >
            {!isMobile && !isLightMode && (
              <div className="gradient absolute pointer-events-none w-120 h-screen bg-gradient-to-l from-[#000000] to-[#00000000] z-[300] right-0 top-0"></div>
            )}

            {images.map((img: string, i: number) => (
              <div
                key={i}
                data-index={i}
                 style={style} 
                className={`flex-shrink-0 w-screen pointer-events-none aspect-[3/2] flex items-center  h-[50vh]  snap-center flex items-center justify-center lg:w-[40vw] lg:h-[50vh] lg:h-fit ${
                  i === images.length - 1 ? "" : ""
                }`}
              >
                <Image
  src={img}
  alt={`image-${i}`}
  width={1200}
  height={800}
  sizes="(max-width: 768px) 100vw, 40vw"
  placeholder="blur"
  blurDataURL="/placeholder.png" // tiny transparent or blurred img
  className="object-cover lg:h-full max-h-[450px]"
/>
              </div>
            ))}
          </div>

      { !isLightMode &&  <div className="pointer-events-none fixed w-screen h-80 bg-gradient-to-b from-[#00000070] to-transparent top-0 z-30" />}

          {/* Thumbnail Controller */}
          {images.length > 1 && (
            <div className="absolute z-[900] image-controller flex lg:left-[3vw] left-[35vw] bottom-6 gap-0">
              {images.map((el, i) => (
                <Image
                  key={i}
                  src={el}
                  alt={`preview-${i}`}
                  width={300}
                  height={300}
                  onClick={() => scrollToImage(i)}
                  className={`lg:h-16 w-10 lg:w-16 h-10 object-cover cursor-pointer duration-300  ${
                    activeIndex === i ? "opacity-30" : "opacity-90"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      )
    }
