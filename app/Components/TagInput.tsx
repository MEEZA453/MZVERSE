import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";

function TagInput({hastags , setHastags}) {
  const [inputTag, setInputTag] = useState('');

  // Add hashtags
  const addHasTags = () => {
    if (inputTag.trim() !== '' && !hastags.includes(inputTag.trim())) {
      setHastags([...hastags, inputTag.trim()]);
    }
    setInputTag('');
  };

  // Delete hashtag by index
  const deleteTag = (tagIndex:Number) => {
    setHastags(hastags.filter((_, index:number) => index !== tagIndex));
  };

  return (
    <div>
      <div className='flex items-center px-2 gap-2'>
        <input
          type="text"
             className="w-full px-2 py-2 " 
          placeholder="eg:#texture"
          onChange={(e) => setInputTag(e.target.value)}
          value={inputTag}
        />
        <button type = 'button'
         className="bg-[#4d4d4d] rounded-[2.5px] text-white p-1.5 h-fit w-fit" onClick={addHasTags} ><GoPlus size={22}/>
        </button>
      </div>

      <div className="flex flex-wrap gap-2 px-2 mt-2">
        {hastags.map((hashtag, index) => (
          <div
            key={index}
            className=" bg-[#4d4d4d] flex items-center text-black rounded px-1.5"
          >
<label  className='text-[14px] bg-[#4d4d4d] px-1 text-[#dadada] '>
                    #{hashtag}
                  </label>         
                     <RxCross2
              onClick={() => deleteTag(index)}
              color="white"
              className="cursor-pointer"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default TagInput;
