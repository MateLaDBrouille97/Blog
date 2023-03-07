import React, { useEffect, useState } from "react";
import {
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  FacebookIcon,
  LinkedinIcon,
  TelegramIcon,
  WhatsappIcon,
  TwitterIcon,
} from "react-share";

const LinkShare = ({href}) => {
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
          toggleState === true ? "modal-linkshare show" : "modal-linkshare"
        }
      >
        <ul className="icons-share">
          <FacebookShareButton
            url={href}
            className="social__link-share"
          >
            <FacebookIcon size={22} round={true} />
          </FacebookShareButton>

          <LinkedinShareButton
            url={href}
            className="social__link-share"
          >
            <LinkedinIcon size={22} round={true} />
          </LinkedinShareButton>
          <TwitterShareButton
            url={href}
            className="social__link-share"
          >
            <TwitterIcon size={22} round={true} />
          </TwitterShareButton>
          <WhatsappShareButton
            url={href}
            className="social__link-share"
          >
            <WhatsappIcon size={22} round={true} />
          </WhatsappShareButton>
          <TelegramShareButton
            url="http://localhost:3000/"
            className="social__link-share"
          >
            <TelegramIcon size={22} round={true} />
          </TelegramShareButton>
        </ul>
      </div>
    </div>
  );
};

export default LinkShare;
