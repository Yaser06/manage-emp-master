import { createContext, useEffect, useReducer, useState } from "react";
import useGetItems from "../customHook/useGetItems";
import useGetNotice from "../customHook/useGetNotice";
import noticeReducer from "../utilities/noticeReducer";

export const NoticeContext = createContext();

const NoticeContextProvider = (props) => {
  const [admin,setAdmin]= useState(true)


  const [notice, dispatch] = useReducer(noticeReducer, []);
  const items = useGetNotice();
  useEffect(()=>{
    console.log('notice',items)
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
