'use client'

import ProductImages from "../Components/ProductImages";
import { useState , useEffect  } from "react";
import { GoPlus } from "react-icons/go";
import ImageInput from "../Components/ImageInput";
import { LuMinus } from "react-icons/lu";
import TagInput from "../Components/TagInput";
import { editDesign, postDesign } from "../store/actions/design";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useRouter } from "next/navigation";
import { MdOutlineAttachFile } from "react-icons/md";
import { useAuth } from "../Context/AuthContext";
import ButtonLoader from "../Components/ButtonLoader";
import MobileImageInput from "../Components/MobileImageInput";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { useNotification } from "../Context/Notification";

export default function CreateProduct() {
  const currentData = useSelector((state: any) => state.design.editProduct);
   const [name, setName] = useState("");
    const [headline, setHeadline] = useState("this is the fucking headline");
const [amount, setAmount] = useState<number | "">("");
    const [url , setUrl ] = useState("")
    const [image, setSelectedImage] = useState([]);
    const [hashtags, setHashtags] = useState([]);
    const [sections, setSections] = useState([{ title: "", content: ["", ""] }]);
    const [faq , setFaq] = useState([{q : '' , a : ''} ,{q : '' , a : ''}])
    const router = useRouter()
        const {setNotification} = useNotification()
    
          const [removedImages, setRemovedImages] = useState<string[]>([]);
    const [loading , setLoading] = useState (false)
    const {user} = useAuth()
console.log(currentData)
    useEffect(() => {
  if (currentData) {
    setName(currentData.name || "");
    setHeadline(currentData.headline || "");
    setAmount(
      currentData.amount !== undefined && currentData.amount !== null
        ? Number(currentData.amount)
        : ""
    );
    setUrl(currentData.driveLink || "");
    setSelectedImage(currentData.image || []);
    setHashtags(currentData.hashtags || []);
    setSections(currentData.sections || [{ title: "", content: [""] }]);
    setFaq(currentData.faq || [{ q: "", a: "" }]);
  }
}, [currentData]);

    type ErrorState = {
  nameError: boolean;
  amountError: boolean;
  urlError : boolean;
  sectionsError: SectionError[];
  hashtagsError : boolean;
  imagesError : boolean
};
const [error, setError] = useState<ErrorState>({
  nameError: false,
  amountError: false,
  urlError : false,
  sectionsError: [],
  hashtagsError : false,
  imagesError : false
});
const dispatch = useDispatch<AppDispatch>();
    // Fetch designs using getDesign
    // useEffect(() => {
    //   dispatch(getDesign(1)); // Fetch first page; extend if you awant all pages
    // }, [dispatch]);
  const handleRemoveImage = (index: number) => {
  const img = image[index];

  // If it’s an existing URL, mark it for removal
  if (typeof img === "string") {
    setRemovedImages(prev => [...prev, img]);
  }

  // Remove from selectedImage array
  setSelectedImage(prev => prev.filter((_, i) => i !== index));
};


    const addSections = () => setSections([...sections, { title: "", content: [] }]);
  const addFaq = ()=> setFaq([...faq , {q : '' , a : ''}])
const deleteFaq = (index) => {
  setFaq(faq.filter((_, i) => i !== index));
};
    const addContent = (sectionIndex) => {
      const updated = [...sections];
      updated[sectionIndex].content.push("");
      setSections(updated);
    };
  
 const deleteContent = (sectionIndex: number) => {
  setSections(prevSections => {
    return prevSections.map((section, index) => {
      if (index !== sectionIndex) return section;
      const newContent = section.content.slice(0, -1);

      return {
        ...section,
        content: newContent,
      };
    });
  });
};

  
    const deleteSection = () => {
      if (sections.length > 1) {
        setSections(sections.slice(0, -1));
      }
    };
 
    
type SectionError = {
  title: boolean;
  content: boolean[];
};





const formSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  console.log(image);

  // Validate sections
  const sectionError: SectionError[] = sections.map((section) => {
    const titleError = section.title.trim() === "";
    const contentError = section.content.map((c) => c.trim() === "");
    return {
      title: titleError,
      content: contentError,
    };
  });

  // Overall errors
  const newErrors: ErrorState = {
    nameError: name.trim() === "",
    amountError: amount === "" || isNaN(Number(amount)),
    urlError: url.trim() === "",
    sectionsError: sectionError,
    hashtagsError: hashtags.length < 1,
    imagesError: image.length < 1,
  };

  setError(newErrors);
  console.log(newErrors);

  const hasSectionErrors = sectionError.some(
    (s) => s.title || s.content.some((c) => c)
  );

  if (
    newErrors.nameError ||
    newErrors.urlError ||
    newErrors.hashtagsError||
    newErrors.imagesError ||
    newErrors.amountError ||
    hasSectionErrors

  ) {
    return;
  }

  // Prepare FormData
  const formData = new FormData();
  formData.append("name", name);
  formData.append("driveLink", url);
  formData.append("amount", String(amount));
  image.forEach((file) => formData.append("images", file));
  formData.append("sections", JSON.stringify(sections));
  formData.append("hashtags", JSON.stringify(hashtags));
   if (removedImages.length > 0) {
  formData.append("removeImages", JSON.stringify(removedImages));
}
  try {
    const user = localStorage.getItem("profile");
    if (!user) throw new Error("User not found");

    const parsedUser = JSON.parse(user);
    const token = parsedUser.token;

    setLoading(true); // Start loader

    if (currentData?._id) {
      // 🔹 EDIT MODE
      console.log("edit mode");
      await dispatch(editDesign(currentData._id, formData, token));
    } else {
      // 🔹 CREATE MODE
      await dispatch(postDesign(formData, token));
    }

    setLoading(false); // Stop loader after API finishes
    router.push("/"); // Navigate only after API completes
    setNotification('supplyCreated')
  } catch (err: any) {
    setLoading(false);
    console.log("Error submitting form:", err.message || err);
  }
};


  return (
    <form  onSubmit={formSubmit} className='desc flex max-sm:flex-col  w-screen justify-center lg:my-10 max-sm:items-center'>
       


      <section className=''>
         <MobileImageInput  handleRemove={handleRemoveImage} error = {error.imagesError }selectedImage={image} setSelectedImage={setSelectedImage} />
         
      </section>


      <div >
        <aside className='flex flex-col items-center  border border-[#1d1d1d] rounded-xl py-7 overflow-y-auto'>
<div className="name flex gap-2 relative w-full px-2">
    <div className="w-3/4"><h6>Name:</h6>
<input value={name} onChange={(e)=> setName(e.target.value)} className={`py-1 mt-1 px-2 border-[#2c2b2b] border bg-[#101010] ${error.nameError ?  'border border-red-500/50':null} rounded-[2px] w-full `}/>
    </div>
<div  className="w-1/4"><h6>Amount:</h6>
<input
  type="number"
  value={amount}
  onChange={(e) =>
    setAmount(e.target.value === "" ? "" : Number(e.target.value))
  }
  className={`py-1 mt-1 px-2 border-[#2c2b2b] border bg-[#101010] ${
    error.amountError ? "border border-red-500/50" : ""
  } rounded-[2px] w-full `}
/>
    </div>
</div>


<div className="link w-full items-center px-2 mt-2 flex">
  <div className="flex rounded-l-[2px] items-center justify-center  w-10 h-[31px] border-r border-black bg-[#2c2b2b]">
<MdOutlineAttachFile />

  </div>
  <input type="url" size ={20} 
  value={url}
  onChange={(e)=>setUrl(e.target.value)}  
      className={`py-1 px-2 border-[#2c2b2b] border-l-0 border bg-[#101010] ${error.urlError ?  'border  border-red-500/50':null} rounded-[2px] w-full `}/>
</div>
          <div className='details'>
       
                <div  >
                    <div className="heading w-screen lg:w-[30vw] flex justify-between bg-[#1d1d1d] my-2 py-1 px-3">
                  <h5 className=''>Add title</h5>
                  <div className="flex gap-1 ">
                    <button className="bg-white/70 rounded-full text-black h-5 w-5 items-center  flex justify-center"  type="button" onClick={addSections}><GoPlus size={17}/></button>
                    <button className="bg-white/70 rounded-full text-black h-5 w-5 items-center  flex justify-center" type = "button" onClick={deleteSection}><LuMinus size={14}/></button>

                  </div>
                    </div>
                    <div>
<div className="mx-2">

 {sections.map((section, sectionIndex) => (
     <div key={sectionIndex} className="title-section">
                        <h3 className="mb-1">Title</h3>

     <div className="title-input items-center flex gap-1 w-full">
    <input
    className={`py-1 mt-1 mr-2 px-2 w-[90%]  border-[#2c2b2b] mb-2 border bg-[#101010] ${error.sectionsError[sectionIndex]?.title ?  'border border-red-500/50':null} rounded-[2px] `}
     value={section.title}
     onChange={(e) => {
         const updated = [...sections];
         updated[sectionIndex].title = e.target.value;
         setSections(updated);
        }} />
    <button  type = "button" onClick={() => addContent(sectionIndex)}  className="bg-white/70 rounded-full text-black h-5 w-5 items-center  flex justify-center" ><GoPlus size={17}/></button>
    <button  type = "button"  onClick={() => deleteContent(sectionIndex)}className="bg-white/70 rounded-full text-black h-5 w-5 items-center  flex justify-center"><LuMinus size={15}/></button>
        </div>

                   {section.content.map((cont, contentIndex) => (
                       <div 
                        key={contentIndex}>
                        <h3 className="mb-1">Content</h3>
                  <textarea 
                   className={`py-1 px-2 mb-1 border-[#2c2b2b]  border bg-[#101010] ${error.sectionsError[sectionIndex]?.content[contentIndex]?  'border  border-red-500/50':null} rounded-[2px] w-full `}
              
                    value={cont}
                    onChange={(e) => {
                        const updated = [...sections];
                        updated[sectionIndex].content[contentIndex] = e.target.value;
                        setSections(updated);
                    }}
                    />
             
                </div>
              
              
            ))}    
        </div>


))}
    
</div>
</div>


                </div>
            
          </div>

        <div className="faq">
              <div className="heading w-screen lg:w-[30vw] items-center flex justify-between bg-[#1d1d1d] my-2 py-1 px-3">
                  <h5 className=''>Add FAQ</h5>
                  <div className="flex gap-1 ">
                    <button   type = "button"className="bg-white/70 rounded-full text-black h-5 w-5 items-center  flex justify-center"  onClick={addFaq}><GoPlus size={17}/></button>
                    <button   type = "button" className="bg-white/70 rounded-full text-black h-5 w-5 items-center  flex justify-center" onClick={deleteFaq}><LuMinus size={15}/></button>

                  </div>
                    </div>
<div className="px-2">

        {faq.map((f , i)=>{
            return             <div key={i} className=" mb-2 border relative border-[#1d1d1d] py-4 px-2 rounded">
              <button type="button" className="absolute right-2 top-2"><RxCross1 onClick={() => deleteFaq(i)} /></button>
                        <h3 className="">Question</h3>

                       <input 
                       placeholder="Question.."
                className={`py-1 mt-1 mb-1 px-2 border-[#2c2b2b] border bg-[#101010]  rounded-[2px] w-full `}
                    />
                        <h3 className="">Answer</h3>

                            <textarea 
                  placeholder="Answer.."
             className={`py-1 mt-1 mb-1 px-2 border-[#2c2b2b] border bg-[#101010]  rounded-[2px] w-full `}
                    
                    />
              
            </div>
        })}

            </div>
        </div>

          <div className='hashtags'>
            <h5  className='bg-[#1d1d1d] my-2 py-1 px-3 w-screen lg:w-[30vw]'>Add hashtags*</h5>

                       <TagInput error={error.hashtagsError} hashtags={hashtags} setHashtags={setHashtags} />
            
          </div>
  <button type="submit" className=" text-black flex mb-8 mt-4 w-[97%] h-7 items-center justify-center bg-white px-2.5 py-0.5 rounded-[2px] mx">{loading ? <ButtonLoader /> : currentData ? 'Update' : 'Share'}</button>
        </aside>
      </div>

    </form>
        
  );
}