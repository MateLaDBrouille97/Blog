import React from 'react';

function Button (props) {
  const { onClick, text } = props;
  const handleClick = () => {
    window.location.href = address;
  }

  return (
    <button onClick={handleClick}>
      {text}
    </button>
  );
}

export default Button;