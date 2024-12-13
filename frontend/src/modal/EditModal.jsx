import React, { useContext } from "react";
import Modal from "react-modal";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import style from "../style/CustomModal.module.css";
import EditForm from "../component/EditForm";

Modal.setAppElement("#root");

const EditModal = () => {
  const { isEditModalOpen, setIsEditModalOpen } = useContext(GlobalContext);

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
        isOpen={isEditModalOpen}
        contentLabel="Upload Modal"
        style={customStyle}
      >
        <div className={style.btnDiv}>
          <button
            className={style.btn}
            onClick={() => setIsEditModalOpen(false)} // Close the modal
          >
            X
          </button>
        </div>
        <EditForm /> {/* Ensure UploadForm component is properly defined */}
      </Modal>
    </div>
  );
};

export default EditModal;
