import React, { useContext, useState, useEffect } from "react";
import Swal from "sweetalert2";
import styles from "../style/UploadForm.module.css";
import logo from "../assets/logo.jpg";
import api from "../Api/api";
import { GlobalContext } from "../GlobalContext/GlobalContext";
import { faculties } from "../constant/constant"; // Import the faculties object

const EditForm = () => {
  const { editJournal, fetchJournals } = useContext(GlobalContext);

  // State for form fields
  const [projectName, setProjectName] = useState("");
  const [department, setDepartment] = useState("");
  const [discipline, setDiscipline] = useState("");
  const [faculty, setFaculty] = useState("");
  const [frontPage, setFrontPage] = useState(null);
  const [projectFile, setProjectFile] = useState(null);

  // New state for dynamic faculty/department selection
  const [isFacultySelectMode, setIsFacultySelectMode] = useState(false);
  const [isDepartmentSelectMode, setIsDepartmentSelectMode] = useState(false);
  const [selectedFaculty, setSelectedFaculty] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  // Error and loading state
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  // Populate state when editJournal changes
  useEffect(() => {
    if (editJournal) {
      setProjectName(editJournal.project_name || "");
      setDepartment(editJournal.department || "");
      setDiscipline(editJournal.discipline || "");
      setFaculty(editJournal.faculty || "");
      setFrontPage(editJournal.front_page || null);
      setProjectFile(editJournal.project_file || null);
    }
  }, [editJournal]);

  // Handle text input changes
  const handleChange = (e, setter) => {
    const value = e.target.value;
    setter(value);

    // If faculty is cleared, switch to select mode
    if (setter === setFaculty && value.trim() === "") {
      setIsFacultySelectMode(true);
      setSelectedFaculty("");
      setDepartment("");
      setIsDepartmentSelectMode(true);
    }

    // If department is cleared, switch to select mode
    if (setter === setDepartment && value.trim() === "") {
      setIsDepartmentSelectMode(true);
      setSelectedDepartment("");
    }
  };

  // Handle faculty selection
  const handleFacultySelect = (e) => {
    const selectedFacultyKey = e.target.value;
    setSelectedFaculty(selectedFacultyKey);
    setFaculty(faculties[selectedFacultyKey].name);
    setDepartment(""); // Reset department when faculty changes
    setIsDepartmentSelectMode(true);
  };

  // Handle department selection
  const handleDepartmentSelect = (e) => {
    const selectedDepartmentName = e.target.value;
    setSelectedDepartment(selectedDepartmentName);
    setDepartment(selectedDepartmentName);
  };

  // Handle file input changes with validation
  const handleFileChange = (e, setter) => {
    const file = e.target.files[0];
    if (file && file.size > 10 * 1024 * 1024) {
      Swal.fire("Error!", "File size must be less than 10MB", "error");
      return;
    }
    setter(file);
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

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const uploadData = new FormData();
    uploadData.append("project_name", projectName);
    uploadData.append("department", department);
    uploadData.append("discipline", discipline);
    uploadData.append("faculty", faculty);
    if (frontPage instanceof File) uploadData.append("front_page", frontPage);
    if (projectFile instanceof File)
      uploadData.append("project_file", projectFile);

    try {
      setLoading(true);
      const response = await api.put(`edit/${editJournal.id}/`, uploadData);
      if (response.status === 200) {
        Swal.fire("Success!", "Project updated successfully", "success");
        fetchJournals();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error!", "Failed to update the project", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles.formContainer} onSubmit={handleSubmit}>
      {/* Previous form sections remain the same */}
      <div>
        <div className={styles.div}>
          <img src={logo} className={styles.logo} alt="website logo" />
        </div>
        <p className={styles.pls}>
          Your about to edit{" "}
          <span className={styles.journalName}>{editJournal.project_name}</span>{" "}
          journal information
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
        {!isFacultySelectMode ? (
          <input
            className={styles.inputText}
            type="text"
            id="faculty"
            value={faculty}
            onChange={(e) => handleChange(e, setFaculty)}
            placeholder="Faculty"
            required
          />
        ) : (
          <select
            className={styles.inputText}
            value={selectedFaculty}
            onChange={handleFacultySelect}
            required
          >
            <option value="">Select Faculty</option>
            {Object.keys(faculties).map((facultyKey) => (
              <option key={facultyKey} value={facultyKey}>
                {faculties[facultyKey].name}
              </option>
            ))}
          </select>
        )}
        {errors.faculty && <p className={styles.error}>{errors.faculty}</p>}
      </div>

      <div>
        <label className={styles.label} htmlFor="department">
          Department:
        </label>
        {!isDepartmentSelectMode ? (
          <input
            className={styles.inputText}
            type="text"
            id="department"
            value={department}
            onChange={(e) => handleChange(e, setDepartment)}
            placeholder="Department"
            required
          />
        ) : (
          <select
            className={styles.inputText}
            value={selectedDepartment}
            onChange={handleDepartmentSelect}
            required
            disabled={!selectedFaculty && isFacultySelectMode}
          >
            <option value="">Select Department</option>
            {selectedFaculty &&
              faculties[selectedFaculty]?.departments.map((dept) => (
                <option key={dept} value={dept}>
                  {dept}
                </option>
              ))}
          </select>
        )}
        {errors.department && (
          <p className={styles.error}>{errors.department}</p>
        )}
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

export default EditForm;
