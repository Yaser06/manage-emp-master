import NewsList from "./components/NewsList";
import NoticeList from "./components/NoticeList";
import  NewsContextProvider  from "./context/NewsContext";
import  NoticeContextProvider  from "./context/NoticeContext";
import { useState } from "react";

function App() {

  const [newsOrNotice, setNewsOrNotice  ] = useState(false);


  return (
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
          {newsOrNotice ?   <NewsContextProvider>
              <NewsList setNewsOrNotice ={setNewsOrNotice} newsOrNotice={newsOrNotice} ></NewsList>
            </NewsContextProvider>:
            <NoticeContextProvider>
              <NoticeList setNewsOrNotice ={setNewsOrNotice} newsOrNotice={newsOrNotice}></NoticeList>
            </NoticeContextProvider>}
            
          </div>
        </div>
      </div>
  );
}

export default App;
