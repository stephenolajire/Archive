import React, { useContext } from "react";
import Modal from "react-modal";
import UploadForm from "./UploadForm";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import style from "../css/CustomModal.module.css";

// Modal.setAppElement("#root");

const CustomModal = () => {
  const { isModalOpen, setIsModalOpen } = useContext(GlobalContext);

  const customStyle = {
    content: {
      maxWidth: "600px",
      height: "auto",
      position: "relative",
      left: "-1%",
      margin: "0 auto",
    },
  };

  return (
    <div className={style.container}>
      <Modal
        isOpen={isModalOpen}
        contentLabel="Upload Modal"
        style={customStyle}
      >
        <div className={style.btnDiv}>
          <button
            className={style.btn}
            onClick={() => setIsModalOpen(false)} // Close the modal
          >
            X
          </button>
        </div>
        <UploadForm /> {/* Ensure UploadForm component is properly defined */}
      </Modal>
    </div>
  );
};

export default CustomModal;
