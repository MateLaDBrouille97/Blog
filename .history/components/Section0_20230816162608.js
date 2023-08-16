import React from "react";
import "remixicon/fonts/remixicon.css";

function Section0() {
  return (
    <section className="section">
      <div className="main-section">
        <div className="main-section-zero">
          <div className="left">
            <div className="lnav">
              <i class="ri-copyright-line"></i>
              <div className="lnavr">
                <a href="">Home</a>
                {/* <i class="ri-instagram-line"></i> */}
                <a  href="https://www.linkedin.com/in/manuel-thomas-labridy-70220a3a"><i class="ri-linkedin-box-fill"></i></a>
                
              </div>
            </div>
            <div className="textcenter">
              <h1>Welcome to OTOMATA,</h1>
              <p>
              Otomata serves as a blog passionately focused on the intricate relationship between Technology and its profound impact on our society, present and future energy needs, and environmental concerns like climate change. The blog strives to artistically depict the evolving connections among nations during the AI revolution era.
              </p>
              <a href="#section1">Read</a>
            </div>
          </div>
          <div className="right">
            <div className="rtop">
              <div className="rtopleft"></div>
              <div className="rtopright"></div>
            </div>
            <div className="rbottom"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Section0;
