import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import clsx from "clsx";

const useStyles = makeStyles((theme) => ({
  categoriesBar: {
    display: "flex",
    padding: "0.5rem 0",
    fontSize: "0.8rem",
    overflowX: "scroll",
    " &::-webkit-scrollbar": {
      width: "0px",
    },
  },

  categories: {
    marginRight: "1rem",
    padding: "0.5rem",
    whiteSpace: "nowrap",
    border: "1.5px solid #b1bdb4",
    borderRadius: "999px",

    "&:hover": {
      backgroundColor: "#374a59",
    },
  },
  categoryActive: {
    color: "#fff",
    backgroundColor: "#606060",
    borderColor: "#4c4c4c",
  },
}));

const keywords = [
  "All",
  "React Js",
  "Node Api",
  "React hooks",
  "Next Js",
  "Nest Js",
  "Typescript",
  "React Native",
  "Linkedin",
  "Context Api",
  "LoFi Music",
  "Redux",
  "Coding",
  "Cricket",
  "Clever Programmer",
  "Shwetabh",
];

const CategoriesBar = () => {
  const classes = useStyles();
  const [activeElement, setActiveElement] = useState("All");

  const handleActiveElement = (value) => {
    setActiveElement(value);
  };

  return (
    <div className={classes.categoriesBar}>
      {keywords.map((value, i) => (
        <span
          key={i}
          onClick={() => handleActiveElement(value)}
          className={
            activeElement === value
              ? clsx(classes.categories, classes.categoryActive)
              : classes.categories
          }
        >
          {value}
        </span>
      ))}
    </div>
  );
};
export default CategoriesBar;
