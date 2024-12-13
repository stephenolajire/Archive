import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../Api/api";
import axios from "axios";
import Swal from "sweetalert2";

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [journals, setJournals] = useState([]);
  const [pagination, setPagination] = useState({ next: null, previous: null });
  const link = "http://127.0.0.1:8000/api/";
  const render = "https://archive-backend-g7fi.onrender.com/api/";

  const checkAuth = () => {
    const token = localStorage.getItem("access");
    if (!token) {
      setIsAuthenticated(false);
      return;
    }

    try {
      const decoded = jwtDecode(token);
      const expiry_date = decoded.exp;
      const current_time = Date.now() / 1000;
      if (expiry_date > current_time) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        localStorage.removeItem("access");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const fetchJournals = async (url = `${render}journals`) => {
    try {
      const response = await axios.get(url);
      if (response) {
        setJournals(response.data.results);
        console.log(response.data);
        setPagination({
          next: response.data.next,
          previous: response.data.previous,
        });
      } else {
        console.error("Error: No response data");
      }
    } catch (err) {
      console.error("Error fetching product data:", err.message);
    }
  };

  useEffect(() => {
    fetchJournals();
  }, []);

  const [editJournal, setEditJournal] = useState([]);

  const handleEdit = async (id) => {
    console.log("Journal ID:", id);
    try {
      const response = await api.get(`journal/${id}`);
      if (response.status === 200) {
        setEditJournal(response.data);
        setIsEditModalOpen(true);
        console.log(response.data);
      } else if (response.status === 403) {
        Swal.fire("Error!", "You are not permitted to Edit", "error");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <GlobalContext.Provider
      value={{
        isAuthenticated,
        setIsModalOpen,
        isModalOpen,
        journals,
        pagination,
        checkAuth,
        fetchJournals,
        handleEdit,
        editJournal,
        isEditModalOpen,
        setIsEditModalOpen,
        setJournals,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
