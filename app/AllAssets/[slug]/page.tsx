'use client'

import { useAssets } from '../../Context/AllAssetsContext';
import {usePathname} from 'next/navigation';
import { Product } from '../../types/Product';
import { HiOutlineLink } from "react-icons/hi2";
import MasterNavber from '../../Components/MasterNavber';
import ProductImages from '../../Components/ProductImages'
import Loading from '../../Components/loading'
import Login from '../../Components/Login';
import { useShowInput } from '../../Context/ShowInputContext';
export default function ProductPage() {
const pathname = usePathname()
const productpath = pathname.split('/');
const {showInput , setShowInput} = useShowInput()
const slug = productpath[productpath.length - 1]
  const { data , loading}: { data: Product[] ; loading : boolean } = useAssets();
  const product = data.find((item) => item.name === slug);
  return (
    <div className='w-screen h-screen'>

  
  
      <MasterNavber setShowInput={setShowInput}/>
      {showInput ? <div className='z-[999] fixed   bg-black/70 h-screen w-screen '><Login setShowInput={setShowInput}/></div>:null}
      {
      loading ? <Loading/>: <main  className='desc flex max-sm:flex-col h-screen w-screen  max-sm:items-center'>

<section className=''>

        <ProductImages images = {product.image}/>
</section>

<div  style={{ height: `${product.image.length * 50 + 50}vh` }}>

        <aside  className='flex flex-col items-center  sticky top-2 overflow-y-auto   mt-4'>

         <div className='pricing flex flex-col justify-between pb-4 relative bg-white h-40 rounded w-[96%] '>
            <div className='name flex gap-1 px-2 items-center'>
            <h4 className='text-black'>{product.name}</h4> <label className='bg-[#000000]  text-white leading-5 text-[14px] px-1.5'>${product.amount}</label>
            </div>
            <div className='buttons px-1 relative flex flex-col items-center gap-1'>
              <button className='buy w-full h-7 bg-black text- rounded pb-1'>Buy now</button>
              <button className='buy w-full h-7 border rounded-full border-black pb-1 text-black'>Add to cart</button>

            </div>
         </div>
         <div className='details'>
          {product.sections.map((section , index)=>{
            return <div key={index}>
              <h4 className='w-screen  lg:w-[30vw] bg-[#1d1d1d] my-2 px-3'> {section.title}</h4>
              <div className='px-2'>{section.content.map((el , i)=>{
                return <p key={i}>• {el}</p>
              })}</div>
            </div>
          })}
         </div>
         <div className='hastags'>
          <h4 className='bg-[#1d1d1d] my-2 px-3 w-screen lg:w-[30vw]'>Tags</h4>
          <div className='flex px-3 gap-2'>

          {product.hastags.map((el , i)=>{
            return <label key={i} className='text-[14px] bg-[#4d4d4d] text-[#dadada] px-2'>#{el}</label>
            
          })}
          </div>
         </div>
          <div className='delivery rounded-xl w-[97%] border-[#4d4d4d] mt-5 h-30 border flex justify-between p-3 items-center  '>
            <div className='q flex flex-col h-full justify-between items-start'>
            <p>Format:</p>
            <p>File size:</p>
            <p>Asset type:</p>
            </div>
                <div className='q flex flex-col h-full justify-between items-end'>
            <div className='flex items-center gap-[2px]' >
              <HiOutlineLink className='' size={12}/>
              <p>Instant link</p>
              </div>
            <p>2.0GB</p>
            <label className='text-[14px] bg-[#4d4d4d] text-[#dadada] px-2'>Preset</label>
            </div>

          </div>
        </aside>
</div>


         </main>
    }

      
    </div>
  );
}
