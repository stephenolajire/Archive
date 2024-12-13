import React, { useState, useContext } from "react";
import JournalCrad from "../component/JournalCrad";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import { faculties } from "../constant/constant";
import api from "../Api/api";
import styles from "../style/Journal.module.css";
import logo from "../assets/logo.jpg";

const Journal = () => {
  const { journals, setJournals, fetchJournals } = useContext(GlobalContext);
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [loading, setLoading] = useState(false);

  // Calculate faculty counts (from previous implementation)
  const facultyCounts = React.useMemo(() => {
    if (!journals) return {};

    const normalizeFacultyName = (name) =>
      name
        .toLowerCase()
        .trim()
        .replace(/^faculty\s+of\s+/, "");

    const counts = Object.keys(faculties).reduce((acc, facultyKey) => {
      acc[facultyKey] = {
        name: faculties[facultyKey].name,
        count: 0,
      };
      return acc;
    }, {});

    journals.forEach((journal) => {
      const matchedFacultyKey = Object.keys(faculties).find(
        (key) =>
          normalizeFacultyName(faculties[key].name) ===
          normalizeFacultyName(journal.faculty)
      );

      if (matchedFacultyKey) {
        counts[matchedFacultyKey].count++;
      }
    });

    return counts;
  }, [journals]);

  // Fetch journals for a specific faculty
  const fetchJournalsByFaculty = async (facultyName) => {
    try {
      setLoading(true);
      setSelectedFaculty(facultyName);

      // More robust normalization
      const normalizedFacultyName = facultyName.toLowerCase()

      console.log("Normalized Faculty Name:", normalizedFacultyName);

      const response = await api.get(
        `journals/faculty/${normalizedFacultyName}/`
      );

      console.log("API Response:", response.data);
      setJournals(response.data);
    } catch (error) {
      console.error("Error fetching journals by faculty:", error);
      // Optionally show an error message to the user
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.mainContainer}>
      <h1 className={styles.all}>Get All Journals in a Selected Faculty</h1>
      <div className={styles.container}>
        {Object.keys(facultyCounts).map((facultyKey) => {
          // Hide other faculties when a faculty is selected
          if (
            selectedFaculty &&
            facultyCounts[facultyKey].name !== selectedFaculty
          ) {
            return null;
          }

          return (
            <div
              key={facultyKey}
              className={styles.cont}
              onClick={() =>
                fetchJournalsByFaculty(facultyCounts[facultyKey].name)
              }
            >
              <img src={logo} alt="faculty_image" />
              <p className={styles.science}>{facultyCounts[facultyKey].name}</p>
              <div className={styles.inner}>
                <p className={styles.total}>Total:</p>
                <p className={styles.number}>
                  {facultyCounts[facultyKey].count}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Button to reset the selected faculty */}
      {selectedFaculty && (
        <div className={styles.btnDiv}>
          <button
            className={styles.resetButton}
            onClick={() => {
              setSelectedFaculty(null);
              fetchJournals();
            }}
          >
            Show All Faculties
          </button>
        </div>
      )}

      <h1 className={styles.all}>
        {selectedFaculty
          ? `Journals for ${selectedFaculty}`
          : "List of All the Available Journals"}
      </h1>

      {loading ? (
        <p>Loading journals...</p>
      ) : (
        <div className={styles.main}>
          {journals?.length > 0 ? (
            journals.map((journal) => (
              <JournalCrad key={journal.id} journal={journal} />
            ))
          ) : (
            <p>No journals found for this faculty.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Journal;
