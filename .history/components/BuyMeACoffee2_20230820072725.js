import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";
import Image from "next/image";
import bmc from "../public/bmc-logo.png";

const BuyMeACoffee2 = ({author}) => {
  const [toggleState, setToggleState] = useState(false);
  const [user,setUser]=useState('');
  const toggleTab = (index) => {
    setToggleState(index);
  };

  const showModal = () => {
    setToggleState(!toggleState);
  };

  useEffect(()=>{
    setUser(author)
  },[author])

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
    <div className="link3">
       <div className="linkcard-share3" 
       onClick={showModal}
       >
         {user?.buyMeACoffee && (
            <>
              <a href={user?.buyMeACoffee} target="_blank" rel="noreferrer">
                <Image width={18} height={18} src={bmc} alt="Buy me a coffee" className="buyMe__a-coffee" />
              </a>
            </>
          )}
       </div>  
    </div>
  );
};

export default BuyMeACoffee2;
