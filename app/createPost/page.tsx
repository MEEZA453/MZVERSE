'use client'
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { createPostAction, editPostAction } from "../store/actions/post";
import { useRouter } from "next/navigation";
import ImageInput from "../Components/ImageInput";
import ButtonLoaderWhite from "../Components/ButtonLoaderWhite";
import ButtonLoader from "../Components/ButtonLoader";
import { RxCross2 } from "react-icons/rx";
import { FiEdit3 } from "react-icons/fi";
import MobileImageInput from "../Components/MobileImageInput";
import {AnimatePresence, motion} from 'framer-motion'
import CategorySelect from "../Components/CatagoryInput";
import VoteFieldSelector from "../Components/VoteFieldSelector";
import { useNotification } from "../Context/Notification";
import { useThemeContext } from "../Context/ThemeContext";
type ErrorState = {
  nameError: boolean;
catagoryError : boolean;
  imagesError: boolean;
  fieldError : boolean;

};

const CreatePost: React.FC = () => {
    console.log('creating ')
    const {editPost} = useSelector((state: any) => state.posts);
const {setNotification} = useNotification()
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
      const [image, setSelectedImage] = useState([]);
  const {isLightMode} = useThemeContext()
      const [selectedVoteFields, setSelectedVoteFields] = useState<string[]>([]);
      const [removedImages, setRemovedImages] = useState<string[]>([]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    hashtags: [],

   
  });
  
const handleRemoveImage = (index: number) => {
  const img = image[index];

  // If it’s an existing URL, mark it for removal
  if (typeof img === "string") {
    setRemovedImages(prev => [...prev, img]);
  }

  // Remove from selectedImage array
  setSelectedImage(prev => prev.filter((_, i) => i !== index));
};
  useEffect(() => {
  if (editPost) {
    // ✅ Pre-fill form
    setFormData({
      name: editPost.name || "",
      description: editPost.description || "",
      category: editPost.category || "",
      hashtags: editPost.hashtags || [],
    });

    setSelectedVoteFields(editPost.voteFields || []);
    setSelectedImage(editPost.images || []); // existing images (if you store URLs)
  }
}, [editPost]);
// const [isFullImage  , setFullImage] = useState(false)
const [isShowVoteField ,  setShowVoteField] = useState(false)
  const [error, setError] = useState<ErrorState>({
    nameError: false,
    fieldError : false,
    imagesError: false,
    catagoryError : false,


  });
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsMobile(window.innerWidth <= 640);
    }
  }, []);
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
   

