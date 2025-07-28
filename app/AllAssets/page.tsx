'use client'
import MasterNavber from '../Components/MasterNavber';
import { useAssets } from '../Context/AllAssetsContext.jsx';
import {useRouter , usePathname} from 'next/navigation';
import {Product} from '../types/Product';
import Loading from '../Components/loading'
export default function AllAssets() {
  const currentPath  = usePathname()
  const router = useRouter();
  const { data , loading }: { data: Product[] , loading : boolean } = useAssets();
  console.log(data);
  const handleClick = (path : string):void=>{
    router.push(currentPath + '/'+path)
  }

  return (
    <div className='w-screen'>
      <MasterNavber />
   {   !loading ? <div className='lg:grid-cols-5 grid-cols-2 grid'>
        {data.map((product, index) => (
          <div
          onClick={()=>handleClick(product.name)}
            key={index}
            className="group relative flex flex-col items-center justify-center p-4 border-l border-b border-[#4d4d4d] h-10 lg:h-90 min-h-[220px]"
          >
            <img src={product.image[0]} className=" w-[70%] mb-4 lg:w-[55%]" />
            <div className="absolute  group-hover:-translate-y-7 duration-200 left-2 top-[88%]">
              <div className="flex items-center gap-2">
                <h5>{product.name}</h5> <label className='bg-[#aeaeae] text-black text-[13px] leading-4 px-1 '>${product.amount}</label>
              </div>
              <p className="w-[70%] opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {product.headline} 
              </p>
            </div>
          </div>
        ))}
      </div> : <Loading/>}
    </div>
  );
}
