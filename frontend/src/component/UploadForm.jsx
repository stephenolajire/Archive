import React, { useState, useEffect } from "react";
import Swal from "sweetalert2"; // Import SweetAlert2
import styles from "../style/UploadForm.module.css"; // Import CSS module
import logo from "../assets/logo.jpg";
import api from "../Api/api";
import { faculties } from "../constant/constant"; 

const UploadForm = () => {
  // State for form fields
  const [projectName, setProjectName] = useState("");
  const [department, setDepartment] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [faculty, setFaculty] = useState("");
  const [frontPage, setFrontPage] = useState(null);
  const [projectFile, setProjectFile] = useState(null);

  // Error and loading state
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Handle text input changes
  const handleChange = (e, setter) => {
    setter(e.target.value);
  };

  // Handle file input changes with validation
  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      // 10MB size limit
      Swal.fire("Error!", "File size must be less than 10MB", "error");
      return;
    }
    setter(file);
  };

  // Handle faculty change to update departments
  const handleFacultyChange = (e) => {
    const selectedFaculty = e.target.value;
    setFaculty(selectedFaculty);
    setDepartment(""); // Reset department when faculty changes
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors
    const newErrors = {};
    if (!projectName) newErrors.projectName = "Field can't be empty";
    if (!department) newErrors.department = "Field can't be empty";
    if (!discipline) newErrors.discipline = "Field can't be empty";
    if (!faculty) newErrors.faculty = "Field can't be empty";
    if (!frontPage) newErrors.frontPage = "Field can't be empty";
    if (!projectFile) newErrors.projectFile = "Field can't be empty";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const uploadData = new FormData();
    uploadData.append("project_name", projectName);
    uploadData.append("department", department);
    uploadData.append("discipline", discipline);
    uploadData.append("faculty", faculties[faculty]?.name || "");
    uploadData.append("front_page", frontPage);
    uploadData.append("project_file", projectFile);

    try {
      setLoading(true);
      const response = await api.post("upload/", uploadData);
      if (response.status === 201) {
        Swal.fire("Success!", "Project uploaded successfully", "success");
        // Clear form fields
        setProjectName("");
        setDepartment("");
        setDiscipline("");
        setFaculty("");
        setFrontPage(null);
        setProjectFile(null);
        setErrors({});
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to upload the project", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      <div>
        <div className={styles.div}>
          <img src={logo} className={styles.logo} alt="website logo" />
        </div>
        <p className={styles.pls}>
          Please provide all the required information
        </p>
      </div>

      <div>
        <label className={styles.label} htmlFor="projectName">
          Project Title:
        </label>
        <input
          className={styles.inputText}
          type="text"
          id="projectName"
          value={projectName}
          onChange={(e) => handleChange(e, setProjectName)}
          placeholder="Project Title"
          required
        />
        {errors.projectName && (
          <p className={styles.error}>{errors.projectName}</p>
        )}
      </div>

      <div>
        <label className={styles.label} htmlFor="faculty">
          Faculty:
        </label>
        <select
          className={styles.inputText}
          id="faculty"
          value={faculty}
          onChange={handleFacultyChange}
          required
        >
          <option value="">Select Faculty</option>
          {Object.keys(faculties).map((facultyKey) => (
            <option key={facultyKey} value={facultyKey}>
              {faculties[facultyKey].name}
            </option>
          ))}
        </select>
        {errors.faculty && <p className={styles.error}>{errors.faculty}</p>}
      </div>

      <div>
        <label className={styles.label} htmlFor="department">
          Department:
        </label>
        <select
          className={styles.inputText}
          id="department"
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          required
        >
          <option value="">Select Department</option>
          {faculty &&
            faculties[faculty]?.departments.map((dept, index) => (
              <option key={index} value={dept}>
                {dept}
              </option>
            ))}
        </select>
        {errors.department && (
          <p className={styles.error}>{errors.department}</p>
        )}
      </div>

      <div>
        <label className={styles.label} htmlFor="discipline">
          Course:
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
        {errors.discipline && (
          <p className={styles.error}>{errors.discipline}</p>
        )}
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
          required
        />
        {errors.frontPage && <p className={styles.error}>{errors.frontPage}</p>}
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
        {errors.projectFile && (
          <p className={styles.error}>{errors.projectFile}</p>
        )}
      </div>

      <button className={styles.button} type="submit" disabled={loading}>
        {loading ? "Loading..." : "Submit"}
      </button>
    </form>
  );
};

export default UploadForm;
