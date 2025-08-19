'use client'

import Image from "next/image"
import ButtonLoader from "../Components/ButtonLoader"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateProfileAction } from "../store/actions/auth"
import { useRouter } from "next/navigation"
import { useAuth } from "../Context/AuthContext"

export default function Profile() {
  const dispatch = useDispatch()
  const router = useRouter()
  const { user } = useAuth() // current logged-in user

  const [displayName, setDisplayName] = useState("")
  const [website, setWebsite] = useState("")
  const [instagram, setInstagram] = useState("")
  const [bio, setBio] = useState("")
  const [image, setImage] = useState<File | null>(null)
  const [preview, setPreview] = useState("/image.png")
  const [errorMessage, setErrorMessage] = useState("")
  const [loading, setLoading] = useState(false)

  // Populate form with user data on page load
  useEffect(() => {
    if (user) {
      setDisplayName(user.name || "") 
      setWebsite(user.website || "")
      setInstagram(user.instagram || "")
      setBio(user.bio || "")
      setPreview(user.profile || "/image.png") // user's profile image
    }
  }, [user])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImage(file)
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  if (!user) {
    setErrorMessage("You must be logged in to update your profile.")
    return
  }

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
      await dispatch(updateProfileAction(user._id, formData, user .token) as any)
      setErrorMessage("")
      router.push("/feed") // redirect after update
    } catch (error: any) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="h-screen w-screen bg-[#030303] flex items-center justify-center">
      <form onSubmit={handleSubmit} className="lg:w-[34%] w-[90%] flex flex-col gap-4">

        {/* Profile Image */}
        <div className="flex flex-col items-center gap-2">
          <Image
            src={preview}
            className="h-25 w-25 rounded-full object-cover"
            height={100}
            width={100}
            alt="profile"
          />
          <input
            type="file"
            id="upload-button"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            className="hidden"
          />
          <label style={{fontFamily : 'inter',letterSpacing : 0.1}} htmlFor="upload-button" className="text-[14px] mr-1.5 cursor-pointer">Upload</label>
        </div>

        {/* Display Name */}
        <div>
          <h3>Display name</h3>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full rounded-[3px] bg-[#131313] px-2 py-1 outline-none"
          />
        </div>

        {/* Website */}
        <div>
          <h3>Website (Optional)</h3>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="https://"
            className="w-full rounded-[3px] bg-[#131313] px-2 py-1 outline-none"
          />
        </div>

        {/* Instagram */}
        <div>
          <h3>Instagram handle (Optional)</h3>
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="@"
            className="w-full rounded-[3px] bg-[#131313] px-2 py-1 outline-none"
          />
        </div>

        {/* Bio */}
        <div>
          <h3>Bio (Optional)</h3>
          <input
            type="text"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={50}
            className="w-full rounded-[3px] bg-[#131313] px-2 mb-1 py-1 outline-none"
          />
          <p className="text-right text-xs">50 character maximum</p>
        </div>

        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}

        <button
          type="submit"
          className="px-2 w-full flex items-center justify-center h-7 bg-white text-black rounded-[2px]"
        >
          {loading ? <ButtonLoader /> : "Continue"}
        </button>
      </form>
    </div>
  )
}
