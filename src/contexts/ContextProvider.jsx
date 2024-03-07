import { createContext, useContext, useState } from "react";

const StateContext = createContext({
  user: null,
  token: null,
  setUser: () => {},
  setToken: () => {},
});

const ContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    name: "John Doe",
  });
  const [token, _setToken] = useState(localStorage.getItem("JWT_TOKEN"));

  const setToken = (token) => {
    _setToken(token);
    if (token) {
      localStorage.setItem("JWT_TOKEN", token);
    } else {
      localStorage.removeItem("JWT_TOKEN");
    }
  };
  return (
    <StateContext.Provider value={{ user, token, setUser, setToken }}>
      {children}
    </StateContext.Provider>
  );
};

const useStateContext = () => useContext(StateContext);

// eslint-disable-next-line react-refresh/only-export-components
export { ContextProvider, useStateContext };
