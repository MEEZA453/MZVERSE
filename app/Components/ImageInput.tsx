'use client'
import React, { useState, ChangeEvent, useEffect } from "react";

type ImageInputProps = {
  selectedImage: File[];
  setSelectedImage: React.Dispatch<React.SetStateAction<File[]>>;
  error : boolean;
};

function ImageInput({ error , selectedImage, setSelectedImage }: ImageInputProps) {
  const [previewURLs, setPreviewURLs] = useState<string[]>([]);

const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  const newFiles = e.target.files ? Array.from(e.target.files) : [];
  setSelectedImage((prev) => [...prev, ...newFiles]); // Append new files to previous
};


  useEffect(() => {
    const urls = selectedImage.map((file) => URL.createObjectURL(file));
    setPreviewURLs(urls);

    // Cleanup
    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [selectedImage]);

  return (
    <div className="w-screen lg:w-[70vw] flex mt-10  items-center justify-center border-r border-[#4d4d4d] mb-4  h-full min-h-[40vw]">
      <div>
{      selectedImage.length === 0 ?  <div className="image-input items-center flex flex-col gap-5">
        <div className={`${error ? 'text-red-600' : 'text-[#6d6d6d]'}`}>{error ? 'Put atleast one image': 'Drag your images here'}</div>
          <div>
            {/* Hidden file input */}
            <input
              type="file"
              id="upload-button"
              name="image[]"
              accept="image/*"
              multiple
              onChange={handleChange}
              className="hidden"
            />

            {/* Styled label acting as a button */}
            <label
              htmlFor="upload-button"
              className="inline-block cursor-pointer px-2 py-1 bg-white text-black font-medium rounded-lg transition duration-200"
            >
              Upload Images
            </label>
          </div>
        </div> : null}
  {previewURLs.length > 0 && (
  <div className="w-screen lg:w-[70vw] border-r border-[#4d4d4d] mb-4">
    <div className="w-screen lg:w-[70vw] h-80 lg:h-screen border-b relative flex justify-center items-center border-[#4d4d4d]">
      <img src={previewURLs[0]} className="w-[35vw] lg:w-[20vw]" />
    </div>
   {    selectedImage.length ===1 ? <div className="flex items-center justify-center h-80 lg:h-screen  border-b border-[#4d4d4d]">
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
        </div> : null}
    {previewURLs.length > 1 && (
      <div className="h-80 lg:h-[60vh] border-b relative grid grid-cols-2 justify-center items-center border-[#4d4d4d]">
        {previewURLs.slice(1).map((url, index) => (
          <div
            key={index}
            className={`${
              index % 2 === 0 ? "border-r" : ""
            } border-[#4d4d4d] flex h-full items-center justify-center`}
          >
            <img src={url} className="w-[17vw]" />
          </div>
        ))}

        {/* Add Image Button at the end */}
    {   selectedImage.length === 2 ? <div className="flex items-center justify-center h-full">
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
        </div>:null}
      </div>
    )}
  </div>
)}

      </div>
    </div>
  );
}

export default ImageInput;
