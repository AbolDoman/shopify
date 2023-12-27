import { createContext, useContext, useReducer, useMemo } from "react";
import PropTypes from "prop-types";
const MaterialUI = createContext();
MaterialUI.displayName = "MaterialUIContext";
function reducer(state, action) {
  switch (action.type) {
    case "SET_SEARCH_TEXT": {
      return { ...state, searchText: action.value };
    }
    case "SET_INPUT_FOCUS": {
      return { ...state, inputFocus: action.value };
    }
    case "SET_SCROLL_Y": {
      return { ...state, scrollY: action.value };
    }
    case "SET_ACTIVE_FILTER": {
      return { ...state, activeFilter: action.value };
    }
    case "SET_FILTER_DRAWER": {
      return { ...state, filterDrawer: action.value };
    }
    case "SET_BOOKMARKS": {
      return { ...state, bookMarks: action.value };
    }
    case "SET_CHAT_OPEN": {
      return { ...state, chatOpen: action.value };
    }
    case "SET_CHAT_OVER": {
      return { ...state, chatOver: action.value };
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}

// Material Dashboard 2 React context provider
function MaterialUIControllerProvider({ children }) {
  const initialState = {
    searchText: "",
    inputFocus: false,
    chatOpen: true,
    filterDrawer: false,
    chatOver: false,
    scrollY: 0,
    activeFilter: 0,
    bookMarks: [],
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return <MaterialUI.Provider value={value}>{children}</MaterialUI.Provider>;
}

function useMaterialUIController() {
  const context = useContext(MaterialUI);

  if (!context) {
    throw new Error(
      "useMaterialUIController should be used inside the MaterialUIControllerProvider."
    );
  }

  return context;
}

// Typechecking props for the MaterialUIControllerProvider
MaterialUIControllerProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Context module functions
const setSearchText = (dispatch, value) => dispatch({ type: "SET_SEARCH_TEXT", value });
const setInputFocus = (dispatch, value) => dispatch({ type: "SET_INPUT_FOCUS", value });
const setChatOpen = (dispatch, value) => dispatch({ type: "SET_CHAT_OPEN", value });
const setScrollY = (dispatch, value) => dispatch({ type: "SET_SCROLL_Y", value });
const setActiveFilter = (dispatch, value) => dispatch({ type: "SET_ACTIVE_FILTER", value });
const setFilterDrawer = (dispatch, value) => dispatch({ type: "SET_FILTER_DRAWER", value });
const setBookMarks = (dispatch, value) => dispatch({ type: "SET_BOOKMARKS", value });
const setChatOver = (dispatch, value) => dispatch({ type: "SET_CHAT_OVER", value });
export {
    useMaterialUIController,
    MaterialUIControllerProvider,
    setSearchText,setChatOpen,
    setBookMarks,
    setChatOver,
    setInputFocus,
    setActiveFilter,
    setScrollY,
    setFilterDrawer,
};