const toggleVoteField = (field: string) => {
  setSelectedVoteFields(prev =>
    prev.includes(field) ? prev.filter(f => f !== field) : [...prev, field]
  );
};
const deleteField = (i: number) => {
  setSelectedVoteFields(prev => prev.filter((_, index) => index !== i));
};
  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(formData , image)
    event.preventDefault();



    const newErrors: ErrorState = {
      nameError: formData.name.trim() === "",
     catagoryError : formData.category.trim()=== '',
      imagesError: image.length < 1,
      fieldError : selectedVoteFields.length < 1
  
    };

    setError(newErrors);



    if (
      newErrors.nameError ||
      newErrors.imagesError ||
      newErrors.catagoryError ||
 console.log('error')
    ) {
      return;
    }

    const payload = new FormData();
    payload.append("name", formData.name);
    payload.append("description", formData.description);
    payload.append("category", formData.category);
    if (removedImages.length > 0) {
  payload.append("removeImages", JSON.stringify(removedImages));
}
    payload.append("voteFields", JSON.stringify(selectedVoteFields));
        payload.append("hashtags", JSON.stringify(formData.hashtags));
        image.forEach((file) => payload.append("images", file));
    try {
    const user = localStorage.getItem("profile");
    if (user) {
      const parsedUser = JSON.parse(user);
      const token = parsedUser.token;
      setLoading(true);

      if (editPost) {
        // ✅ EDIT FLOW
        dispatch(editPostAction(editPost._id, payload, token))
          .then(() => {
            setLoading(false);
            router.push("/");
          })
       
          .catch((err: any) => {
            setLoading(false);
            console.error(err);
          });
      } else {
        // ✅ CREATE FLOW
        dispatch(createPostAction(payload, token))
          .then(() => {
            setLoading(false);
            router.push("/");
          })
               .then(() => {
        setNotification('postCreated')
        
          })
          .catch((err: any) => {
            setLoading(false);
            console.error(err);
          });
      }
    }
  } catch (err) {
      setLoading(false);
      console.error("Invalid JSON in localStorage", err);
    }
  };




  return (
    <>


    <div className="h-screen w-screen lg:flex justify-center  relative overflow-hidden">

    <form onSubmit={formSubmit} className="lg:flex lg:px-2  lg:gap-2 mt-10">
         
            <section className=''>
        
<MobileImageInput   handleRemove={handleRemoveImage}  error = {error.imagesError }selectedImage={image} setSelectedImage={setSelectedImage} />
    <div className="w-">

</div>
      </section>
      <div className={`w-full lg:w-[30vw] min:w-[20vw] lg:border  lg:h-[60vh] ${isLightMode ? 'bg-white border-[#dadada]':'bg-black border-[#1d1d1d]'} px-4 pt-2 bg-black lg:mt-4`}>
      
{/* <h3 className="mb-3">Field of judgement:</h3> */}


<div className="mt-2 ">
  <h3>name:</h3>
      <input
        type="text"
        name="name"
       style={{
  border: error.nameError ? '1px solid rgba(255, 0, 0, 0.5)' : null
}}
        value={formData.name}
        className={`py-1 mt-1 px-2 border-[#2c2b2b] border bg-[#101010] rounded-[2px] w-full `}
        onChange={handleChange}
        />
        </div>

<div   className="flex w-full mb-1   gap-1 text-[14px] items-center">Judgement on<FiEdit3 className="mt-1"/></div>

        <div className="judgements">

<div  className={`w-full gap-1 relative ${error.fieldError ? 'border-red-500/50':isLightMode ?'border-[#dadada]':'border-[#1c1b1b]'}  px-2   border flex rounded-[4px] pt-5 pb-2 flex`}>
  


  {["creativity", "aesthetics", "composition", "emotion"].map((field , i) => (
    <button onClick={()=>toggleVoteField(field)}
                    key={i}
                    type="button"
                    style={{
                       backgroundColor: selectedVoteFields.includes(field)
      ? isLightMode
        ? '#000000'
        : '#2d2d2d'
      : isLightMode
      ? '#dadada'
      : '#0d0d0d',
    color: selectedVoteFields.includes(field)
      ? isLightMode
        ? '#ffffff'
        : '#dadada'
      : isLightMode
      ? '#000000'
      : '#ffffff',
  }}
                  
                    className={`text-[13.5px] px-1 flex items-center  SS text-black rounded-[2px] px-1.5`}
                  >
                   {field}
                  
                  </button>
  ))}

</div>

</div>

        



<CategorySelect formData = { formData} setFormData = {setFormData} error = {error.catagoryError}/>

<div className="mt-2 ">
  <h3>Description:</h3>
      <textarea
        name="description"
        className={`py-1 mt-1 border rounded-[2px] w-full `}
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        />
</div>
  

     <button type="submit" style={{color: isLightMode ? 'white':'black' , backgroundColor:isLightMode ? 'black':'white'}} className=" text-black flex mb-8 mt-4 w-full h-7 items-center justify-center bg-white px-2.5 py-0.5 rounded-[2px] mx">{loading ? <ButtonLoader color={isLightMode ? "rgba(255, 255, 255, 0.6)":'rgba(0, 0, 0, 0.6)'} /> : editPost ? 'Update' : 'Share'}</button>
  </div>

    </form>
        </div>
        </>
  );
};

export default CreatePost;
