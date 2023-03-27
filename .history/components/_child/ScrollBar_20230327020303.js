import React from 'react';

const Scrollbar = ({ subCategoryHacks }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const [showScrollbar, setShowScrollbar] = React.useState(true);
  const handleClick = (index) => setActiveIndex(index);

  const handleToggleScrollbar = () => setShowScrollbar(!showScrollbar);

  return (
    <div className="scrollbar-container">
      <div
        className={`scrollbar ${showScrollbar ? "show" : "hide"}`}
        onScroll={() => handleToggleScrollbar()}
      >
        <ul className="scrollbar-inner">
          {subCategoryHacks.map((category, index) => (
            <li
              key={index}
              className={activeIndex === index ? "active" : ""}
              onClick={() => handleClick(index)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <button onClick={() => handleToggleScrollbar()}>
        {showScrollbar ? "Hide Scrollbar" : "Show Scrollbar"}
      </button>
    </div>
  );
};

export default Scrollbar;