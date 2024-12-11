import React, { useContext, useEffect } from "react";
import JournalCrad from "../component/JournalCrad";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import styles from "../style/Journal.module.css"; // Import the CSS module

const Journal = () => {
  const { journals, fetchJournals } = useContext(GlobalContext);

  useEffect (() => {
    fetchJournals()
  }, [])

  return (
    <main className={styles.main}>
      <div className={styles.mainContainer}>
        {journals?.map((journal) => (
          <JournalCrad key={journal.id} journal={journal} />
        ))}
      </div>
    </main>
  );
};

export default Journal;
