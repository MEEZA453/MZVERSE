import { useThemeContext } from "../../Context/ThemeContext";

export function SkeletonPromoCard() {
  const {isLightMode} = useThemeContext()
  return (
    <div className="flex-shrink-0 w-[80vw] h-100 lg:w-[33.33vw] mb-4 snap-center relative">
      {/* Image placeholder */}
      <div className={`w-full h-[22rem] lg:h-[40rem]  ${isLightMode ? 'bg-[#ededed]':'bg-[#151515]'} rounded animate-pulse`} />

      {/* Top gradient (same as your promo card) */}
      {/* <div className="absolute w-full h-80 bg-gradient-to-b from-[#00000080] to-[#00000000] z-[50] top-0"></div> */}

      {/* Top-left user section */}
      <div className="flex justify-between items-center w-full z-[99] absolute top-2 left-2 pr-3">
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className={`h-8 w-8 rounded-full   ${isLightMode ? 'bg-[#dadada]':'bg-[#1d1d1d]'} animate-pulse`} />
          <div className="flex flex-col gap-1">
            <div className={`h-2.5 w-24   ${isLightMode ? 'bg-[#dadada]':'bg-[#1d1d1d]'}  animate-pulse`} />
            <div className={`h-1.5 w-16   ${isLightMode ? 'bg-[#dadada]':'bg-[#1d1d1d]'}  animate-pulse`} />
          </div>
        </div>
      </div>
    </div>
  );
}
