'use client'

import { FiCheck } from 'react-icons/fi'
import { useDispatch } from 'react-redux'
import { useState } from 'react'
import ButtonLoader from '../Components/ButtonLoader'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { setHandleAction } from '../store/actions/auth'
import { useAuth } from '../Context/AuthContext'

export default function Handle() {
  const [errorMessage, setErrorMessage] = useState('No error')
  const [loading, setLoading] = useState(false)
  const [handle, setHandle] = useState('')
  const [error, setError] = useState(false)
  const [focused, setFocused] = useState(false) // ✅ track input focus

  const dispatch = useDispatch()
  const router = useRouter()
  const { user } = useAuth()

  // Conditions
  const containsValidChars = /^[a-zA-Z0-9._]+$/.test(handle)
  const noStartEndPeriod = !/^\./.test(handle) && !/\.$/.test(handle)
  const maxLength = handle.length <= 12
  const allLowercase = handle === handle.toLowerCase()
  const hasLetter = /[a-zA-Z]/.test(handle)
  const minLength = handle.length >= 3

  const validateHandle = () => {
    if (handle) {
      return (
        containsValidChars &&
        noStartEndPeriod &&
        hasLetter &&
        minLength &&
        maxLength &&
        allLowercase
      )
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateHandle()) {
      setError(true)
      setErrorMessage('Invalid handle format.')
      return
    }

    if (!user || !user._id || !user.token) {
      setError(true)
      setErrorMessage('User not logged in.')
      return
    }

    try {
      setLoading(true)
      setError(false)
      await dispatch<any>(setHandleAction(user?._id, handle, user?.token))
      window.location.href = window.location.origin + '/profile'
    } catch (err: any) {
      setError(true)
      setErrorMessage(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen w-screen bg-[#030303] flex overflow-y-auto">
      <Image
        className="w-8 absolute left-2 top-2 rounded-xl"
        src={'/logo.png'}
        width={50}
        height={50}
        alt="log"
      />

      <div
        className={`h-screen flex items-center flex-col gap-10 justify-center login w-full transition-transform duration-300`}
        style={{
          transform: focused ? 'translateY(-140px)' : 'translateY(0px)', // ✅ push up on focus
        }}
      >
        <form onSubmit={handleSubmit} className="lg:w-[40%] w-[90%]">
          <h5 className="mb-6 text-center">Claim your handle</h5>

          <input
            type="text"
            name="id"
            value={handle}
            placeholder="Enter your handle..."
            onChange={(e) => setHandle(e.target.value)}
            onFocus={() => setFocused(true)}   // ✅ move up
            onBlur={() => setFocused(false)}   // ✅ reset back
            className={`flex-1 w-full mb-2 bg-[#131313] ${
              error ? 'border border-red-600/50' : 'border border-red-600/0'
            } px-2 py-1 outline-none`}
          />

          <button
            type="submit"
            className="px-2 w-full flex items-center justify-center h-6 text-center bg-white text-black text-[14px] rounded-[2px]"
          >
            {loading ? <ButtonLoader /> : 'Continue'}
          </button>

          <p
            className="mt-1"
            style={{ color: 'red', opacity: errorMessage != 'No error' ? 1 : 0 }}
          >
            {errorMessage}
          </p>

          {/* Rules checklist */}
          <div className="steps mt-1.5">
            <div className="flex w-full mt-1 justify-between">
              <p>Contains only letters, numbers, underscores and periods</p>
              <div
                className="oporate bg-white rounded-full h-4 w-4 flex items-center justify-center"
                style={{ opacity: containsValidChars ? 1 : 0.5 }}
              >
                <FiCheck color="black" size={13} />
              </div>
            </div>

            <div className="flex w-full mt-1 justify-between">
              <p>Does not start or end with a period</p>
              <div
                className="bg-white oporate rounded-full h-4 w-4 flex items-center justify-center"
                style={{ opacity: noStartEndPeriod ? 1 : 0.5 }}
              >
                <FiCheck color="black" size={13} />
              </div>
            </div>

            <div className="flex w-full mt-1 justify-between">
              <p>Only lowercase letters</p>
              <div
                className="bg-white oporate rounded-full h-4 w-4 flex items-center justify-center"
                style={{ opacity: allLowercase ? 1 : 0.5 }}
              >
                <FiCheck color="black" size={13} />
              </div>
            </div>

            <div className="flex w-full mt-1 justify-between">
              <p>Contains at least one letter</p>
              <div
                className="bg-white oporate rounded-full h-4 w-4 flex items-center justify-center"
                style={{ opacity: hasLetter ? 1 : 0.5 }}
              >
                <FiCheck color="black" size={13} />
              </div>
            </div>

            <div className="flex w-full mt-1 justify-between">
              <p>Minimum 3 characters</p>
              <div
                className="bg-white oporate rounded-full h-4 w-4 flex items-center justify-center"
                style={{ opacity: minLength ? 1 : 0.5 }}
              >
                <FiCheck color="black" size={13} />
              </div>
            </div>

            <div className="flex w-full mt-1 justify-between">
              <p>Maximum 12 characters</p>
              <div
                className="bg-white oporate rounded-full h-4 w-4 flex items-center justify-center"
                style={{ opacity: maxLength ? 1 : 0.5 }}
              >
                <FiCheck color="black" size={13} />
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}
