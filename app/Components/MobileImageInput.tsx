'use client'
import React, { useState, ChangeEvent, useEffect } from "react";
import Image from "next/image";
import { IoResizeSharp } from "react-icons/io5";
import { GoScreenFull } from "react-icons/go";
import { RxExitFullScreen } from "react-icons/rx";

type ImageInputProps = {
  selectedImage: File[];
  setSelectedImage: React.Dispatch<React.SetStateAction<File[]>>;
  isFullImage : boolean;
  setFullImage : React.Dispatch<React.SetStateAction<boolean>>
  error: boolean;
};

export default function MobileImageInput({ error, selectedImage, setSelectedImage , isFullImage , setFullImage }: ImageInputProps) {
  const [previewURLs, setPreviewURLs] = useState<string[]>([]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newFiles = e.target.files ? Array.from(e.target.files) : [];
    setSelectedImage((prev) => [...prev, ...newFiles]);
  };

  useEffect(() => {
    const urls = selectedImage.map((file) => URL.createObjectURL(file));
    setPreviewURLs(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedImage]);

  return (
    <div className="h-[50vh] mt-10 mb-4 relative overflow-y-hidden overflow-x-scroll">
    {  previewURLs.length > 0 &&<button type="button" onClick={()=>setFullImage(!isFullImage)} className="absolute bottom-5 z-[999] left-4"> {isFullImage ? <RxExitFullScreen size={20}  color="white" /> :  <GoScreenFull  size={20}  color="white"/>}</button>}
      {previewURLs.length === 0 ? (
        <div className="flex items-center flex-col gap-5 justify-center h-full">
          <p style={{ color: error ? "red" : "#dadada" }}>
            {error ? "Put at least one image" : "Drag your images here"}
          </p>
          <div>
            <input
              type="file"
              id="upload-button"
              name="image[]"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="hidden"
            />
            <label
              htmlFor="upload-button"
              className="inline-block cursor-pointer px-2 py-1 bg-white text-black font-medium rounded-lg transition duration-200"
            >
              Upload Images
            </label>
          </div>
        </div>
      ) : (
        <div className="flex w-[300vw] h-full">
          {/* Render images */}
          {previewURLs.map((url, i) => (
            <div
              key={i}
              className="h-full w-[100vw] flex items-center justify-center"
            >
              <Image
              style={{scale : isFullImage ? 1 : 0.8}}
                src={url}
                height={400}
                width={300}
                alt="preview"
                className={`object-cover ${isFullImage ? 'w-[100%] h-fit' : 'w-[70%]'}`}
              />
            </div>
          ))}

          {/* Add Image button as next page */}
          <div className="h-full w-[100vw] flex items-center justify-center">
            <input
              type="file"
              id="upload-button"
              name="image[]"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="hidden"
            />
            <label
              htmlFor="upload-button"
              className="inline-block cursor-pointer px-2 py-1 bg-white text-black font-medium rounded-lg transition duration-200"
            >
              + Add Image
            </label>
          </div>
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="fixed pointer-events-none w-screen h-80 bg-gradient-to-b from-black to-[#00000000] z-[300] top-0"></div>
    </div>
  );
}
