import React, { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const ScrollUp = () => {
  const [scroll, setScroll] = useState(true);

  useEffect(() => {
    if (scroll) {
      window.addEventListener("scroll", function () {
        const scrollUp = this.document.querySelector(".scrollup");
        //scroll higher than 560 viewport height
        //add show-scroll class to a tag with the scroll-top
        if (this.scrollY >= 560) scrollUp?.classList?.add("show-scroll");
        else scrollUp?.classList?.remove("show-scroll");
      });
    }
  }, []);

  useEffect(() => {
    setScroll(false);
  }, []);

  return (
    <a href="#" className="scrollup">
      {!scroll && <Icon icon="uil:arrow-up" className="scrollup__icon"></Icon>}
    </a>
  );
};

export default ScrollUp;
