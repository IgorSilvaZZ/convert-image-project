import { useDrop } from "react-dnd";
import { NativeTypes } from "react-dnd-html5-backend";

import folderIcon from "../../assets/folder.png";

import "./style.css";

const FileDropZone = ({ onDrop, handleFileChange, fileSelected }) => {
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: [NativeTypes.FILE],
    drop: (item) => onDrop(item.files),
    collect: (monitor) => ({
      isOver: monitor.isOver,
      canDrop: monitor.canDrop(),
    }),
  }));

  const isActive = canDrop && isOver;

  return (
    <>
      <div
        className='upload-container'
        ref={drop}
        style={{ opacity: isActive || fileSelected ? 1 : 0.6 }}
      >
        <img src={folderIcon} alt='Folder icon' />
        <h3>Arraste o arquivo</h3>
        <p>Ou</p>
        <input type='file' name='file' onChange={handleFileChange} />
      </div>
    </>
  );
};

export { FileDropZone };
