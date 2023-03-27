import React from "react";

const Scrollbar = ({ subCategoryHacks }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [showTools, setShowTools] = React.useState(true);

  const handleClick = (index) => setActiveIndex(index);

  return (
    <div className="scrollbar-container">
      <div className="scrollbar-controls">
        <label>
          
          Tools
        </label>
      </div>
      <div className="scrollbar">
        <ul className="scrollbar-inner">
          {subCategoryHacks.map((category, index) => {
            if (
              category.name === "All" ||
              (category.name === "Tools" && !showTools)
            ) {
              return null;
            }
            return (
              <li
                key={index}
                className={activeIndex === index ? "active" : ""}
                onClick={() => handleClick(index)}
              >
                {category.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};

export default Scrollbar;
