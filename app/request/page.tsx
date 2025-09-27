'use client'
import ButtonLoaderWhite from "../Components/ButtonLoader";
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { applyJury } from "../store/actions/jury";
import { useAuth } from "../Context/AuthContext";
import { IoCheckmark, IoCheckmarkOutline } from "react-icons/io5";
import Image from "next/image";
import { useThemeContext } from "../Context/ThemeContext";

export default function Request() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, applied, error } = useSelector((state: any) => state.jury);
console.log(error)
  const [message, setMessage] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [localError, setLocalError] = useState("");
  const { token, user } = useAuth();
 const {isLightMode}  = useThemeContext()
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token || !accepted) return;

    if (!message.trim()) {
      setLocalError("Message is required.");
      return;
    }

    setLocalError("");
    dispatch(applyJury(message, token));
  };

  return (
    <div className="">
        <Image className="w-8 absolute left-2 top-2 z-[999] rounded-xl" src={'/logo.png'} width={50} height={50} alt="log"/>
        {
          !error && !applied ?<div className={`${isLightMode ?'bg-white':'bg-black'} w-screen h-screen fixed flex-col top-0 z-[999] flex justify-center items-center`}>

        
      <h5 className="mb-5">{user?.role === 'normal' ? 'Apply for Jury' : 'Switch to normal user'}</h5>
      <form onSubmit={handleSubmit} className="w-[98%] lg:w-160 px-3 py-2 relative">
        <textarea
          className="bg-[#0d0d0d] w-full p-2 border-[#1d1d1d] border h-20 rounded"
          placeholder="Share why you’d like to be a Jury member.."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="flex items-center gap-2 mb-1 mt-2">
          <button
            className={`h-4.5 w-4.5 rounded-[1px] border ${isLightMode ? 'bg-[#ededed] border-[#dadada]':'border-[#4d4d4d] bg-[#0d0d0d] '}`}
            type="button"
            onClick={() => setAccepted(!accepted)}
          >
            {accepted && <IoCheckmarkOutline />}
          </button>
          <p style={{opacity : 1}} className="">
            I accept the <span className="underline cursor-pointer">Terms & Conditions</span>
          </p>
        </div>
        <button
          type="submit"
          disabled={loading || !accepted}
          style={{opacity : !message || !accepted ? 0.7 : 1, color : isLightMode ? 'white':'black'}}
          className={`px-2 w-full flex items-center justify-center h-6 text-center mt-1.5 ${isLightMode ? 'bg-black ':'bg-white'} text-[14px] rounded-[2px] `}
        >
          {loading ? <ButtonLoaderWhite /> : 'Send request'}
        </button>
        {applied && <p className="text-green-400 text-xs mt-2">Request submitted ✅</p>}
        {error && <p className="text-red-400 mt-2">{error}</p>}
      </form>
      </div> : <div className="h-screen w-screen relative flex flex-col justify-center items-center">
        <div className="flex flex-col items-center">
<div className={`h-12 w-12 border ${isLightMode ?'border-black':'border-white'} mb-2 flex items-center justify-center rounded-full`}><IoCheckmark color= {isLightMode ? 'black':'white'} size={30} /></div>
        <h5 className="mb-1">{error? error :'We got your application'}</h5>
        <p>We will get back to you soon</p>
        </div>
      
      <h3 className="absolute bottom-20" >Read <span className="underline cursor-pointer"> Terms & Conditions </span></h3>
      </div>
        }
       
    </div>
  );
}
