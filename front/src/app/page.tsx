import Image from "next/image";

import { ToastContainer, toast } from "react-toastify";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main className='flex items-center justify-center h-full w-full bg-backgroundColorApp'>
          
          <div className="flex items-center justify-center w-full h-full max-h-[600px] max-w-[1000px] rounded-xl bg-white">
            <div className="flex flex-col w-[800px] h-[500px]">
              <h3>Conversão de arquivo</h3>

              <p className="text-gray-400">
                Selecione o arquivo WEBP e veja seu arquivo sendo convertido
                para PNG
              </p>
            </div>
          </div>


          <ToastContainer />
        </main>
      </DndProvider>
    </>
  );
}
