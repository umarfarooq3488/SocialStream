import { createContext, useReducer, useContext } from "react";

const initialState = {
  user: null,
  error: null,
  loading: null,
};

export const UserContext = createContext(initialState);

const reducer = (state, action) => {
  switch (action.type) {
    case "REGISTER_REQUEST":
      return { ...state, loading: true, error: null };
    case "REGISTER_SUCCESS":
      return { ...state, loading: false, user: action.payload };
    case "REGISTER_ERROR":
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <UserContext.Provider value={{ state, dispatch }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  return useContext(UserContext);
};
