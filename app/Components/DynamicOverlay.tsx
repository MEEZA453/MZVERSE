import React, { useEffect, useState } from 'react'

function DynamicOverlay({scrollRef}) {
    const [opacity , setOpacity]  = useState(0)
  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return
      const scrollY = scrollRef.current.scrollTop
      const maxScroll = 300
      const newOpacity = Math.min(scrollY / maxScroll, 0.6)
      setOpacity(newOpacity)
    }

    const container = scrollRef.current
    container?.addEventListener("scroll", handleScroll)

    return () => container?.removeEventListener("scroll", handleScroll)
  }, [])
  return (
     <div       style={{ opacity }} className={`h-full fixed pointer-events-none top-0 z-[30] w-full bg-black`}></div>
  )
}

export default DynamicOverlay