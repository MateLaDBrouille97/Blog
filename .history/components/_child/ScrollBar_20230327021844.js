import React, { useState } from 'react';


function ScrollBar() {
  const [showTools, setShowTools] = useState(false);

  const handleToolsToggle = ({ subCategoryHacks } ) => {
    setShowTools(!showTools);
  };

  return (
    <div className="scrollbar-container">
      <div className="scrollbar">
        <ul className="scrollbar-inner">
          {subCategoryHacks.map((category) => (
            <li
              key={category.name}
              className={category.name === 'All' ? 'active' : ''}
            >
              {category.name}
            </li>
          ))}
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
      <div className="scrollbar-controls">
        <label>
          <input
            type="checkbox"
            checked={showTools}
            onChange={handleToolsToggle}
          />
          Tools
        </label>
      </div>
    </div>
  );
}

export default ScrollBar;