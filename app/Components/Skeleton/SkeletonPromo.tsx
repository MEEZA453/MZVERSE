export function SkeletonPromoCard() {
  return (
    <div className="flex-shrink-0 w-[80vw] lg:w-[33.33vw] mb-4 snap-center relative">
      {/* Image placeholder */}
      <div className="w-full h-[22rem] lg:h-[40rem] bg-[#2a2a2a] rounded animate-pulse" />

      {/* Top gradient (same as your promo card) */}
      <div className="absolute w-full h-80 bg-gradient-to-b from-[#00000080] to-[#00000000] z-[50] top-0"></div>

      {/* Top-left user section */}
      <div className="flex justify-between items-center w-full z-[99] absolute top-2 left-2 pr-3">
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className="h-8 w-8 rounded-full bg-[#3a3a3a] animate-pulse" />
          <div className="flex flex-col gap-1">
            <div className="h-3 w-24 bg-[#3a3a3a]  animate-pulse" />
            <div className="h-2 w-16 bg-[#3a3a3a]  animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
