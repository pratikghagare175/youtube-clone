import React from "react";
import { useParams } from "react-router-dom";

const SearchScreen = () => {
  const { query } = useParams();
  return (
    <div>
      <h1>{query}</h1>
    </div>
  );
};

export default SearchScreen;
