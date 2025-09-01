'use client'
export default function SkeletonNotification() {
  return (
    <div className="w-screen space-y-0.5">
      {/* Follow Notification Skeleton */}
      <div className="h-12 w-screen bg-[#151515] flex items-center gap-2 rounded px-2 animate-pulse">
        <div className="w-10 h-10 bg-[#1d1d1d] rounded-full" />
        <div className="flex flex-col gap-1">
         
        </div>
      </div>

      {/* Vote Notification Skeleton */}
      <div className="h-16 w-screen bg-[#151515] flex justify-between items-center rounded px-2 animate-pulse">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#1d1d1d] rounded-full" />
          <div className="flex flex-col gap-1">


          </div>
        </div>
        <div className="w-10 h-10 bg-[#1d1d1d] rounded-sm" />
      </div>
      {/* Vote Notification Skeleton */}
      <div className="h-16 w-screen bg-[#151515] flex justify-between items-center rounded px-2 animate-pulse">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#1d1d1d] rounded-full" />
          <div className="flex flex-col gap-1">
  

          </div>
        </div>
        <div className="w-10 h-10 bg-[#1d1d1d] rounded-sm" />
      </div>
    </div>
    
  );
}
