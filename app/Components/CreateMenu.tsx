import { useRouter } from "next/navigation"

export default function CreateMenu(){

const router = useRouter()
    return  <div className="bg-[#1d1d1d] absolute  z-[9999] top-8 right-18 rounded-[2px]  h-fit w-40">
  <button
      onClick={()=>router.push('/createPost')}
      className="text-red-500 border-b border-[#4d4d4d] w-full text-[14px] px-3 py-1 flex items-center justify-left gap-1"
    >
      Create post 
    </button>
      <button
      onClick={()=>router.push('/createProduct')}
      className="text-white text-[14px]  px-3 py-1 flex items-center justify-left gap-1"
    >
      CrateProduct
    </button>
    </div>
}