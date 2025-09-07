'use client'
import ButtonLoaderWhite from "../Components/ButtonLoader";
import { useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { applyJury } from "../store/actions/jury";
import { useAuth } from "../Context/AuthContext";

export default function Request() {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, applied, error } = useSelector((state: any) => state.jury);

  const [message, setMessage] = useState("");
 const {token ,user} = useAuth()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!token) return; // user not logged in
    dispatch(applyJury(message, token));
  };

  return (
    <div className="bg-black w-screen h-screen fixed flex-col top-0 z-[999] flex justify-center items-center">
      <h5 className="mb-5">{user?.role ==='normal'? 'Be a jury': 'Switch to normal user'}</h5>
      <form onSubmit={handleSubmit} className="w-[98%] lg:w-160 px-3 py-2 relative">
        <textarea
          className="bg-[#0d0d0d] w-full p-2 border-[#1d1d1d] border h-20 rounded"
          placeholder="your message.."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          type="submit"
          disabled={loading}
          className="px-2 w-full flex items-center justify-center h-6 text-center mt-1 bg-white text-black text-[14px] rounded-[2px]"
        >
          {loading ? <ButtonLoaderWhite /> : 'Send request'}
        </button>
        {applied && <p className="text-green-400 text-xs mt-2">Request submitted ✅</p>}
        {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
      </form>
    </div>
  );
}
