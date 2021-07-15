import { createContext, useEffect, useReducer, useState } from "react";
import useGetItems from "../customHook/useGetItems";
import useGetNotice from "../customHook/useGetNotice";

import reducer from "../utilities/reducer";

export const NoticeContext = createContext();

const NoticeContextProvider = (props) => {
  const [admin,setAdmin]= useState(true)


  const [notice, dispatch] = useReducer(reducer, []);
  const items = useGetNotice();
  useEffect(()=>{
    dispatch({
      type:'finished',
      state:items
    })
  },[items])
  return (
    <NoticeContext.Provider
      value={{ notice,dispatch,setAdmin,admin }}
    >
      {props.children}
    </NoticeContext.Provider>
  );
};

export default NoticeContextProvider;
