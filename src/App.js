import NewsList from "./components/NewsList";
import  NewsContextProvider  from "./context/NewsContext";

function App() {
  return (
      <div className="container-xl">
        <div className="table-responsive">
          <div className="table-wrapper">
            <NewsContextProvider>
              <NewsList></NewsList>
            </NewsContextProvider>
          </div>
        </div>
      </div>
  );
}

export default App;
