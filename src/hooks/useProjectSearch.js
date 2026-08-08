import { useContext } from "react";
import ProjectContext from "../context/ProjectContext";

function useProjectSearch() {
  const {
    searchQuery,
    setSearchQuery,
  } = useContext(ProjectContext);

  return {
    searchQuery,
    setSearchQuery,
  };
}

export default useProjectSearch;
