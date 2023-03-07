import React, { useEffect, useState } from "react";


const LinkShare = () => {
  const [toggleState, setToggleState] = useState(false);

  const showModal = () => {
    setToggleState(!toggleState);
  };

  useEffect(() => {
    const selectors = document.querySelectorAll(".link");
    selectors.forEach((selector)=> selector?.addEventListener("click", function (event) {
      event.preventDefault();
    })
   );
  }, []);

  return (
    <div className="link">
      <button className="linkcard-share" onClick={showModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="22"
          height="22"
          fill="white"
          className="bi bi-share-fill"
          viewBox="0 0 16 16"
        >
          {" "}
          <path d="M11 2.5a2.5 2.5 0 1 1 .603 1.628l-6.718 3.12a2.499 2.499 0 0 1 0 1.504l6.718 3.12a2.5 2.5 0 1 1-.488.876l-6.718-3.12a2.5 2.5 0 1 1 0-3.256l6.718-3.12A2.5 2.5 0 0 1 11 2.5z" />{" "}
        </svg>
      </button>
      <div
        className={
          toggleState === true ? "modal-linkshare md:flex-none w-70 order-2 sm:order-1 flex justify-center item-center py-4 sm:py-0 show" : "modal-linkshare md:flex-none w-70 order-2 sm:order-1 flex justify-center item-center py-4 sm:py-0"
        }
      >
        <div className="md:flex-none w-70 order-2 sm:order-1 flex justify-center item-center py-4 sm:py-0">
              <input
                type="text"
                className="input-text"
                placeholder="Search..."
              ></input>
        </div>
      </div>
    </div>
  );
};

export default LinkShare;
