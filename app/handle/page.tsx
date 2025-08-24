'use client'

import { FiCheck } from 'react-icons/fi'
import { useDispatch, useSelector } from 'react-redux'
import { useState } from 'react'
import ButtonLoader from '../Components/ButtonLoader'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { setHandleAction } from '../store/actions/auth'
import { useAuth } from '../Context/AuthContext'

export default function Handle() {
  const [errorMessage, setErrorMessage] = useState('')
  const [loading, setLoading] = useState(false)
  const [handle, setHandle] = useState('')
  const [error, setError] = useState(false)

  const dispatch = useDispatch()
  const router = useRouter()

  // const { user } = useSelector((state: any) => state.auth)

  const { user } = useAuth()


  // Conditions
  const containsValidChars = /^[a-zA-Z0-9._]+$/.test(handle) // only allowed chars
  const noStartEndPeriod = !/^\./.test(handle) && !/\.$/.test(handle) // no start/end period
  const maxLength = handle.length <= 12 // at most 30 chars (insta-like)
  const allLowercase = handle === handle.toLowerCase() // must be lowercase
  const hasLetter = /[a-zA-Z]/.test(handle) // contains letter
  const minLength = handle.length >= 3 // at least 3 chars (insta-like)
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
    <div className="h-screen w-screen bg-[#030303] flex">
      <Image
        className="w-8 absolute left-2 top-2 rounded-xl"
        src={'/logo.png'}
        width={50}
        height={50}
        alt="log"
      />

      <div className="h-screen flex items-center flex-col gap-10 justify-center login w-full">
        <form onSubmit={handleSubmit} className="lg:w-[40%] w-[90%]">
          <h2 className="mb-6">Your handle is how other community members will see you.</h2>

          <input
            type="text"
            name="id"
            value={handle}
            placeholder="Enter your handle..."
            onChange={(e) => setHandle(e.target.value)}
            className={`flex-1 w-full mb-2 bg-[#131313] ${
              error ? 'border border-red-600/50' : ''
            } px-2 py-1 outline-none`}
          />

          <button
            type="submit"
            className="px-2 w-full flex items-center justify-center h-6 text-center bg-white text-black text-[14px] rounded-[2px]"
          >
            {loading ? <ButtonLoader /> : 'Continue'}
          </button>

          {/* Rules checklist */}
          <div className="steps mt-4">
            <div className="flex w-full mt-1 justify-between">
              <h2>Contains only letters, numbers, underscores and periods</h2>
              <div
                className={`oporate bg-white rounded-full h-4 w-4 flex items-center justify-center`}
                style={{ opacity: containsValidChars ? 1 : 0.5 }}
              >
                <FiCheck color="black" size={13} />
              </div>
            </div>

            <div className="flex w-full mt-1 justify-between">
              <h2>Does not start or end with a period</h2>
              <div
                className={`bg-white oporate rounded-full h-4 w-4 flex items-center justify-center`}
                style={{ opacity: noStartEndPeriod ? 1 : 0.5 }}
              >
                <FiCheck color="black" size={13} />
              </div>
            </div>
<div className="flex w-full mt-1 justify-between">
  <h2>Only lowercase letters</h2>
  <div
    className={`bg-white oporate rounded-full h-4 w-4 flex items-center justify-center`}
    style={{ opacity: allLowercase ? 1 : 0.5 }}
  >
    <FiCheck color="black" size={13} />
  </div>
</div>
            <div className="flex w-full mt-1 justify-between">
              <h2>Contains at least one letter</h2>
              <div
                className={`bg-white oporate rounded-full h-4 w-4 flex items-center justify-center`}
                style={{ opacity: hasLetter ? 1 : 0.5 }}
              >
                <FiCheck color="black" size={13} />
              </div>
            </div>

            <div className="flex w-full mt-1 justify-between">
              <h2>Minimum 3 characters</h2>
              <div
                className={`bg-white oporate rounded-full h-4 w-4 flex items-center justify-center`}
                style={{ opacity: minLength ? 1 : 0.5 }}
              >
                <FiCheck color="black" size={13} />
              </div>
            </div>

            <div className="flex w-full mt-1 justify-between">
              <h2>Maximum 12 characters</h2>
              <div
                className={`bg-white oporate rounded-full h-4 w-4 flex items-center justify-center`}
                style={{ opacity: maxLength ? 1 : 0.5 }}
              >
                <FiCheck color="black" size={13} />
              </div>
            </div>
          </div>
        </form>

        <p
          className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{ color: 'red' }}
        >
          {errorMessage}
        </p>
      </div>
    </div>
  )
}
