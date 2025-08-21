'use client'
export function SkeletonCard() {
  return (
    <div className="mb-2">
      {/* Image Placeholder */}
      <div className="relative flex flex-col items-center justify-center overflow-hidden bg-[#1a1a1a] border-[#1d1d1d] border rounded h-30 w-[43vw] lg:w-full lg:h-100 min-h-[200px] animate-pulse">
        <div className="w-[45vw] lg:w-[20vw] h-full bg-[#2a2a2a]" />
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center w-full pr-3 mt-2">
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className="h-7 lg:h-7 w-7 lg:w-7 rounded-full items-center object-cover bg-[#2a2a2a] animate-pulse" />
          <div className="flex flex-col gap-1">
            <div className="h-3 w-24 bg-[#2a2a2a]  animate-pulse" />
            <div className="h-1.5 w-16 bg-[#2a2a2a]  animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
