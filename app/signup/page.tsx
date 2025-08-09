// app/(yourpages)/signin/page.tsx or components/SignIn.tsx (TSX)
'use client'

import { useState } from "react"
import ButtonLoader from "../Components/ButtonLoader"
import Image from "next/image"
import { useDispatch } from "react-redux"
import { googleLoginAction, sendEmailOtpAction } from "../store/actions/auth"
import { useRouter } from "next/navigation"
import { AppDispatch } from "../store/store"
import { GoogleLogin } from '@react-oauth/google'

export default function SignIn() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)

  // Trigger Google login manually
  const handleGoogleLogin = async (token: string) => {
    try {
      setLoading(true)
      await dispatch(googleLoginAction(token))
      router.push('/handle')
    } catch (err: any) {
      setErrorMessage(err.message || 'Google login failed')
      setLoading(false)
    }
  }

  // Send OTP to the provided email
  const handleSendOtp = async () => {
    setErrorMessage('')
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError(true)
      setErrorMessage('Please enter a valid email')
      return
    }
    try {
      setLoading(true)
      await dispatch(sendEmailOtpAction(email))
      // navigate to otp page with email query param
      router.push(`/otp?email=${encodeURIComponent(email)}`)
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to send OTP')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-screen bg-[#030303] flex">
      <Image className="w-8 absolute left-2 top-2 rounded-xl" src={'/logo.png'} width={50} height={50} alt="log"/>

      <div className="h-screen flex items-center flex-col gap-10 justify-center login w-full">
          <h2 className="">Please sign in to continue</h2>
        <form className="lg:w-[28%] relative w-[80%]" onSubmit={(e) => e.preventDefault()}>

          {/* 🔥 Custom Google Button */}
          <button
            id="google"
            type="button"
            className="px-2 o google mb-4 w-full flex items-center justify-center h-7 text-center bg-[#131313] text-black text-[14px] rounded-[2px]"
          >
            {loading ? (
              <ButtonLoader />
            ) : (
              <Image src='/google.webp' className='w-4 object-cover' height={50} width={50} alt='google'/>
            )}
          </button>

          {/* Invisible GoogleLogin to get credential */}
          <div className="w-full opacity-0 absolute top-3">
            <GoogleLogin
              onSuccess={(response) => {
                if ((response as any).credential) {
                  handleGoogleLogin((response as any).credential)
                }
              }}
              onError={() => {
                setErrorMessage('Google login failed')
              }}
            />
          </div>

          {/* Email input */}
          <input
            type="email"
            name="id"
            value={email}
            placeholder="Enter your email address.."
            onChange={(e) => { setEmail(e.target.value); setError(false) }}
            className={`flex-1 w-full mb-2 bg-[#131313] ${error ? 'border border-red-600/50' : ''} px-2 py-1 outline-none`}
          />

          <button
            type="button"
            onClick={handleSendOtp}
            className="px-2 w-full flex items-center justify-center h-6 text-center bg-white text-black text-[14px] rounded-[2px]"
          >
            {loading ? <ButtonLoader /> : 'Connect'}
          </button>

          <div className="flex gap-1 mt-2 items-center">
            <h2>No account ?</h2><a style={{ fontSize: 13, lineHeight: -0.2 }}>Signup</a>
          </div>
        </form>
        <p className = 'absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2' style={{ color: 'red' }}>{errorMessage}</p>
      </div>
    </div>
  )
}
