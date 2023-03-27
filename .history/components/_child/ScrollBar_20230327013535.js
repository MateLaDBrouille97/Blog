import React from 'react';

const Scrollbar = ({ subCategoryHacks }) => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const handleClick = (index) => setActiveIndex(index);

  return (
    <div className="scrollbar">
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
  );
};

export default Scrollbar;