'use client'
import Image from "next/image"
import ButtonLoader from "../Components/ButtonLoader"
import { useState } from "react"
export default function Profile (){
    const error = false
const [errorMessage ,setErrorMessage] = useState(false)
    const [loading , setLoading] = useState(false)
   return  <div className="h-screen w-screen bg-[#030303] flex">
      {typeof window !== 'undefined' && window.innerWidth > 640 ? (
        <div className="h-screen w-[70vw] border-r border-[#4d4d4d]"></div>
      ) : null}
<Image className="w-8 absolute left-2 top-2 rounded-xl" src={'/logo.png'} width={50} height={50} alt="log"/>
      <div className="h-screen flex items-center flex-col gap-10 justify-center login w-full">
        <form className="lg:w-[34%]   w-[80%]">
<div className="image flex flex-col items-center gap-2">
    <Image src= '/image.png' className="h-25 w-25 rounded-full object-cover" height={100} width={100} alt="profile"/>
      <input
              type="file"
              id="upload-button"
              name="image[]"
              accept="image/*"
              multiple
            
              className="hidden"
            />

          <label
            htmlFor="upload-button"
          >
          Upload
          </label>
</div>

            <div className="mb-2">
<h3  >Display name</h3>
          <input
            type="text"
            name="id"
            
            placeholder=""
            
            className={`flex-1 w-full bg-[#131313] mb-0.5  ${error ? 'border border-red-600/50' : ''} px-2 py-1 outline-none`}
            />
           
            </div>

         <div>
<h3  className="mb-1" >Website (Optional)</h3>
          <input
            type="text"
            name="id"
            
            placeholder="https://"
            
            className={`flex-1 w-full mb-2 bg-[#131313]  ${error ? 'border border-red-600/50' : ''} px-2 py-1 outline-none`}
            />
            </div>
         <div>
<h3  className="mb-1" >Instagram handle (Optional)</h3>
          <input
            type="text"
            name="id"
            
            placeholder="@"
            
            className={`flex-1 w-full mb-2 bg-[#131313]  ${error ? 'border border-red-600/50' : ''} px-2 py-1 outline-none`}
            />
            </div>

                     <div className="mb-2">
<h3  className="mb-1" >Bio (Optional)</h3>
          <input
            type="text"
            name="id"
            
            placeholder=""
            
            className={`flex-1 w-full text-right bg-[#131313]  ${error ? 'border border-red-600/50' : ''} px-2 py-1 outline-none`}
            />
            <h2 className="text-right">50 character at maximum</h2>
            </div>
          <p style={{ color: 'red' }}>{errorMessage}</p>

          <button
            type="submit"
            className="px-2 w-full flex items-center justify-center h-6 text-center bg-white text-black text-[14px] rounded-[2px]"
          >
            {loading ? <ButtonLoader /> : 'Continue'}
          </button>
          <div className="flex gap-1 mt-2 items-center"><h2>No account ?</h2><a style={{fontSize : 13, lineHeight : -0.2}}>Signup</a></div>
        </form>
      </div>
    </div>
}