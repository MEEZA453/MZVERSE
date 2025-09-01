'use client'
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { createPostAction } from "../store/actions/post";
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
type ErrorState = {
  nameError: boolean;
catagoryError : boolean;
  imagesError: boolean;
  fieldError : boolean;

};

const CreatePost: React.FC = () => {
    console.log('creating ')
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
      const [image, setSelectedImage] = useState([]);
      const [selectedVoteFields, setSelectedVoteFields] = useState<string[]>([]);
      console.log(selectedVoteFields)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    hashtags: [],

   
  });
const [isFullImage  , setFullImage] = useState(false)
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
    payload.append("voteFields", JSON.stringify(selectedVoteFields));
        payload.append("hashtags", JSON.stringify(formData.hashtags));
        image.forEach((file) => payload.append("images", file));
    try {
      const user = localStorage.getItem("profile");
      if (user) {
        const parsedUser = JSON.parse(user);
        const token = parsedUser.token;
        setLoading(true);
        dispatch(createPostAction(payload, token))
          .then(() => {
            setLoading(false);
            router.push("/");
          })
          .catch((err) => {
            setLoading(false);
            console.error(err);
          });
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
        
<MobileImageInput  isFullImage = {isFullImage} setFullImage = {setFullImage} error = {error.imagesError }selectedImage={image} setSelectedImage={setSelectedImage} />
    <div className="w-">

</div>
      </section>
      <div className="w-full lg:w-[30vw] min:w-[20vw] lg:border border-[#1d1d1d] lg:h-[60vh] px-4 pt-2 bg-black lg:mt-4">
      
{/* <h3 className="mb-3">Field of judgement:</h3> */}


<div className="mt-2 ">
  <h3>name:</h3>
      <input
        type="text"
        name="name"
        
        value={formData.name}
        className={`py-1 mt-1 px-2 border-[#2c2b2b] border bg-[#101010] ${error.nameError ?  'border border-red-500/50':null} rounded-[2px] w-full `}
        onChange={handleChange}
        />
        </div>

<div   className="flex w-full mb-1   gap-1 text-[14px] items-center">Judgement on<FiEdit3 className="mt-1"/></div>

        <div className="judgements">

<div  className={`w-full gap-1 relative ${error.fieldError ? 'border-red-500/50':'border-[#1c1b1b]'}  px-2   border flex rounded-[4px] pt-5 pb-2 flex`}>
  


  {["creativity", "aesthetics", "composition", "emotion"].map((field , i) => (
    <button onClick={()=>toggleVoteField(field)}
                    key={i}
                    type="button"
                    className={`text-[13.5px] bg-[#2d2d2d] px-1 text-[#dadada] flex items-center  ${
                  selectedVoteFields.includes(field)
                    ? "bg-white text-black"
                    : "bg-[#0d0d0d] text-white hover:bg-[#2a2a2a]"
                } text-black rounded-[2px] px-1.5`}
                  >
                   {field}
                  
                  </button>
  ))}

</div>

</div>

        



<CategorySelect formData = { formData} setFormData = {setFormData} error = {error}/>

<div className="mt-2 ">
  <h3>Description:</h3>
      <textarea
        name="description"
        className={`py-1 mt-1  border-[#2c2b2b] border rounded-[2px] w-full bg-[#101010]`}
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        />
</div>
  

     <button type="submit" className=" text-black flex mb-8 mt-4 w-full h-7 items-center justify-center bg-white px-2.5 py-0.5 rounded-[2px] mx">{loading ?<ButtonLoader/>:'Share'}</button>
  </div>

    </form>
        </div>
        </>
  );
};

export default CreatePost;
