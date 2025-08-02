import ProductImages from "./ProductImages";
import { useState , useEffect ,  } from "react";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import TagInput from "./TagInput";
export default function CreateProduct() {
  const product = {
    image: ['https://via.placeholder.com/150', 'https://via.placeholder.com/150'],
    name: 'Sample Product',
    amount: '99.99',
    sections: [
      {
        title: 'Product Overview',
        content: ['High quality', 'Affordable', 'Trendy design']
      },
      {
        title: 'Features',
        content: ['Feature 1', 'Feature 2', 'Feature 3']
      }
    ],
    hastags: ['design', 'poster', 'creative']
  };

   const [name, setName] = useState("");
    const [headline, setHeadline] = useState("");
    const [amount, setAmount] = useState("");
    const [image, setSelectedImage] = useState([]);
    const [hastags, setHastags] = useState(["dark", "aesthetic"]);
    const [sections, setSections] = useState([{ title: "", content: ["", ""] }]);
    const [faq , setFaq] = useState([{q : '' , a : ''} ,{q : '' , a : ''}])
  
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
  

  return (
    <main className='desc flex max-sm:flex-col h-screen w-screen max-sm:items-center'>
      <section className=''>
        <ProductImages images={product.image} />
      </section>

      <div style={{ height: `${product.image.length * 50 + 50}vh` }}>
        <aside className='flex flex-col items-center  top-2 overflow-y-auto mt-4'>
          

          <div className='details'>
       
                <div >
                    <div className="heading w-screen lg:w-[30vw] flex justify-between bg-[#1d1d1d] my-2 py-1 px-3">
                  <h5 className=''>Add title*</h5>
                  <div className="flex gap-1 ">
                    <button className="bg-white rounded-[2.5px] text-black p-1 px-1.2"  onClick={addSections}><GoPlus size={22}/></button>
                    <button className="bg-white rounded-[2.5px] text-black p-1 px-1.6" onClick={deleteSection}><LuMinus size={18}/></button>

                  </div>
                    </div>
                    <div>
<div className="mx-2">

 {sections.map((section, sectionIndex) => (
    <div className="title-section">

     <div className="title-input  flex gap-1">
    <input
     className="w-full mb-2 py-2  px-1" 
     value={section.title}
     onChange={(e) => {
         const updated = [...sections];
         updated[sectionIndex].title = e.target.value;
         setSections(updated);
        }} 
        placeholder="eg:Highlight / Details "/>
    <button onClick={() => addContent(sectionIndex)} className="bg-[#4d4d4d] rounded-[2.5px] text-white p-1.5 h-fit w-fit"  ><GoPlus size={22}/></button>
    <button onClick={() => deleteContent(sectionIndex)} className="bg-[#4d4d4d] rounded-[2.5px] text-white h-fit w-fit p-2"><LuMinus size={18}/></button>
        </div>

                   {section.content.map((cont, contentIndex) => (
                <div className="flex
                " key={contentIndex}>
                  <textarea
                    placeholder="eg: This is the content of this title"
                    className=" w-full  bg-[#4d4d4d] px-1 lg:mb-2 rounded"
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
                    <button className="bg-white rounded-[2.5px] text-black p-1 px-1.2"  onClick={addFaq}><GoPlus size={22}/></button>
                    <button className="bg-white rounded-[2.5px] text-black p-1 px-1.6" onClick={deleteFaq}><LuMinus size={18}/></button>

                  </div>
                    </div>
<div className="px-2">

        {faq.map((f , i)=>{
            return             <div className="bg-[#4d4d4d] mb-2 py-4 px-2 rounded">
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

                       <TagInput hastags={hastags} setHastags={setHastags} />
            
          </div>
        </aside>
      </div>
    </main>
  );
}