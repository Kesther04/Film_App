import { createContext, useContext, useState } from "react";

// Create context with an explicit name (capitalized)
const QueryContext = createContext();

// Provider component to wrap the app and provide context values
export const QueryProvider = ({ children }) => {
  const [query, setQuery] = useState("");

  return (
    <QueryContext.Provider value={{ query, setQuery }}>
      {children}
    </QueryContext.Provider>
  );
};

// Custom hook for consuming context easily
export const useSearch = () => {
  const context = useContext(QueryContext);
  if (!context) {
    throw new Error("useSearch must be used within a QueryProvider");
  }
  return context;
};
