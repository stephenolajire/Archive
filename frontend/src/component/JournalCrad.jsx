import React from "react";
import { Download, Edit } from "lucide-react";
import styles from "../style/JournalCrad.module.css"; // Import the CSS module

const JournalCrad = ({ journal }) => {
  
  return (
    <div className={styles.cardContainer}>
      <div className={styles.cardImage}>
        <a href={journal?.front_page}>
          <img
            src={journal?.front_page}
            alt={journal?.project_name || "Journal Image"}
          />
        </a>
      </div>
      <div className={styles.cardContent}>
        <p className={styles.cardDescription}>{journal?.faculty}</p>
        {journal?.project_name > 50 ? (
          <h1 className={styles.cardTitle}>{journal.project_name.slice(0, 30)} ...</h1>
        ): (
          <h1 className={styles.cardTitle}>{journal.project_name}</h1>
        )}
        <p className={styles.cardDescription}>{journal?.department}</p>
        <div className={styles.cardActions}>
          <a href={journal?.project_file} download>
            <Download size={24} />
          </a>
          <Edit size={24} />
        </div>
      </div>
    </div>
  );
};

export default JournalCrad;