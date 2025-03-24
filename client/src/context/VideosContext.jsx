import React, { useReducer, useContext, createContext } from "react";

const videoContext = createContext();

const initialState = {
  loading: false,
  videos: [],
  error: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "VIDEOS_REQUEST": {
      return {
        ...state,
        loading: true,
        error: null,
      };
    }
    case "VIDEOS_SUCCESS": {
      return {
        ...state,
        loading: false,
        videos: action.payload.docs || [],
        error: null,
      };
    }
    case "VIDEOS_ERROR": {
      return {
        ...state,
        loading: false,
        error: action.payload,
        videos: null,
      };
    }

    default:
      break;
  }
};

const VideoProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <videoContext.Provider value={{ state, dispatch }}>
      {children}
    </videoContext.Provider>
  );
};

export const useVideo = () => {
  return useContext(videoContext);
};

export { VideoProvider };
