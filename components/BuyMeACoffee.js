import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import Image from "next/image";
import bmc from "../public/bmc-logo.png";

const BuyMeACoffee = () => {
  const [toggleState, setToggleState] = useState(false);
  // const [user,setUser]=useState('');

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
    <div className="link2">
       <div className="linkcard-share2" onClick={showModal}>
         { (
            <>
              <a href="https://www.buymeacoffee.com/mlab33972z/e/133154" target="_blank" rel="noreferrer">
                <Image width={18} src={bmc} alt="Buy me a coffee" />
              </a>
            </>
          )}
       </div>
    </div>
  );
};

export default BuyMeACoffee;
