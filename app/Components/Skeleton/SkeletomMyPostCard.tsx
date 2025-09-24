'use client'

import { useThemeContext } from "../../Context/ThemeContext";

export function SkeletonMyPostCard() {
  const {isLightMode} = useThemeContext()
  return (
    <div className="">
      {/* Image Placeholder */}
      <div className={`relative flex flex-col items-center justify-center overflow-hidden  ${isLightMode ? 'bg-[#ededed]':'bg-[#151515]'} rounded h-30 w-[45vw] lg:w-full lg:h-100 min-h-[200px] animate-pulse`}>
        <div className={`w-[45vw] lg:w-[20vw] h-full  ${isLightMode ? 'bg-[#ededed]':'bg-[#151515]'}`} />
      </div>

      {/* Footer */}
      
    </div>
  );
}
