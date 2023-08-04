import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { FileDropZone } from "./components/FileDropZone";

import { api } from "./lib/axios";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [fileSelected, setFileSelected] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);

  function handleFileChange(event) {
    const file = event.target.files[0];

    setFileSelected(file);
  }

  function onDrop(files) {
    const [file] = files;

    setFileSelected(file);
  }

  async function handleConvertFile() {
    const formData = new FormData();

    formData.append("file", fileSelected);

    try {
      const { data } = await api.post("/upload", formData);

      setDownloadLink(data.download_link);

      toast.success("Arquivo convertido com sucesso!");
    } catch (err) {
      console.log(err);
      toast.error("Erro ao realizar a conversão da imagem!");
    }
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <main>
          <div className='container'>
            <div className='item-container'>
              <h3>Conversão de arquivo</h3>
              <p>
                Selecione o arquivo WEBP e veja seu arquivo sendo convertido
                para PNG
              </p>

              <FileDropZone
                fileSelected={fileSelected}
                onDrop={onDrop}
                handleFileChange={handleFileChange}
              />

              <div className='buttons-container'>
                <button className='send-button' onClick={handleConvertFile}>
                  Converter
                </button>
              </div>

              {downloadLink && (
                <a href={downloadLink} download className='download-button'>
                  Baixar Arquivo
                </a>
              )}
            </div>
          </div>
        </main>

        <ToastContainer />
      </DndProvider>
    </>
  );
}

export default App;
