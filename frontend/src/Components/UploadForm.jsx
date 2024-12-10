import React, { useState } from "react";
import styles from "../css/UploadForm.module.css"; // Import CSS module
import logo from '../assets/logo.jpg'

const UploadForm = ({ onSubmit }) => {
  // Define individual useState hooks for each form field
  const [projectName, setProjectName] = useState("");
  const [department, setDepartment] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [faculty, setFaculty] = useState("");
  const [frontPage, setFrontPage] = useState(null);
  const [projectFile, setProjectFile] = useState(null);

  // Handle text input changes
  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  // Handle file input changes
  const handleFileChange = (e, setter) => {
    setter(e.target.files[0]);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Pass the individual state values as a combined object to the onSubmit prop
    onSubmit({
      projectName,
      department,
      discipline,
      faculty,
      frontPage,
      projectFile,
    });
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div>
        <div className={styles.div}>
          <img src={logo} className={styles.logo} alt="website logo" />
        </div>
        <p className={styles.pls}>Please provide all the required informations</p>
      </div>
      <div>
        <label className={styles.label} htmlFor="projectName">
          Project Name:
        </label>
        <input
          className={styles.inputText}
          type="text"
          id="projectName"
          value={projectName}
          onChange={(e) => handleChange(e, setProjectName)}
          placeholder="Project Name"
          required
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="department">
          Department:
        </label>
        <input
          className={styles.inputText}
          type="text"
          id="department"
          value={department}
          onChange={(e) => handleChange(e, setDepartment)}
          placeholder="Department"
          required
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="discipline">
          Discipline:
        </label>
        <input
          className={styles.inputText}
          type="text"
          id="discipline"
          value={discipline}
          onChange={(e) => handleChange(e, setDiscipline)}
          placeholder="Discipline"
          required
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="faculty">
          Faculty:
        </label>
        <input
          className={styles.inputText}
          type="text"
          id="faculty"
          value={faculty}
          onChange={(e) => handleChange(e, setFaculty)}
          placeholder="Faculty"
          required
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="frontPage">
          Front Page (Image):
        </label>
        <input
          className={styles.inputFile}
          type="file"
          id="frontPage"
          onChange={(e) => handleFileChange(e, setFrontPage)}
          accept="image/*"
        />
      </div>
      <div>
        <label className={styles.label} htmlFor="projectFile">
          Project File:
        </label>
        <input
          className={styles.inputFile}
          type="file"
          id="projectFile"
          onChange={(e) => handleFileChange(e, setProjectFile)}
          accept=".pdf,.doc,.docx"
          required
        />
      </div>
      <button className={styles.button} type="submit">
        Submit
      </button>
    </form>
  );
};

export default UploadForm;
