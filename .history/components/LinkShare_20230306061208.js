import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const LinkShare = () => {
  const [toggleState, setToggleState] = useState(false);

  const showModal = () => {
    setToggleState(!toggleState);
  };

  useEffect(() => {
    const selectors = document.querySelectorAll(".link");
    selectors.forEach((selector) =>
      selector?.addEventListener("click", function (event) {
        event.preventDefault();
      })
    );
  }, []);

  //Search Bar 
  const [query, setQuery] = useState("");
  const router = useRouter();

  function handleSubmit(event) {
    event.preventDefault();
    router.push(`/Categories/${query}`);
    setQuery("");
  }



  return (
    <div className="link">
      <button className="linkcard-share" onClick={showModal}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-search"
          viewBox="0 0 16 16"
        >
          {" "}
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />{" "}
        </svg>
      </button>
      <div
        className={
          toggleState === true
            ? "work__modal active-modal"
            : "work__modal"
        }
      >
        <form className="md:flex-none w-70 order-2 sm:order-1 flex justify-center py-4 sm:py-0 form__text" onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-text"
            placeholder="Search..."
            value={query}
            onChange={(event) => setQuery(event?.target?.value)}
          ></input>
        </form>
      </div>
    </div>
  );
};

export default LinkShare;
