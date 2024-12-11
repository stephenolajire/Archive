import React, { useContext, useEffect } from "react";
import JournalCrad from "../component/JournalCrad";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import styles from "../style/Journal.module.css";

const Journal = () => {
  const { journals, fetchJournals } = useContext(GlobalContext);

  useEffect(() => {
    fetchJournals();
  }, []);

  return (
    <div className={styles.mainContainer}>
      <div className={styles.main}>
        {journals?.map((journal) => (
          <JournalCrad key={journal.id} journal={journal} />
        ))}
      </div>
    </div>
  );
};

export default Journal;
