'use client'

import { useState, useEffect, useRef } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { useDispatch } from "react-redux"
import { verifyEmailOtpAction, resendEmailOtpAction } from "../store/actions/auth"
import { AppDispatch } from "../store/store"
import ButtonLoader from "../Components/ButtonLoader"
import { LuPenLine } from "react-icons/lu";
import { Suspense } from "react";
import Image from "next/image"
// import { useAuth } from "../Context/AuthContext"
export default function OtpPage() {
  // const {user} =  useAuth()
  const params = useSearchParams()
   console.log(params)
  const router = useRouter()
  const dispatch = useDispatch<AppDispatch>()
  const [email, setEmail] = useState("")

  const [otpValues, setOtpValues] = useState(Array(6).fill(''))
  const [loading, setLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState('')
  const [timer, setTimer] = useState(30) // 30s countdown
  const inputsRef = useRef<(HTMLInputElement | null)[]>([])
  const searchParams = useSearchParams();
  useEffect(() => {
    const emailFromParams = searchParams.get("email") || "";
    if (emailFromParams) {
      setEmail(emailFromParams);
    } else {
      // delay redirect to client phase to avoid SSR crash
      router.push("/signin");
    }
  }, [searchParams, router]);
  // Countdown for resend
  useEffect(() => {
    if (timer > 0) {
      const countdown = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(countdown)
    }
  }, [timer])

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otpValues]
      newOtp[index] = value
      setOtpValues(newOtp)

      if (value && index < 5) {
        inputsRef.current[index + 1]?.focus()
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      inputsRef.current[index - 1]?.focus()
    }
  }

  const handleVerify = async () => {
    setErrorMsg('')
    const otp = otpValues.join('')
    if (!/^\d{6}$/.test(otp)) {
      setErrorMsg('Enter a valid 6-digit OTP')
      return
    }
    try {
      setLoading(true)
      await dispatch(verifyEmailOtpAction({ email, otp }))
      // user.handle ? router.push('/profile'): router.push('/handle')
     router.push('/handle')
    } catch (err: any) {
      setErrorMsg(err.message || 'OTP verification failed')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    if (timer > 0) return // prevent resend until timer ends
    try {
      setLoading(true)
      await dispatch(resendEmailOtpAction(email))
      setErrorMsg('OTP resent — check your mailbox')
      setTimer(30) // restart timer
    } catch (err: any) {
      setErrorMsg(err.message || 'Resend failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Suspense><div className="h-screen flex flex-col items-center justify-center ">
       <Image className="w-8 absolute left-2 top-2 rounded-xl" src={'/logo.png'} width={50} height={50} alt="log"/>
      <div className="flex gap-1">
        <p>{email}</p>
<LuPenLine/>
      </div>
      <div className=" p-6 rounded max-w-md w-full">

        {/* OTP boxes */}
        <div className="flex items-center justify-center  gap-4 mb-4">
          {[...Array(6)].map((_, idx) => (
            <input
              key={idx}
              maxLength={1}
              ref={(el: HTMLInputElement | null) => { inputsRef.current[idx] = el }}
              value={otpValues[idx]}
              onChange={(e) => handleChange(e.target.value, idx)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
              className="w-10 h-10 text-center rounded-[3px] bg-[#151515] text-white"
            />
          ))}
        </div>

        <button 
          onClick={handleVerify} 
          disabled={loading}
          className="px-2 w-full flex items-center justify-center h-6 text-center bg-white text-black text-[14px] rounded-[2px]"
          >
            {loading ? <ButtonLoader /> : 'Verify'}
          </button>
      

        <button 
          onClick={handleResend} 
          className={`w-full mt-3 text-sm ${timer > 0 ? 'text-[#767676]' : 'text-gray-300'}`}
          disabled={timer > 0}
        >
          {timer > 0 ? `Resend OTP in ${timer}s` : "Did'nt receive code yet? Resend"}
        </button>

        {errorMsg && <p className = 'absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2' style={{ color: 'red' }}>{errorMsg}</p>}
      </div>
    </div></Suspense>
  )
}
