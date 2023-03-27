import React, { useState } from "react";



function Dropdown({ subCategoryHacks }) {
    const [selectedOption, setSelectedOption] = useState(subCategoryHacks[0]);
  
    function handleOptionChange(event) {
      const selectedOptionIndex = event.target.selectedIndex;
      setSelectedOption(subCategoryHacks[selectedOptionIndex]);
    }
  
    return (
      <div className="dropdown-container">
        
        <select id="subCategory" onChange={handleOptionChange} value={selectedOption.name}>
          {subCategoryHacks.slice(1,6).map((option, index) => (
            <option key={index} value={option.name}>{option.name}</option>
          ))}
        </select>
      </div>
    );
  }
  
  export default Dropdown;



