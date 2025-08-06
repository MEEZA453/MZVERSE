'use client'
import { FiCheck } from "react-icons/fi";
import { useState } from "react"
import ButtonLoader from "../Components/ButtonLoader"
import Image from "next/image"
export default function Handle() {
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [handle, setHandle] = useState("")
  const [error, setError] = useState(false)

  return (
    <div className="h-screen w-screen bg-[#030303] flex">
      {typeof window !== 'undefined' && window.innerWidth > 640 ? (
        <div className="h-screen w-[70vw] border-r border-[#4d4d4d]"></div>
      ) : null}
<Image className="w-8 absolute left-2 top-2 rounded-xl" src={'/logo.png'} width={50} height={50} alt="log"/>
      <div className="h-screen flex items-center flex-col gap-10 justify-center login w-full">
        <form className="lg:w-[40%] w-[90%]">

            <h2 className="mb-6">Your handle is how other community members will see you.</h2>
   
          <input
            type="text"
            name="id"
            value={handle}
            placeholder="Enter you email address.."
            onChange={(e) => setHandle(e.target.value)}
            className={`flex-1 w-full mb-2 bg-[#131313]  ${error ? 'border border-red-600/50' : ''} px-2 py-1 outline-none`}
          />

          <p style={{ color: 'red' }}>{errorMessage}</p>

          <button
            type="submit"
            className="px-2 w-full flex items-center justify-center h-6 text-center bg-white text-black text-[14px] rounded-[2px]"
          >
            {loading ? <ButtonLoader /> : 'Continue'}
          </button>
          <div className="steps mt-4">

        <div className="flex w-full mt-1 justify-between"><h2>Contains only letters, numbers, underscores and periods</h2><div className="bg-white rounded-full h-4 w-4 flex items-center justify-center"><FiCheck color="black" size={13}/></div></div>

        <div className="flex w-full mt-1 justify-between"><h2>Does not start or end with a period</h2><div className="bg-white rounded-full h-4 w-4 flex items-center justify-center"><FiCheck color="black" size={13}/></div></div>
        <div className="flex w-full mt-1 justify-between"><h2>Contains at least one letter</h2><div className="bg-white rounded-full h-4 w-4 flex items-center justify-center"><FiCheck color="black" size={13}/></div></div>
        <div className="flex w-full mt-1 justify-between"><h2>Contains only letters, numbers, underscores and periods.</h2><div className="bg-white rounded-full h-4 w-4 flex items-center justify-center"><FiCheck color="black" size={13}/></div></div>  
          </div>
            
        </form>

      </div>
    </div>
  )
}
