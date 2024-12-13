import React, { useContext, useState } from "react";
import { Download, Edit } from "lucide-react";
import styles from "../style/JournalCrad.module.css"; 
import { GlobalContext } from "../GlobalContext/GlobalContext";
import Swal from "sweetalert2";

const JournalCrad = ({ journal }) => {
  const {isAuthenticated, handleEdit} = useContext(GlobalContext)
  
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardImage}>
        <a href={journal?.front_page} target="_blank">
          <img
            src={journal?.front_page}
            alt={journal?.project_name || "Journal Image"}
          />
        </a>
      </div>
      <div className={styles.cardContent}>
        <p className={styles.cardDescription}>{journal?.faculty}</p>
        {journal?.project_name.length > 30 ? (
          <h1 className={styles.cardTitle}>
            {journal.project_name.slice(0, 28)} ...
          </h1>
        ) : (
          <h1 className={styles.cardTitle}>{journal.project_name}</h1>
        )}
        <p className={styles.cardDescription}>{journal?.department}</p>
        <div className={styles.cardActions}>
          <a href={journal?.project_file} target="_blank" download>
            <Download size={24} />
          </a>
          {isAuthenticated && (
            <Edit size={24} onClick={() => handleEdit(journal.id)} />
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalCrad;