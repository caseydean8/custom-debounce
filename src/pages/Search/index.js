import React, { useState, useEffect } from "react";
import Container from "../../components/Container";
import SearchForm from "../../components/SearchForm";
import SearchResults from "../../components/SearchResults";
import Alert from "../../components/Alert";
import ArticleContext from "../../utils/ArticleContext";
import API from "../../utils/API";
import { useDebounce } from 'use-debounce';

// import UseDebounce from "../../utils/Debounce";
// import { DebounceInput } from "react-debounce-input";
// above moved to searchForm component...
// sudo yarn start made browser detect changes...

function Search() {
  const [articleState, setArticleState] = useState({
    title: "",
    description: "",
    url: "",
  });

  const [search, setSearch] = useState("Wikipedia");
  const [error, setError] = useState("");
  console.log(search);
  const [bounceSearch] = useDebounce(search, 1000);

  // const bounceSearch = UseDebounce(search, 2000);
  // console.log(`bounceSearch = '${bounceSearch}'`);

  // When the component mounts, update the title to be Wikipedia Searcher
  useEffect(() => {
    document.title = "Wikipedia Searcher";
    // console.log(`bounceSearch in useEffect ${bounceSearch}`);
    //  * Update the `Search` page so that the useEffect Hook is listening for the value returned from the `useDebounce` Hook. Pass in a `delay` value of 500.

    //* The finished application should only search for a new article if there has been a period of 500 milliseconds without any user input.
    if (!bounceSearch) {
      return;
    }

    API.searchTerms(bounceSearch)
      // useDebounce(search)
      .then((res) => {
        if (res.data.length === 0) {
          throw new Error("No results found.");
        }
        if (res.data.status === "error") {
          throw new Error(res.data.message);
        }
        setArticleState({
          title: res.data[1],
          description: res.data[2][0],
          url: res.data[3][0],
        });
      })
      .catch((err) => setError(err));
  }, [bounceSearch]);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
    // const wait = UseDebounce(event.target.value, 500);
    // console.log(wait);
    // setSearch(wait);
    // setSearch(UseDebounce(event.target.value, 3000));
    // UseDebounce(setSearch(event.target.value), 3000);
    // const wait = UseDebounce(event.target.value, 2000);
    // console.log(wait);
    // setSearch(wait);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

  // useDebounce(handleInputChange, 500);

  return (
    <ArticleContext.Provider value={articleState}>
      <div>
        <Container style={{ minHeight: "100vh" }}>
          <h1 className="text-center">Search For Anything on Wikipedia</h1>
          <Alert
            type="danger"
            style={{ opacity: error ? 1 : 0, marginBottom: 10 }}
          >
            {error}
          </Alert>
          <SearchForm
            // {/* <DebounceInput */}
              // {/* minLength={4} */}
              // {/* debounceTimeout={500} */}
              handleFormSubmit={handleFormSubmit}
              handleInputChange={handleInputChange}
              results={search} />
            {/* /> */}
          {/* </SearchForm> */}
          <SearchResults />
        </Container>
      </div>
    </ArticleContext.Provider>
  );
}

export default Search;
