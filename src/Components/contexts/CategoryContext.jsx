import { createContext, useEffect, useState } from "react";
import { getAllCategory } from "../../api";
import useAlert from "../../hooks/useAlert";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const alert = useAlert();
  const [allCategories, setAllCategories] = useState([]);
  const [parentCategories, setParentCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    try {
      const result = await getAllCategory();
      const filterParentCategories = result.filter(
        (item) => item.parentId === null
      );
      setAllCategories(result);
      setParentCategories(filterParentCategories);
    } catch (error) {
      alert.error(error.response.data.message);
    }
  }

  return (
    <CategoryContext.Provider
      value={{
        allCategories,
        setAllCategories,
        parentCategories,
        setParentCategories,
      }}
    >
      {allCategories.length > 0 && children}
    </CategoryContext.Provider>
  );
};
