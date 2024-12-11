import React, { useContext } from "react";
import JournalCrad from "../component/JournalCrad";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import styles from "../style/Journal.module.css"; // Import the CSS module

const Journal = () => {
  const { journals } = useContext(GlobalContext);

  return (
    <main className={styles.main}>
      {journals?.map((journal) => (
        <div className={styles.mainContainer} key={journal.id}>
          <JournalCrad key={journal.id} journal={journal} />
        </div>
      ))}
    </main>
  );
};

export default Journal;
