import { createContext, useReducer, useEffect, useContext } from "react";

const initialState = {
  user: localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user"))
    : null,
  error: null,
  loading: null,
  isAuthenticated: Boolean(localStorage.getItem("user")),
};

// Create context
const UserContext = createContext();

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_REQUEST":
      return { ...state, loading: true, error: null };
    case "REGISTER_SUCCESS":
      return { ...state, loading: false, user: action.payload };
    case "REGISTER_FAILED":
      return { ...state, loading: false, error: action.payload };
    case "LOGIN_REQUEST":
      return { ...state, loading: true };
    case "LOGIN_SUCCESS":
      localStorage.setItem("user", JSON.stringify(action.payload));
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };
    case "LOGIN_FAILED":
      localStorage.removeItem("user");
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        error: action.payload,
      };
    case "LOGOUT":
      localStorage.removeItem("user");
      return {
        ...state,
        loading: false,
        user: null,
        isAuthenticated: false,
        error: null,
      };
    default:
      return state;
  }
};

// Provider Component
const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    console.log("Auth State:", {
      user: state.user,
      isAuthenticated: state.isAuthenticated,
    });
  }, [state.user, state.isAuthenticated]);

  const value = {
    state,
    dispatch,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

// Custom Hook
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export { UserProvider };
