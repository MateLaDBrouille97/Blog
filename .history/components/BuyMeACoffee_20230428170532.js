import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import Image from "next/image";
import bmc from "../public/bmc-logo.png";

const BuyMeACoffee = ({author}) => {
  const [toggleState, setToggleState] = useState(false);

  const toggleTab = (index) => {
    setToggleState(index);
  };

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
    const modal = document.querySelector(".active-modal");
    modal.style.display = "none";
  }

  return (
    <div className="link">
       <div className="linkcard-share2" onClick={showModal}>
         {author?.buyMeACoffee && (
            <>
              <a href={author?.buyMeACoffee} target="_blank" rel="noreferrer">
                <Image width={20} src={bmc} alt="Buy me a coffee" />
              </a>
            </>
          )}
       </div>
      

    </div>
  );
};

export default BuyMeACoffee;