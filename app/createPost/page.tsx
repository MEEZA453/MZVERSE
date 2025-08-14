'use client'
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { createPostAction } from "../store/actions/post";
import { useRouter } from "next/navigation";
import ImageInput from "../Components/ImageInput";
import ButtonLoaderWhite from "../Components/ButtonLoaderWhite";
import ButtonLoader from "../Components/ButtonLoader";


type ErrorState = {
  nameError: boolean;
catagoryError : boolean;
  imagesError: boolean;

};

const CreatePost: React.FC = () => {
    console.log('creating ')
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
      const [image, setSelectedImage] = useState([]);
      const [selectedVoteFields, setSelectedVoteFields] = useState<string[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    hashtags: [],

   
  });

  const [error, setError] = useState<ErrorState>({
    nameError: false,

    imagesError: false,
    catagoryError : false,


  });

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
  const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    console.log(formData , image)
    event.preventDefault();



    const newErrors: ErrorState = {
      nameError: formData.name.trim() === "",
     catagoryError : formData.category.trim()=== '',
      imagesError: image.length < 1,
  
    };

    setError(newErrors);



    if (
      newErrors.nameError ||
      newErrors.imagesError ||
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
            router.push("/AllAssets");
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
    
    <div className="">

    <form onSubmit={formSubmit} className="lg:flex px-2">
         
            <section className=''>
             <ImageInput  error = {error.imagesError }selectedImage={image} setSelectedImage={setSelectedImage} />
     
      </section>
      <div className="w-full  lg:mt-20">
<h6 className="mb-1">Field of judgement:</h6>
<div className="w-full gap-1  grid grid-cols-2">
  {["creativity", "aesthetics", "composition", "emotion"].map(field => (
    <div  
    className="h-20 px-2 py-1 border-[#2c2b2b] border rounded "
 typeof="button"
    key={field}
    onClick={() => toggleVoteField(field)}
    style={{
      background: selectedVoteFields.includes(field) ? "white" : "#101010",
       color: selectedVoteFields.includes(field) ? "black" : "white"
    }}
    >
      <h5  >

      {field}
      </h5>
    </div>
  ))}
</div>
<p style={{fontSize : '13px'}} className="mt-1 w-80">This field of judgement determine in how many bases other artiest can judge you.</p>
<div className="mt-2 ">
  <h6>name:</h6>
      <input
        type="text"
        name="name"
        
        value={formData.name}
        className={`py-2  border-[#2c2b2b] border ${error.nameError ?  'border border-red-600':null} rounded-[2px] w-full bg-[#101010]`}
        onChange={handleChange}
        />
        </div>
<div className="mt-2 ">
  <h6>Catagory:</h6>
   <input
  type="text"
          className={`p-2  border-[#2c2b2b] border ${error.catagoryError ? 'border border-red-600':null} rounded-[2px] w-full bg-[#101010]`}
  name="category" // ✅ must match formData key
  placeholder="Design / poster design"
  value={formData.category}
  onChange={handleChange}
/>
</div>

<div className="mt-2 ">
  <h6>Description:</h6>
      <textarea
        name="description"
                className={`p-2  border-[#2c2b2b] border rounded-[2px] w-full bg-[#101010]`}
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        />
</div>
  

     <button type="submit" className=" text-black flex w-full h-7 items-center justify-center bg-white px-2.5 py-0.5 rounded-[2px] mx">{loading ?<ButtonLoader/>:'Share'}</button>
  </div>

    </form>
        </div>
  );
};

export default CreatePost;
