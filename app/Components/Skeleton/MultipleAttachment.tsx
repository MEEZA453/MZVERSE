'use client'
import Image from "next/image"
import { useThemeContext } from "../../Context/ThemeContext"
import { motion } from "framer-motion"

interface MultipleAttachmentProps {
  length: number
  coverImage: string
  setAttachmentsMenu: (val: boolean) => void
}

export default function MultipleAttachment({ length, coverImage, setAttachmentsMenu }: MultipleAttachmentProps) {
  const { isLightMode } = useThemeContext()

  return (
    <motion.div
      className="relative h-12 w-12 cursor-pointer"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: [0, 1, 1], opacity: [0, 1, 1] }} // Instagram pop-in
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1 }} // hover lift effect
  
      drag // make it draggable
      dragConstraints={{ top: -10, bottom: 10, left: -10, right: 10 }} // small draggable range
      dragElastic={0.2} // soft elastic drag
    >
      {/* Levitation wrapper */}
      <motion.div
        animate={{ y: [0, -5, 0] }} // levitate up and down
        transition={{ duration: 2, repeat: Infinity, repeatType: "loop", ease: "easeInOut" }}
        className="absolute inset-0 flex flex-col items-center justify-center"
      >
        {/* Badge count */}
        <div className={`h-4 w-4 rounded-full ${isLightMode ? 'bg-black text-white' : 'bg-white text-black'} absolute right-0 top-0 text-[10px] flex items-center justify-center`}>
          {length}
        </div>

        {/* Cover Image */}
        <div className={`h-11 w-11 ${isLightMode ? 'bg-[#dadada]' : 'bg-[#1d1d1d]'} flex justify-center items-center rounded-[2px]`}>
          <Image
            onClick={() => setAttachmentsMenu(true)}
            src={coverImage}
            height={100}
            width={100}
            alt="preview"
            className="h-11 w-11 rounded-[2px] object-cover"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
