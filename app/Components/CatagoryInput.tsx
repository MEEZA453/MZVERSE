"use client"
import { useState } from "react"
import { FiChevronRight } from "react-icons/fi"
import { IoChevronBack, IoSearchOutline } from "react-icons/io5"
import {motion} from 'framer-motion';
import { useThemeContext } from "../Context/ThemeContext";
const categories = [
  {
    name: "Design",
    subcategories: [
      "Graphic Design",
      "Poster Design",
      "Visual Design",
      "UI/UX Design",
      "3D Design",
    ],
  },
  {
    name: "Photography",
    subcategories: [
      "Portrait",
      "Street Photography",
      "Landscape",
      "Fashion",
      "Product Photography",
    ],
  },
  {
    name: "Art & Illustration",
    subcategories: [
      "Digital Art",
      "Illustration",
      "Concept Art",
      "Pixel Art",
    ],
  },
  {
    name: "Development",
    subcategories: [
      "Web Development",
      "Frontend",
      "Backend",
      "Full-Stack",
      "Creative Coding",
    ],
  },
  {
    name: "Motion & Video",
    subcategories: [
      "Motion Graphics",
      "3D Animation",
      "Video Editing",
      "VFX",
    ],
  },
]

export default function CategorySelect({ formData, setFormData, error }: any) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedParent, setSelectedParent] = useState<string | null>(null)
const {isLightMode}  = useThemeContext()
  const handleSelect = (subcategory: string) => {
    setFormData({ ...formData, category: subcategory })
    setOpen(false)
    setSearch("")
    setSelectedParent(null)
  }

  const filteredParents = categories.filter(
    (parent) =>
      parent.name.toLowerCase().includes(search.toLowerCase()) ||
      parent.subcategories.some((sub) =>
        sub.toLowerCase().includes(search.toLowerCase())
      )
  )

  return (
    <div className="mt-2 ">
      <h3>Category:</h3>
      <input
        type="text"
        readOnly
        value={formData.category || ""}
        onClick={() => setOpen(!open)}
        className={`py-1 mt-1 border ${
          error.catagoryError ? "border-red-500/50" : isLightMode ? 'border-[#dadada] bg-white': "border-[#2c2b2b] bg-[#101010]"
        } rounded-[2px] w-full  px-2 cursor-pointer`}
        placeholder="Select category..."
      />

      {open && (
        <motion.div
        >
    <div onClick={()=>setOpen(false)} style={{opacity  : open ? 0.7 : 0}} className={`h-screen duration-300 transition-opacity w-screen z-[99] bg-black absolute top-0 left-0`}></div>
        <motion.div 
        initial ={{ y : -120 , scale : 0.95}}  animate = {{y : 0 , scale : 1}} transition={{duration : 0.1 }}
         className={`absolute top-0 hide-scrollbar lg:w-[50vw] lg:-translate-x-1/2 lg:left-1/2 -translate-y-1 lg:top-2 lg:h-102 z-[999] left-0 mt-1 w-full  border ${isLightMode ? 'border-[#dadada] bg-white':'border-[#2c2b2b] bg-[#1a1a1a]'} lg:rounded-md max-h-64 overflow-y-auto`}>
          {/* Search Input */}
<input style={{backgroundColor: 'white', borderColor: 'white'}} type="text" placeholder=" Search category..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full p-2 outline-none text-sm" />
          {/* Panel: Parents OR Subcategories */}
          {!selectedParent ? (
            // ---- Parent List ----
            filteredParents.map((parent) => (
              <div key={parent.name} className={`border-b hover:bg-[#2a2a2a] ${isLightMode ? 'border-[#dadada]': 'border-[#2c2b2b]'} `}>
                <div className="flex px-2 justify-between items-center w-full">
                <button
                  type="button"
                  onClick={() => setSelectedParent(parent.name)}
                  className="w-full text-left text-[14px]  py-2  font-semibold"
                >
                  {parent.name}
                </button>
                <FiChevronRight />
                </div>
              </div>
            ))
          ) : (
            // ---- Subcategory Page ----
            <div>
              <button
                type="button"
                onClick={() => setSelectedParent(null)}
                className={`w-full gap-2 flex  ${isLightMode ? 'border-[#dadada] bg-[#ededed]': 'border-[#2c2b2b]'} items-center text-left text-[14px] px-3 py-2 bg-[#101010] hover:bg-[#2a2a2a] font-semibold `}
              >
                <IoChevronBack />Back 
              </button>
              {categories
                .find((p) => p.name === selectedParent)
                ?.subcategories.filter((sub) =>
                  sub.toLowerCase().includes(search.toLowerCase())
                )
                .map((sub) => (
                  <button
                    key={sub}
                    type="button"
                    onClick={() => handleSelect(sub)}
                    className={`block border-b ]  ${isLightMode ? 'border-[#dadada]': 'border-[#2c2b2b]'} text-[14px] w-full text-left px-7 py-2 hover:bg-[#333]`}
                  >
                    {sub}
                  </button>
                ))}
            </div>
          )}
        </motion.div>    </motion.div>
      )}
    </div>
  )
}
