import React, { useState } from "react";

function ScrollBar({ subCategoryHacks }) {
  const [showTools, setShowTools] = useState(false);

  const handleToolsToggle = () => {
    setShowTools(!showTools);
  };

  return (
    <div className="scrollbar-container">
      <div className="scrollbar-controls">
        <button  checked={showTools}
            onChange={handleToolsToggle} >
          
          Tools
        </button>
      </div>
      <div className="scrollbar">
        <ul className="scrollbar-inner">
          {/* {subCategoryHacks.map((category) => (
            <li
              key={category.name}
              className={category.name === 'All' ? 'active' : ''}
            >
              {category.name}
            </li>
          ))} */}
          {showTools && (
            <>
              <li>Productivity</li>
              <li>Assistants</li>
              <li>Research Tools</li>
              <li>CopyWriting</li>
              <li>Code Tools</li>
              <li>Other</li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ScrollBar;
