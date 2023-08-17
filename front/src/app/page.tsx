"use client";

import React, { useState } from "react";

import { ToastContainer, toast } from "react-toastify";

import { FileDropZone } from "./components/FileDropZone";

import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  const [filesSelected, setFilesSelected] = useState<File[]>([]);
  const [downloadLink, setDownloadLink] = useState();

  const [typeOriginalFile, setTypeOriginalFile] = useState("WEBP");
  const [typeToConvert, setTypeToConvert] = useState("PNG");

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const files = event.target.files;

    if (files) {
      setFilesSelected(Array.from(files));
    }
  }

  async function handleConvertFile() {
    console.log(filesSelected);
  }

  return (
    <>
      <main className='flex items-center justify-center h-screen w-screen bg-gray-200'>
        <div className='flex items-center justify-center w-full h-full max-h-[600px] max-w-[1000px] rounded-xl bg-gray-100'>
          <div className='flex flex-col w-[800px] h-[500px]'>
            <h3>Conversão de arquivo</h3>

            <p className='text-gray-400'>
              Selecione o arquivo e o tipo veja seu arquivo sendo convertido
              para o tipo selecionado
            </p>

            <div className='flex gap-4 items-center w-[800px] h-[80px] mt-2'>
              <p className='text-gray-500 font-semibold'>Converta</p>

              <select
                className='
                  w-32 
                  p-1 
                  border
                  border-teal-500 
                  rounded-lg 
                  text-gray-500 
                  text-center 
                  font-semibold 
                  cursor-pointer 
                  outline-none
                '
                value={typeOriginalFile}
                onChange={(e) => setTypeOriginalFile(e.target.value)}
              >
                <option value='WEBP' selected>
                  WEBP
                </option>
                <option value='PNG'>PNG</option>
                <option value='JPG'>JPG</option>
                <option value='JPEG'>JPEG</option>
                <option value='AVIF'>AVIF</option>
              </select>

              <p className='text-gray-500 font-semibold'>Para</p>

              <select
                className='
                  w-32 
                  p-1 
                  border
                  border-teal-500 
                  rounded-lg 
                  text-gray-500 
                  text-center 
                  font-semibold 
                  cursor-pointer 
                  outline-none
                '
                value={typeToConvert}
                onChange={(e) => setTypeToConvert(e.target.value)}
              >
                <option value='WEBP' selected>
                  WEBP
                </option>
                <option value='PNG'>PNG</option>
                <option value='JPG'>JPG</option>
                <option value='JPEG'>JPEG</option>
                <option value='AVIF'>AVIF</option>
              </select>
            </div>

            <FileDropZone handleFileChange={handleFileChange} />

            <div 
              className='
                flex 
                items-center 
                justify-center 
                gap-3 
                h-[150px] 
                w-[800px] 
                mb-4
              '
              onClick={handleConvertFile}
            >
              <button className='w-[200px] p-3 text-white font-semibold bg-teal-400 outline-none border-none rounded-lg transition-colors hover:bg-teal-500'>
                Converter
              </button>
            </div>

            {downloadLink && (
                <a 
                  href={downloadLink} 
                  download 
                  className='
                    w-[300px]
                    m-auto
                    p-3
                    text-white
                    text-center
                    decoration-transparent
                    font-semibold
                    bg-teal-500
                    outline-none
                    border-none
                    rounded-lg
                    transition-color
                    hover:bg-teal-600
                  '
                >
                  Baixar Arquivo
                </a>
              )}
          </div>
        </div>

        <ToastContainer />
      </main>
    </>
  );
}
