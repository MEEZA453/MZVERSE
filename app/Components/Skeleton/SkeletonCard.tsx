'use client'

import { useThemeContext } from "../../Context/ThemeContext";

export function SkeletonCard() {
  const {isLightMode} = useThemeContext()
  return (
    <div className="mb-1">
      {/* Image Placeholder */}
      <div className={`relative flex flex-col items-center justify-center overflow-hidden ${isLightMode ? 'bg-[#ededed]':'bg-[#151515]'} rounded h-30 w-[43vw] lg:w-full lg:h-100 min-h-[200px] animate-pulse`}>
        <div className={`w-[45vw] lg:w-[20vw] h-full ${isLightMode ? 'bg-[#ededed]':'bg-[#151515]'}`} />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center w-full  mt-2">
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className={`h-7 lg:h-7 w-7 lg:w-7 rounded-full items-center object-cover  ${isLightMode ? 'bg-[#dadada]':'bg-[#1d1d1d]'}  animate-pulse`} />
          <div className="flex flex-col gap-1">
            <div className={`h-2.5 w-26  ${isLightMode ? 'bg-[#dadada]':'bg-[#1d1d1d]'}  animate-pulse`} />
            <div className={`h-1.5 w-18  ${isLightMode ? 'bg-[#dadada]':'bg-[#1d1d1d]'}  animate-pulse `}/>
          </div>
        </div>
      </div>
    </div>
  );
}
