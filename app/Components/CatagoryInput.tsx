"use client"
import { useState } from "react"
import { FiChevronRight } from "react-icons/fi"
import { IoChevronBack, IoSearchOutline } from "react-icons/io5"
import {motion} from 'framer-motion';
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
          error.catagoryError ? "border-red-600" : "border-[#2c2b2b]"
        } rounded-[2px] w-full bg-[#101010] cursor-pointer`}
        placeholder="Select category..."
      />

      {open && (
        <motion.div
        >
    <div onClick={()=>setOpen(false)} style={{opacity  : open ? 0.7 : 0}} className="h-screen duration-300 transition-opacity w-screen z-[99] bg-black absolute top-0 left-0"></div>
        <motion.div 
        initial ={{ y : -120 , scale : 0.95}}  animate = {{y : 0 , scale : 1}} transition={{duration : 0.1 }}
         className="absolute top-0 z-[999] left-0 mt-1 w-full bg-[#1a1a1a] border border-[#2c2b2b] rounded-md max-h-64 overflow-y-auto">
          {/* Search Input */}
          <div className="flex items-center px-2 sticky top-0 bg-[#101010] border-b border-[#2c2b2b]">
<IoSearchOutline className=""
            color="#8d8d8d"
              size={19}
            />
          <input
            type="text"
            placeholder=" Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full p-2 outline-none text-sm"
            />
            </div>

          {/* Panel: Parents OR Subcategories */}
          {!selectedParent ? (
            // ---- Parent List ----
            filteredParents.map((parent) => (
              <div key={parent.name} className="border-b border-[#2c2b2b]">
                <div className="flex px-2 justify-between items-center w-full">
                <button
                  type="button"
                  onClick={() => setSelectedParent(parent.name)}
                  className="w-full text-left text-[14px]  py-2 hover:bg-[#2a2a2a] font-semibold"
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
                className="w-full gap-2 flex items-center text-left text-[14px] px-3 py-2 bg-[#101010] hover:bg-[#2a2a2a] font-semibold border-b border-[#2c2b2b]"
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
                    className="block border-b border-[#2c2b2b] text-[14px] w-full text-left px-7 py-2 hover:bg-[#333]"
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
