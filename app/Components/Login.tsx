'use client'
import { RxCross2 } from "react-icons/rx";
import {useState , useEffect } from 'react'
import {useRouter} from 'next/navigation'
import {useAuth} from '../Context/AuthContext'
interface MasterNavberProps {
  setShowInput: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function Login ({setShowInput}:MasterNavberProps){
const router  = useRouter()
const [id , setId]  = useState('');
const [password , setPassword] = useState('');
const {login  }  = useAuth()
const handleSubmit = (e:React.FormEvent)=>{
    e.preventDefault();
    const success = login(id , password);
if(success) {
    router.push('/'+id)}
else alert ('Invailed credentials')
}

    return <div className="lg:w-94 w-80 flex-col flex justify-between relative top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-1 pb-2 rounded h-46 bg-[#252525]">
<div className="flex justify-between items-center w-full">
    <h6 className="ml-18">Be a part of the community.</h6>
<RxCross2 onClick={()=> setShowInput(false)}/>
</div>
<form onSubmit={handleSubmit} className="space-y-2">
  <div className="flex items-center gap-2">
    <p className="w-20">ID:</p>
    <input
    onChange={(e)=> setId(e.target.value)}
      type="text"
      placeholder="mzco.creative"
      className="flex-1 outline-none"
    />
  </div>

  <div className="flex items-center gap-2">
    <p className="w-20">Password:</p>
    <input
onChange={(e)=> setPassword(e.target.value)}
      type="password"
      placeholder="Wv123@deR2"
      className="flex-1 outline-none"
    />
  </div>
<a>I don&apos;t have an account</a>

  <div className="text-right">
    <button type="submit" className="px-2 bg-white text-black text-[15px] rounded-[2px]">
      Login
    </button>
  </div>
</form>

</div>
}