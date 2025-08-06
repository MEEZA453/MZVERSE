'use client'

import { useState } from "react"
import ButtonLoader from "../Components/ButtonLoader"
import Image from "next/image"
import { useDispatch } from "react-redux"
import { googleLoginAction } from "../store/actions/auth"
import { useRouter } from "next/navigation"
import { AppDispatch } from "../store/store"
import { useGoogleLogin , GoogleLogin} from '@react-oauth/google'

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
// const login = useGoogleLogin({
//   onSuccess: async (tokenResponse) => {
//     if (tokenResponse.access_token) {
//       await handleGoogleLogin(tokenResponse.access_token)
//     }
//   },
//   onError: () => {
//     setErrorMessage('Google login failed')
//   },
// })
  return (
    <div className="h-screen w-screen bg-[#030303] flex">
      
      {typeof window !== 'undefined' && window.innerWidth > 640 ? (
        <div className="h-screen w-[70vw] border-r border-[#4d4d4d]"></div>
      ) : null}

      <Image className="w-8 absolute left-2 top-2 rounded-xl" src={'/logo.png'} width={50} height={50} alt="log"/>

       
      <div className="h-screen flex items-center flex-col gap-10 justify-center login w-full">
        <form className="lg:w-[28%] relative w-[80%]" onSubmit={(e) => e.preventDefault()}>
          <h2 className="mb-2 ml-23 lg:ml-19">Please sign in to continue</h2>

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
   <div className="w-full opacity-0 absolute top-3">
            <GoogleLogin
              onSuccess={(response) => {
                if (response.credential) {
                  handleGoogleLogin(response.credential)
                }
              }}
              onError={() => {
                setErrorMessage('Google login failed')
              }}
            />
          </div>
          {/* Optional email input (only use if you really want user to confirm email) */}
          <input
            type="text"
            name="id"
            value={email}
            placeholder="Enter you email address.."
            onChange={(e) => setEmail(e.target.value)}
            className={`flex-1 w-full mb-2 bg-[#131313] ${error ? 'border border-red-600/50' : ''} px-2 py-1 outline-none`}
          />

          <p style={{ color: 'red' }}>{errorMessage}</p>

          <button
            type="submit"
            className="px-2 w-full flex items-center justify-center h-6 text-center bg-white text-black text-[14px] rounded-[2px]"
          >
            {loading ? <ButtonLoader /> : 'Connect'}
          </button>

          <div className="flex gap-1 mt-2 items-center">
            <h2>No account ?</h2><a style={{ fontSize: 13, lineHeight: -0.2 }}>Signup</a>
          </div>
        </form>
      </div>
    </div>
  )
}
