import React from 'react';

function Button (props) {
  const { address, text } = props;
  const handleClick = () => {
    window.location.href = address;
  }

  return (
    <button className="button" type='button' onClick={handleClick}>
      {text}
    </button>
  );
}

export default Button;