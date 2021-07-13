import { createContext, useEffect, useReducer, useState } from "react";
import useGetItems from "../customHook/useGetItems";
import reducer from "../utilities/reducer";

export const NewsContext = createContext();

const NewsContextProvider = (props) => {
  const [admin,setAdmin]= useState(true)
  const [news, dispatch] = useReducer(reducer, []);
  const items = useGetItems();
  useEffect(()=>{
    dispatch({
      type:'finished',
      state:items
    })
  },[items])
  return (
    <NewsContext.Provider
      value={{ news,dispatch,setAdmin,admin }}
    >
      {props.children}
    </NewsContext.Provider>
  );
};

export default NewsContextProvider;
