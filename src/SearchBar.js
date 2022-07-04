import "./style/SearchBar.css";
import Logo from "./logo";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { useNavigate } from "react-router-dom";

function SearchBar() {
  const [inputSearch, setInputSearch] = useState("");
  const navigate = useNavigate();

  return (
    <div className="nav-bar">
      <Link className="nav-bar-logo" to="/">
        <Logo fill="white" />
      </Link>
      <div className="searchBar">
        <input
          className="searchText"
          type="text"
          placeholder="Search"
          onChange={(event) => setInputSearch(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              navigate(`/search/${inputSearch}`);
            }
          }}
          value={inputSearch}
        ></input>
        <Link to={`/search/${inputSearch}`}>
          <SearchIcon className="searchButton" />
        </Link>
      </div>
    </div>
  );
}

export default SearchBar;
