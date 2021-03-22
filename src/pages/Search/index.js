import React, { useState, useEffect } from "react";
import Container from "../../components/Container";
import SearchForm from "../../components/SearchForm";
import SearchResults from "../../components/SearchResults";
import Alert from "../../components/Alert";
import ArticleContext from "../../utils/ArticleContext";
import API from "../../utils/API";
// previous word in Vim is b
// import { useDebounce } from 'use-debounce';

import UseDebounce from "../../utils/Debounce";
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
  const debounceSearch = UseDebounce(search, 1000);

  // When the component mounts, update the title to be Wikipedia Searcher
  useEffect(() => {
    document.title = "Wikipedia Searcher";
    //  * Update the `Search` page so that the useEffect Hook is listening for the value returned from the `useDebounce` Hook. Pass in a `delay` value of 500.

    //* The finished application should only search for a new article if there has been a period of 500 milliseconds without any user input.
    if (!debounceSearch) {
      return;
    }

    API.searchTerms(debounceSearch)
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
  }, [debounceSearch]);

  const handleInputChange = (event) => {
    setSearch(event.target.value);
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
  };

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
            handleFormSubmit={handleFormSubmit}
            // handleInputChange={UseDebounce(handleInputChange, 1000)}
            handleInputChange={handleInputChange}
            results={search}
          />
          <SearchResults />
        </Container>
      </div>
    </ArticleContext.Provider>
  );
}

export default Search;
