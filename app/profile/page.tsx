'use client'

import Image from "next/image"
import ButtonLoader from "../Components/ButtonLoader"
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { updateProfileAction } from "../store/actions/auth"
import { useRouter } from "next/navigation"

export default function Profile() {
  const dispatch = useDispatch()
const storedUser = localStorage.getItem('profile');
const user = storedUser ? JSON.parse(storedUser) : null;
    const token = user?.token;

console.log(user);
const router = useRouter()
  const [displayName, setDisplayName] = useState("")
  const [website, setWebsite] = useState("")
  const [instagram, setInstagram] = useState("")
  const [bio, setBio] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState("/image.png")
  
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)
  
  const error = false
  
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    
    if (!displayName.trim()) {
      setErrorMessage("Display name is required.")
      return
    }
    
    const formData = new FormData()
    formData.append("displayName", displayName)
    formData.append("website", website)
    formData.append("instagram", instagram)
    formData.append("bio", bio)
    if (image) formData.append("image", image)
    try {
      setLoading(true)
      await dispatch(updateProfileAction(user?._id, formData , token) as any)
      setErrorMessage("")
    } catch (error: any) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
      window.location.href = window.location.origin +'/AllAssets';
    }
  }

  return (
    <div className="h-screen w-screen bg-[#030303] flex">
      {/* {typeof window !== 'undefined' && window.innerWidth > 640 ? (
        <div className="h-screen w-[70vw] border-r border-[#4d4d4d]"></div>
      ) : null} */}

      <Image className="w-8 absolute left-2 top-2 rounded-xl" src={'/logo.png'} width={50} height={50} alt="log" />

      <div className="h-screen flex items-center flex-col gap-10 justify-center login w-full">
        <form onSubmit={handleSubmit} className="lg:w-[34%] w-[80%]">

          <div className="image flex flex-col items-center gap-2">
            <Image src={preview} className="h-25 w-25 rounded-full object-cover" height={100} width={100} alt="profile" />

            <input
              type="file"
              id="upload-button"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />

            <label htmlFor="upload-button">Upload</label>
          </div>

          <div className="mb-2">
            <h3>Display name</h3>
            <input
              type="text"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              placeholder=""
              className={`flex-1 w-full bg-[#131313] mb-0.5 ${error ? 'border border-red-600/50' : ''} px-2 py-1 outline-none`}
            />
          </div>

          <div>
            <h3 className="mb-1">Website (Optional)</h3>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://"
              className={`flex-1 w-full mb-2 bg-[#131313] ${error ? 'border border-red-600/50' : ''} px-2 py-1 outline-none`}
            />
          </div>

          <div>
            <h3 className="mb-1">Instagram handle (Optional)</h3>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              placeholder="@"
              className={`flex-1 w-full mb-2 bg-[#131313] ${error ? 'border border-red-600/50' : ''} px-2 py-1 outline-none`}
            />
          </div>

          <div className="mb-2">
            <h3 className="mb-1">Bio (Optional)</h3>
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder=""
              maxLength={50}
              className={`flex-1 w-full text-right bg-[#131313] ${error ? 'border border-red-600/50' : ''} px-2 py-1 outline-none`}
            />
            <h2 className="text-right">50 character at maximum</h2>
          </div>

          <p className = 'absolute bottom-[20%] left-1/2 -translate-x-1/2 -translate-y-1/2' style={{ color: 'red' }}>{errorMessage}</p>

          <button
            type="submit"
            className="px-2 w-full flex items-center justify-center h-6 text-center bg-white text-black text-[14px] rounded-[2px]"
          >
            {loading ? <ButtonLoader /> : 'Continue'}
          </button>

          <div className="flex gap-1 mt-2 items-center">
            <h2>No account ?</h2>
            <a style={{ fontSize: 13, lineHeight: -0.2 }}>Signup</a>
          </div>
        </form>
      </div>
    </div>
  )
}
