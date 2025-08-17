'use client'
import { motion, AnimatePresence } from "framer-motion"
import { RxCross2 } from "react-icons/rx"

export default function VoteFieldSelector({
  isShowVoteField,
  setShowVoteField,
  selectedVoteFields,
  toggleVoteField,
  deleteField,
}: any) {
  const fields = ["creativity", "aesthetics", "composition", "emotion"]

  return (
    <div className="w-full">
      {/* Selected Tags */}
      <div className="flex flex-wrap gap-2 mb-2">
        {selectedVoteFields.map((vote: string, i: number) => (
          <div
            key={i}
            className="flex items-center gap-1 bg-[#2d2d2d] px-2 py-1 rounded-full text-[#dadada] text-sm"
          >
            <span>{vote}</span>
            <RxCross2
              type="button"
              onClick={() => deleteField(i)}
              className="cursor-pointer text-white hover:text-red-400"
            />
          </div>
        ))}
      </div>

      {/* Dropdown */}
      <AnimatePresence>
        {isShowVoteField && (
          <motion.div
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 60, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full relative p-3 border border-[#1c1b1b] bg-[#1d1d1d] rounded-md grid grid-cols-2 gap-2"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setShowVoteField(false)}
              className="absolute top-2 right-2"
            >
              <RxCross2 className="text-gray-300 hover:text-white" />
            </button>

            {/* Field Options */}
            {fields.map((field) => (
              <button
                key={field}
                type="button"
                onClick={() => toggleVoteField(field)}
                className={`px-3 py-1.5 text-sm rounded-full transition-colors ${
                  selectedVoteFields.includes(field)
                    ? "bg-white text-black"
                    : "bg-[#0d0d0d] text-white hover:bg-[#2a2a2a]"
                }`}
              >
                {field}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
