'use client'
import Image from "next/image"
import { useThemeContext } from "../../Context/ThemeContext"
import { motion } from "framer-motion"

export default function MultipleAttachment({ length, coverImage, setAttachmentsMenu }) {
  const { isLightMode } = useThemeContext()

  return (
    <motion.div
      className="relative h-12 w-12"
      initial={{ scale: 0, opacity: 0 }} // pop-in start
      animate={{ scale: 1, opacity: 1 }} // pop-in animation
      transition={{ type: "spring", stiffness: 300, damping: 20, duration: 0.5 }}
    >
      {/* Levitation wrapper */}
      <motion.div
        animate={{ y: [0, -5, 0] }} // levitate
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
        className="absolute inset-0"
      >
        <div className={`h-4 w-4 rounded-full ${isLightMode ? 'bg-black text-white' : 'bg-white text-black'} absolute right-0 text-[10px] items-center justify-center flex`}>
          {length}
        </div>
        <div className={`h-11 w-11 ${isLightMode ? 'bg-[#dadada]' : 'bg-[#1d1d1d]'} flex justify-center items-center`}>
          <Image
            onClick={() => setAttachmentsMenu(true)}
            src={coverImage}
            height={100}
            width={100}
            alt="preview"
            className="h-11 lg:h-11 w-9 lg:w-10 rounded-[2px] object-cover"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
