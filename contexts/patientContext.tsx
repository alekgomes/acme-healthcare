import { createContext, ReactNode, useContext, useState } from "react";

export const emptyUser = { name: "", repos: [], info: {} };

const UserContext = createContext(null);

export function UserContextProvider({ children }) {
  const [user, setUser] = useState(emptyUser);
  const [sortState, setSortState] = useState("DESC");
  const toggleSorting = () => {
    setUser({ ...user, repos: user.repos.reverse() });
    setSortState((prev) => (prev === "DESC" ? "ASC" : "DESC"));
  };

  return (
    <UserContext.Provider value={{ user, setUser, toggleSorting, sortState }}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);

  if (!context) {
    throw Error("UserContext error");
  }

  return context;
}
