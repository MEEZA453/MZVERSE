'use client'
import React, { useState } from 'react';
import { RxCross2 } from "react-icons/rx";
import { GoPlus } from "react-icons/go";

type TagInputProps = {
  hastags: string[];
  setHastags: React.Dispatch<React.SetStateAction<string[]>>;
  error?: boolean;
};

function TagInput({ hastags, setHastags, error }: TagInputProps) {
  const [inputTag, setInputTag] = useState('');

  const addHasTags = () => {
    const trimmedTag = inputTag.trim();
    if (trimmedTag !== '' && !hastags.includes(trimmedTag)) {
      setHastags([...hastags, trimmedTag]);
    }
    setInputTag('');
  };

  const deleteTag = (tagIndex: number) => {
    setHastags(hastags.filter((_, index) => index !== tagIndex));
  };

  return (
    <div>
      <div className='flex items-center px-2 gap-2'>
        <input
          type="text"
          className={`w-full px-2 py-2  bg-[#212020] ${error ? 'border border-red-600' : ''}`}
          placeholder="eg: texture"
          onChange={(e) => setInputTag(e.target.value)}
          value={inputTag}
        />
        <button
          type='button'
          className="bg-[#4d4d4d] rounded-[2.5px] text-white p-1.5 h-fit w-fit"
          onClick={addHasTags}
        >
          <GoPlus size={22} />
        </button>
      </div>

      <div className="flex flex-wrap gap-2 px-2 mt-2">
        {hastags.map((hashtag, index) => (
          <div
            key={index}
            className="bg-[#4d4d4d] flex items-center text-black rounded px-1.5"
          >
            <label className='text-[14px] bg-[#4d4d4d] px-1 text-[#dadada]'>
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
