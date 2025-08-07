'use client'

import ProductImages from "../Components/ProductImages";
import { useState , useEffect  } from "react";
import { GoPlus } from "react-icons/go";
import ImageInput from "../Components/ImageInput";
import { LuMinus } from "react-icons/lu";
import TagInput from "../Components/TagInput";
import { postDesign } from "../store/actions/design";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../store/store";
import { useRouter } from "next/navigation";
import { MdOutlineAttachFile } from "react-icons/md";
import { useAuth } from "../Context/AuthContext";
import ButtonLoader from "../Components/ButtonLoader";

export default function CreateProduct() {
   const [name, setName] = useState("");
    const [headline, setHeadline] = useState("this is the fucking headline");
    const [amount, setAmount] = useState("");
    const [url , setUrl ] = useState("")
    const [image, setSelectedImage] = useState([]);
    const [hastags, setHastags] = useState([]);
    const [sections, setSections] = useState([{ title: "", content: ["", ""] }]);
    const [faq , setFaq] = useState([{q : '' , a : ''} ,{q : '' , a : ''}])
    const router = useRouter()
    const [loading , setLoading] = useState (false)
    const {user} = useAuth()

    type ErrorState = {
  nameError: boolean;
  amountError: boolean;
  urlError : boolean;
  sectionsError: SectionError[];
  hastagsError : boolean;
  imagesError : boolean
};
const [error, setError] = useState<ErrorState>({
  nameError: false,
  amountError: false,
  urlError : false,
  sectionsError: [],
  hastagsError : false,
  imagesError : false
});
const dispatch = useDispatch<AppDispatch>();
    // Fetch designs using getDesign
    // useEffect(() => {
    //   dispatch(getDesign(1)); // Fetch first page; extend if you awant all pages
    // }, [dispatch]);
  


    const addSections = () => setSections([...sections, { title: "", content: [] }]);
  const addFaq = ()=> setFaq([...faq , {q : '' , a : ''}])
  const deleteFaq = ()=> {
    if(faq.length > 1){
        setFaq(faq.slice(0 , -1))
    }
  } 
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





const formSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  event.preventDefault();

  const sectionError: SectionError[] = sections.map((section) => {
    const titleError = section.title.trim() === "";
    const contentError = section.content.map((c) => c.trim() === "");
    return {
      title: titleError,
      content: contentError,
    };
  });

  const newErrors: ErrorState = {
    nameError: name.trim() === "",
    amountError: amount.trim() === "",
    urlError : url.trim() === "",
    sectionsError: sectionError,
    hastagsError : hastags.length < 2,
    imagesError : image.length < 1
  };

  setError(newErrors);
console.log(error)
  const hasSectionErrors = sectionError.some(
    (s) => s.title || s.content.some((c) => c)
  );

  if (
    newErrors.nameError ||
    newErrors.urlError ||
    newErrors.imagesError ||
    newErrors.amountError ||
    hasSectionErrors
  ) {
    return;
  }

  const formData = new FormData();
  formData.append("name", name);
formData.append("driveLink" , url)
  formData.append("amount", amount);
  image.forEach((file) => formData.append("images", file));
  formData.append("sections", JSON.stringify(sections));
  formData.append("hastags", JSON.stringify(hastags));
try {
  const user = localStorage.getItem('profile');
  if (user) {
    const parsedUser = JSON.parse(user);
    const token = parsedUser.token;
    console.log(token);
    setLoading(true)
    dispatch(postDesign(formData , token));
    setLoading(false)
    router.push('/AllAssets')
  }
} catch (err) {
  setLoading(false)
  console.log('Invalid JSON in localStorage', err);
}
};


  return (
    <form  onSubmit={formSubmit} className='desc flex max-sm:flex-col h-screen w-screen max-sm:items-center'>
         
              <div className=" bg-[#1d1d1d] w-full py-2  z-[100] flex fixed top-0 px-3 justify-between items-center">
                <img src='/logo.png' className="w-8 rounded-xl object-cover"/>
                <button type="submit" className=" text-white flex w-31 h-8 items-center jusify-center border px-2.5 py-0.5 rounded-full">{loading ?<ButtonLoader/>:'Share product'}</button>

            </div>  



      <section className=''>
             <ImageInput  error = {error.imagesError }selectedImage={image} setSelectedImage={setSelectedImage} />
     
      </section>


      <div >
        <aside className='flex flex-col items-center mt-14 top-2 overflow-y-auto'>
<div className="name flex gap-2 relative w-full px-2">
    <div className="w-3/4"><h6>Name:</h6>
<input  onChange={(e)=> setName(e.target.value)} className={`p-2 ${error.nameError ? 'border border-red-600':null} w-full bg-[#212020]`} placeholder="eg:Texture bundle"/>
    </div>
<div className="w-1/4"><h6>Amount:</h6>
<input onChange={(e)=> setAmount(e.target.value)}  className={`p-2 ${error.amountError ? 'border border-red-600':null} w-full bg-[#212020]`}  placeholder="eg: $35"/>
    </div>

</div>

<div className="link w-full px-2 mt-2 flex">
  <div className="flex rounded-l-[2px] items-center justify-center h-full w-10 p-2.5 border-r border-black bg-[#222222]">
<MdOutlineAttachFile />

  </div>
  <input type="url" size ={20} placeholder="eg:valid link of your file (google drive)"  
  onChange={(e)=>setUrl(e.target.value)}  
      className={`mb-2 py-2 bg-[#212020] px-2 p-2 ${error.urlError?  'border border-red-600':null} w-full`}/>
</div>
          <div className='details'>
       
                <div >
                    <div className="heading w-screen lg:w-[30vw] flex justify-between bg-[#1d1d1d] my-2 py-1 px-3">
                  <h5 className=''>Add title*</h5>
                  <div className="flex gap-1 ">
                    <button className="bg-white rounded-[2.5px] text-black p-1 px-1.2"  type="button" onClick={addSections}><GoPlus size={22}/></button>
                    <button className="bg-white rounded-[2.5px] text-black p-1 px-1.6" type = "button" onClick={deleteSection}><LuMinus size={18}/></button>

                  </div>
                    </div>
                    <div>
<div className="mx-2">

 {sections.map((section, sectionIndex) => (
     <div key={sectionIndex} className="title-section">

     <div className="title-input  flex gap-1">
    <input
      className={`mb-2 py-2 bg-[#212020] px-1 p-2 ${error.sectionsError[sectionIndex]?.title ? 'border border-red-600':null} w-full`} 
     value={section.title}
     onChange={(e) => {
         const updated = [...sections];
         updated[sectionIndex].title = e.target.value;
         setSections(updated);
        }} 
        placeholder="eg:Highlight / Details "/>
    <button   type = "button" onClick={() => addContent(sectionIndex)} className="bg-[#4d4d4d] rounded-[2.5px] text-white p-1.5 h-fit w-fit"  ><GoPlus size={22}/></button>
    <button  type = "button"  onClick={() => deleteContent(sectionIndex)} className="bg-[#4d4d4d] rounded-[2.5px] text-white h-fit w-fit p-2"><LuMinus size={18}/></button>
        </div>

                   {section.content.map((cont, contentIndex) => (
                       <div className="flex
                       " key={contentIndex}>
                  <textarea
                    placeholder="eg: This is the content of this title"
                    className={` w-full  bg-[#1e1e1e] px-1 mb-2 rounded ${error.sectionsError[sectionIndex]?.content[contentIndex] ? 'border border-red-600': null}`}
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
              <div className="heading w-screen lg:w-[30vw] flex justify-between bg-[#1d1d1d] my-2 py-1 px-3">
                  <h5 className=''>Add FAQ</h5>
                  <div className="flex gap-1 ">
                    <button   type = "button" className="bg-white rounded-[2.5px] text-black p-1 px-1.2"  onClick={addFaq}><GoPlus size={22}/></button>
                    <button   type = "button" className="bg-white rounded-[2.5px] text-black p-1 px-1.6" onClick={deleteFaq}><LuMinus size={18}/></button>

                  </div>
                    </div>
<div className="px-2">

        {faq.map((f , i)=>{
            return             <div key={i} className="bg-[#272727] mb-2 py-4 px-2 rounded">
                       <textarea
                    placeholder="eg: Where do you use this poster ?"
                    className=" w-full  bg-[#4d4d4d] px-1 lg:mb-2 rounded"
                    
                    />
                            <textarea 
                    placeholder="eg: Prints, comercial projects etc."
                    className=" w-full  bg-[#4d4d4d] px-1 lg:mb-2 rounded"
                    
                    />
              
            </div>
        })}

            </div>
        </div>

          <div className='hastags'>
            <h5  className='bg-[#1d1d1d] my-2 py-2 px-3 w-screen lg:w-[30vw]'>Add hastags*</h5>

                       <TagInput error={error.hastagsError} hastags={hastags} setHastags={setHastags} />
            
          </div>

        </aside>
      </div>

    </form>
        
  );
}