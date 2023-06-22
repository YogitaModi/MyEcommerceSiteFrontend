import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

const Searchprovider = (props) => {
  const [search, setSearch] = useState({
    keyword: "",
    results: [],
  });

  return (
    <SearchContext.Provider value={[search, setSearch]}>
      {props.children}
    </SearchContext.Provider>
  );
};
// custom hook
const useSearch = () => useContext(SearchContext);
export { Searchprovider, useSearch };
