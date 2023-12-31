import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import { FileDropZone } from "./components/FileDropZone";

import { api } from "./lib/axios";

import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const [filesSelected, setFilesSelected] = useState([]);
  const [downloadLink, setDownloadLink] = useState(null);

  function handleFileChange(event) {
    const files = event.target.files;

    setFilesSelected([...files]);
  }

  function onDrop(files) {
    setFilesSelected([...files]);
  }

  async function handleConvertFile() {
    const formData = new FormData();

    formData.append("typeConvert", "PNG");

    filesSelected.forEach((file) => {
      formData.append(`file`, file);
    });

    try {
      const { data } = await api.post("/upload", formData);

      await api.post("/upload", formData);

      setDownloadLink(`http://localhost:3333/${data.download_link}`);

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
                filesSelected={filesSelected}
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
