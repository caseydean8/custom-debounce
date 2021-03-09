import React from "react";
import "./style.css";
// import { DebounceInput } from "react-debounce-input";

// Using the datalist element we can create autofill suggestions based on the props.breeds array
function SearchForm(props) {
  return (
    <form className="search">
      <div className="form-group">
        <label htmlFor="language">Search Term:</label>
        {/* below replaces input tag  */}
        <input
          // minLength={2} from DebounceInput
          // debounceTimeout={3000} from DebounceInput
          value={props.search}
          onChange={props.handleInputChange}
          name="term"
          list="term"
          type="text"
          className="form-control"
          placeholder="Type in a search term to begin"
          id="term"
        />
      </div>
    </form>
  );
}

export default SearchForm;
