'use client'

import Image from "next/image"
import ButtonLoader from "../Components/ButtonLoader"
import { useState, useEffect } from "react"
import { useDispatch } from "react-redux"
import { updateProfileAction } from "../store/actions/auth"
import { useRouter } from "next/navigation"
import { useAuth } from "../Context/AuthContext"
import { useThemeContext } from "../Context/ThemeContext"
import ButtonLoaderWhite from "../Components/ButtonLoaderWhite"

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
  const [errorMessage, setErrorMessage] = useState("No error")
  const [loading, setLoading] = useState(false)
  const {isLightMode} = useThemeContext()
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
  if (!user || !user._id || !user.token) {
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
      router.push("/") // redirect after update
    } catch (error: any) {
      setErrorMessage(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`h-screen w-screen ${isLightMode ? 'bg-white' : 'bg-[#030303]'} flex items-center justify-center`}>
      <h5 className="text-center absolute top-[15vh]">Configure your profile</h5>
      <form onSubmit={handleSubmit} className="lg:w-[34%] w-[90%] flex flex-col gap-2">

        {/* Profile Image */}
        <div className="flex flex-col items-center gap-1">
          <Image
            src={preview}
            className="h-25 w-25 rounded-full object-cover"
            height={1000}
            width={1000}
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
          <label style={{fontWeight : 300,letterSpacing : 0.1}} htmlFor="upload-button"  className="text-[14px] mr-[5px] cursor-pointer">Upload</label>
        </div>

        {/* Display Name */}
        <div>
          <h3>name:</h3>
          <input
            type="text"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className={`w-full mt-1 rounded-[3px] ${isLightMode ? 'bg-[#ededed] border-[#dadada] border': 'bg-[#131313]'} px-2 py-1 outline-none`}
          />
        </div>

        {/* Website */}
        <div>
          <h3>Passion:</h3>
          <input
            type="text"
            value={website}
            onChange={(e) => setWebsite(e.target.value)}
            placeholder="eg: Designer"
            className="w-full mt-1 rounded-[3px] bg-[#131313] px-2 py-1 outline-none"
          />
        </div>

        {/* Instagram */}
        <div>
          <h3>Instagram:</h3>
          <input
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}

            placeholder="@"
            className="w-full mt-1 rounded-[3px] bg-[#131313] px-2 py-1 outline-none"
          />
        </div>

        {/* Bio */}
        <div>
          <h3>Bio:</h3>
          <input
          
            type="text"
            placeholder="Tell about yourself "
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            maxLength={50}
            className="w-full mt-1 rounded-[3px] bg-[#131313] px-2 py-1 outline-none"
          />

        </div>
  {  <p 
          className="mt-1 mb-1.5"
          style={{ color: 'red' , opacity : errorMessage != 'No error' ? 1 : 0}}
        >
          {errorMessage}
        </p>}

        <button
          type="submit"
          style={{color : isLightMode ? 'white':'black', backgroundColor: isLightMode ? 'black':'white'}}
          className="px-2 w-full flex items-center justify-center h-6  mt-0  rounded-[2px]"
        >
          {loading ?<ButtonLoader color={isLightMode ? "rgba(255, 255, 255, 0.6)":'rgba(0, 0, 0, 0.6)'}/> : "Continue"}
        </button>
      </form>
    </div>
  )
}
