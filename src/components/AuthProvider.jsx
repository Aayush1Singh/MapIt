/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
import { useContext, createContext, useReducer } from "react";
const FAKE_USER = {
  name: "Jack",
  email: "jack@example.com",
  password: "qwerty",
  avatar: "https://i.pravatar.cc/100?u=zz",
};

const authContext = createContext();
function reducer(state, action) {
  switch (action.type) {
    case "login":
      return { user: action.payload, isAuthenticated: true };
    case "logout":
      return { user: null, isAuthenticated: false };
    default:
      throw Error(`${action.type} method not recognised`);
  }
}
function AuthProvider({ children }) {
  const [{ user, isAuthenticated }, dispatcher] = useReducer(reducer, {
    user: null,
    isAAuthenticated: false,
  });
  function login(email, password) {
    if (!email || !password) return;
    if (email == FAKE_USER.email && password === FAKE_USER.password) {
      dispatcher({ type: "login", payload: FAKE_USER });
    }
  }
  function logout() {
    dispatcher({ type: "logout" });
  }
  return (
    <authContext.Provider value={{ user, isAuthenticated, login, logout }}>
      {children}
    </authContext.Provider>
  );
}

function useAuth() {
  const context = useContext(authContext);

  if (!context) throw Error("access out of context");

  return context;
}

export { useAuth, AuthProvider };
