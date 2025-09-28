import { useThemeContext } from "../../Context/ThemeContext"

export default function SkeletonRelatedPosts(){
    const {isLightMode}  = useThemeContext()
    return <div className="flex gap-2 px-4">
        {Array.from({length : 7}).map((_, i)=>{
            return <div key={i}  className={`shrink-0 rounded-[2px]  w-[80px] h-[80px] ${isLightMode ? 'bg-[#ededed]':'bg-[#1d1d1d]'}`}></div>
        })}
    </div>
}