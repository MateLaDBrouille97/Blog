import React, { useState } from "react";



function Dropdown({ subCategoryHacks }) {
    const [selectedOption, setSelectedOption] = useState(subCategoryHacks[0]);
  
    function handleOptionChange(event) {
      const selectedOptionIndex = event.target.selectedIndex;
      setSelectedOption(subCategoryHacks[selectedOptionIndex]);
    }
  
    return (
      <div className="dropdown-container">
         <nav aria-label="main navigation">
      <ul class="menus">
        <li><a href="#">All</a></li>
        <li>
          <button 
            type="button" 
            aria-haspopup="true" 
            aria-expanded="true" 
            aria-controls="dropdown1"  
          >
            Tools<span class="arrow"></span>   
          </button>
          <ul class="dropdown" id="dropdown1">
          {subCategoryHacks.slice(1,6).map((option, index) => (
            <option key={index} value={option.name}>{option.name}</option>
          ))}
          </ul>
        </li>
        
      </ul>
    </nav>


       
      </div>
    );
  }
  
  export default Dropdown;



