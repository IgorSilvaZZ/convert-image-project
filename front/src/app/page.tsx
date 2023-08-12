import { ToastContainer, toast } from "react-toastify";

import { FileDropZone } from "./components/FileDropZone";

import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <main className='flex items-center justify-center h-screen w-screen bg-gray-200'>
        <div className='flex items-center justify-center w-full h-full max-h-[600px] max-w-[1000px] rounded-xl bg-gray-100'>
          <div className='flex flex-col w-[800px] h-[500px]'>
            <h3>Conversão de arquivo</h3>

            <p className='text-gray-400'>
              Selecione o arquivo WEBP e veja seu arquivo sendo convertido para
              PNG
            </p>

            <FileDropZone />

            <div className='flex items-center justify-center gap-3 h-[150px] w-[800px] mb-4'>
              <button className='w-[200px] p-3 text-white font-semibold bg-teal-400 outline-none border-none rounded-lg transition-colors hover:bg-teal-500'>
                Converter
              </button>
            </div>
          </div>
        </div>

        <ToastContainer />
      </main>
    </>
  );
}
