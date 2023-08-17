"use client";

import Image from "next/image";

import folderIcon from "../assets/folder.png";

interface FileDropZoneProps {
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FileDropZone = ({ handleFileChange }: FileDropZoneProps) => {
  return (
    <div className='flex flex-col gap-1 items-center justify-center mt-6 mb-4 h-[350px] w-[800px] rounded-lg border-[3px] border-dotted border-teal-500 cursor-pointer opacity-70 transition-opacity hover:opacity-100'>
      <Image
        src={folderIcon}
        alt='Folder Icon in drag and drop'
        className='w-[150px]'
      />
      <h3>Arraste o arquivo</h3>
      <p className='text-gray-400'>Ou</p>
      <input
        className='w-[450px] p-1 bg-white rounded-xl border border-1 border-gray-600 text-base mb-3 py-2 px-5'
        type='file'
        name='file'
        multiple
        onChange={handleFileChange}
      />
    </div>
  );
};
