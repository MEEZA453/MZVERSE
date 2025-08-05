'use client'

import { RxCross2 } from "react-icons/rx";
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from "../Context/AuthContext";
import { useRouter } from 'next/navigation';
import { login } from '../store/actions/auth'; // ⬅️ Assuming this is your Redux login action
interface MasterNavberProps {
  setShowLoginInput: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login({ setShowLoginInput }: MasterNavberProps) {
  const router = useRouter();
  const dispatch = useDispatch();
const {setUserData
} = useAuth()
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (id.trim() === '' || password.trim().length < 6) {
      setErrorMessage('Please enter a valid ID and password (min 6 chars).');
      return;
    }

    try {
      const response = await dispatch(login({ id, password }) as any);

      if (response?.token) {
        console.log(response)
        setUserData(response)
        setShowLoginInput(false)
        // router.push('/' + id);
      } else {
        setErrorMessage('Invalid credentials');
      }
    } catch (err: any) {
      setErrorMessage(err.message|| 'Login failed');
    }
  };

  return (
    <div className="lg:w-94 w-80 flex-col flex justify-between relative top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 px-2 py-1 pb-2 rounded h-46 bg-[#252525]">
      <div className="flex justify-between items-center w-full">
        <h6 className="ml-18">Be a part of the community.</h6>
        <RxCross2 onClick={() => setShowLoginInput(false)} />
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex items-center gap-2">
          <p className="w-20">ID:</p>
          <input
            onChange={(e) => setId(e.target.value)}
            type="text"
            placeholder="mzco.creative"
            className="flex-1 bg-[#131313] px-2 py-0.5 outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <p className="w-20">Password:</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Wv123@deR2"
            className="flex-1 outline-none bg-[#131313] px-2 py-0.5"
          />
        </div>

        {errorMessage && (
          <p  style={{color : 'red'}}className=" text-sm pl-20">{errorMessage}</p>
        )}

        <a>I don&apos;t have an account</a>

        <div className="text-right">
          <button type="submit" className="px-2 bg-white text-black text-[15px] rounded-[2px]">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
