"use client";
import React, { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import { GoPlus, GoPlusCircle } from "react-icons/go";
import { RxCross2 } from "react-icons/rx";

type ImageInputProps = {
  selectedImage: (File | string)[];
  setSelectedImage: React.Dispatch<React.SetStateAction<(File | string)[]>>;
  error: boolean;
  handleRemove: (index: number) => void; // add this
};

export default function MobileImageInput({
  error,
  selectedImage,
  setSelectedImage,
  handleRemove,
}: ImageInputProps) {
  const [previewURLs, setPreviewURLs] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setSelectedImage((prev) => [...prev, ...newFiles]);
  };

  // const handleRemove = (index: number) => {
  //   setSelectedImage((prev) => prev.filter((_, i) => i !== index));
  // };

  // useEffect(() => {
  //   const urls = selectedImage.map((file) => URL.createObjectURL(file));
  //   setPreviewURLs(urls);

  //   return () => {
  //     urls.forEach((url) => URL.revokeObjectURL(url));
  //   };
  // }, [selectedImage]);

  useEffect(() => {
  const urls = selectedImage.map((fileOrUrl) => {
    if (typeof fileOrUrl === "string") {
      return fileOrUrl; // backend URL
    }
    return URL.createObjectURL(fileOrUrl); // File from input
  });

  setPreviewURLs(urls);

  // cleanup only blob URLs
  return () => {
    urls.forEach((url, i) => {
      if (typeof selectedImage[i] !== "string") {
        URL.revokeObjectURL(url);
      }
    });
  };
}, [selectedImage]);
  return (
    <div className="max-sm:mt-4 mb-6 lg:sticky lg:top-10">
      {/* Grid of images */}
      <div className={`grid grid-cols-3 bg-black items-center mx-4 mb-1 justify-center gap-3 min:h-60  lg:w-150 h-full border  rounded-[3px] p-3 ${error?'border-red-500/40':'border-[#1d1d1d]'}`}>
        {previewURLs.map((url, i) => (
          <div key={i} className="relative group h-28 lg:h-50 border border-[#1d1d1d] rounded overflow-hidden">
            <Image
              src={url}
              alt={`preview-${i}`}
              width={300}
              height={300}
              className="object-cover w-full h-fit"
            />
            {/* Remove Button */}
            <button
              type="button"
              onClick={() => handleRemove(i)}
              className="absolute top-1 right-1 bg-black/70 text-white rounded-full p-1 hover:bg-black"
            >
              <RxCross2 size={16} />
            </button>
          </div>
        ))}

        {/* Add Button (always visible) */}
        <div className={`h-28 lg:h-50 ${selectedImage.length < 1 ? 'w-[90vw] lg:w-150': 'w-full  bg-[#0d0d0d] border-[#1d1d1d] border ' }  flex-col gap-2 flex rounded justify-center items-center `}>

       <label className="flex  items-center justify-center  rounded-md h-32 lg:h-50 cursor-pointer ">

         <GoPlusCircle size={22}/>
          <input
            type="file"
            id="upload-button"
            name="image[]"
            accept="image/*"
            multiple
            onChange={handleChange}
            className="hidden"
          />
        </label>
       {/* {selectedImage.length < 1&& <p style={{fontSize : '13px', opacity : 0.6}}>  Images that inspire you</p>} */}
        </div>
      </div>

      {/* Error message */}


      {/* Tip Section */}
    
    </div>
  );
}
