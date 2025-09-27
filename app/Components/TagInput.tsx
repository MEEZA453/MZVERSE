'use client'
import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";
import { useThemeContext } from '../Context/ThemeContext';

type TagInputProps = {
  hashtags: string[];
  setHashtags: React.Dispatch<React.SetStateAction<string[]>>;
  error?: boolean;
};

function TagInput({ hashtags, setHashtags, error }: TagInputProps) {
  const [inputTag, setInputTag] = useState('');
const {isLightMode}  = useThemeContext()
  const addHashtags = () => {
    const trimmedTag = inputTag.trim();
    if (trimmedTag !== '' && !hashtags.includes(trimmedTag)) {
      setHashtags([...hashtags, trimmedTag]);
    }
    setInputTag('');
  };

  const deleteTag = (tagIndex: number) => {
    setHashtags(hashtags.filter((_, index) => index !== tagIndex));
  };

  return (
    <div>
      <div className='flex items-center px-2 gap-2'>
        <input
          type="text"
           style={{
  border: error ? '1px solid rgba(255, 0, 0, 0.5)' : null
}}
          className={`py-1 mt-1 px-2 border-[#2c2b2b] border  bg-[#101010] ${error ?  'border border-red-500/50':null} rounded-[2px] w-[94%] `}
          placeholder="eg: texture"
          onChange={(e) => setInputTag(e.target.value)}
          value={inputTag}
        />
        <button
        style={{color : isLightMode ?'white':'black' , backgroundColor : isLightMode ? 'black':'white'}} 
          type='button'
         className="bg-white/70 rounded-full text-black h-5 w-5 items-center  flex justify-center"
          onClick={addHashtags}
        >
          <GoPlus size={17} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 px-2 mt-2">
        {hashtags.map((hashtag, index) => (
          <div
            key={index}
            className="bg-[#1d1d1d] flex items-center text-black rounded px-1.5"
          >
            <label className='text-[14px] bg-[#1d1d1d] px-1 text-[#dadada]'>
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
