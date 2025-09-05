'use client'

import { useState } from "react"
import ButtonLoader from "../Components/ButtonLoader"
import Image from "next/image"
import { useDispatch } from "react-redux"
import { googleLoginAction, sendEmailOtpAction } from "../store/actions/auth"
import { useRouter } from "next/navigation"
import { AppDispatch } from "../store/store"
import { useGoogleLogin } from "@react-oauth/google"

export default function SignIn() {
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter()

  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [error, setError] = useState(false)

  // ✅ Custom Google login
const login = useGoogleLogin({
  flow: "auth-code", // <-- use auth-code instead of implicit
  onSuccess: async (response) => {
    console.log('Auth Code Response:', response); // response.code contains the auth code
    try {
      setLoading(true);

      // Send the auth code to your backend
      const result = await dispatch(googleLoginAction(response.code));

      // Handle navigation
      if (result?.isAlreadyUser && result?.handle) {
        window.location.href = "/"; // existing user
      } else {
        router.push("/handle"); // new user setup
      }
    } catch (err: any) {
      console.log(err);
      setErrorMessage(err.message || "Google login failed");
    } finally {
      setLoading(false);
    }
  },
  onError: () => setErrorMessage("Google login failed"),
});

  // ✅ Email OTP
  const handleSendOtp = async () => {
    setErrorMessage("")
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError(true)
      setErrorMessage("Please enter a valid email")
      return
    }
    try {
      setLoading(true)
      await dispatch(sendEmailOtpAction(email))
      router.push(`/otp?email=${encodeURIComponent(email)}`)
    } catch (err: any) {
      setErrorMessage(err.message || "Failed to send OTP")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-screen bg-[#030303] flex">
      <Image className="w-8 absolute left-2 top-2 rounded-xl" src={'/logo.png'} width={50} height={50} alt="log"/>

      <div className="h-screen flex items-center flex-col gap-10 justify-center login w-full">
        <h3 className="">Please sign in to continue</h3>
        <form className="lg:w-[28%] relative w-[80%]" onSubmit={(e) => e.preventDefault()}>

          {/* 🔥 Custom Google Button */}
          <button
            id="google"
            type="button"
            onClick={() => login()} // trigger Google login
            className="px-2 o google mb-4 w-full flex items-center justify-center h-7 text-center bg-[#131313] text-black text-[14px] rounded-[2px]"
          >
            {loading ? (
              <ButtonLoader />
            ) : (
              <Image src='/google.webp' className='w-4 object-cover' height={50} width={50} alt='google'/>
            )}
          </button>

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

        
        </form>
        {errorMessage && <p style={{color:'red'}} className="absolute top-2/3 left-1/2 -translate-x-1/2 -translate-y-1/2 text-red-500">{errorMessage}</p>}
      </div>
    </div>
  )
}
