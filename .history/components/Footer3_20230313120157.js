import { Icon } from "@iconify/react";
import React from "react";

export default function Footer3() {
  return (
    <footer className="footer bg-light text-dark pt-5 pb-4">
      <div className=" container contact__container text-center text-md-left ">
        <div className="row text-center text-md-left  ">
          <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
            <h5 className="contact__title">
              About OTOMATA
            </h5>
            <hr className="mb-4 " />
            <p>
              Looking for a tech blog that's more electrifying than a lightning
              bolt? Look no further than our energy transition-focused platform!
              We've got all the latest on tech evolution and trends, plus some
              killer hacks that'll make you feel like an AI wizard. At our blog,
              we don't just talk about technology for the sake of it - we focus
              on how it can be used to create a more sustainable world. We
              understand that energy transition is one of the most important
              challenges we face as a society, and we are committed to using our
              platform to help drive positive change.
              {/* One of the things that sets our blog apart is our use of artificial intelligence. We believe that AI is a powerful tool that can be used to unlock new insights and drive innovation in the field of energy transition. That's why we are always exploring new ways to leverage AI in our work, from developing predictive models to automating routine tasks. */}
              Whether you're interested in cutting-edge renewable energy
              solutions or just want to geek out on some cool programming
              projects, we've got you covered. And we promise to keep things
              light and fun - after all, who said energy transition can't be a
              little bit hilarious? So what are you waiting for? Join the
              revolution and start exploring our blog today. We guarantee you
              won't be disappointed - and who knows, you might even learn a
              thing or two!{" "}
            </p>
          </div>
          <div className="">
            <h5 className="contact__title">
              Let Me Help
            </h5>
            <hr className="mb-4 " />
            <p>
              <a href="#" className="text-dark">
                {" "}
                Your Account{" "}
              </a>
            </p>
            <p>
              <a href="#" className="text-dark">
                {" "}
                Your Account{" "}
              </a>
            </p>
            <p>
              <a href="#" className="text-dark">
                {" "}
                Your Account{" "}
              </a>
            </p>
          </div>
          <div className="">
            <h5 className="contact__title">
              OTOMATA The Blog
            </h5>
            <hr className="mb-4 " />
            <p>
              <a href="#" className="text-dark">
                {" "}
                Home{" "}
              </a>
            </p>
            <p>
              <a href="#" className="text-dark">
                {" "}
                Useful Hacks{" "}
              </a>
            </p>
            <p>
              <a href="#" className="text-dark">
                {" "}
                Tech News{" "}
              </a>
            </p>
            <p>
              <a href="#" className="text-dark">
                {" "}
                Projects{" "}
              </a>
            </p>
          </div>
          <div className="">
            <h5 className="contact__title">
              Contact
            </h5>
            <hr className="mb-4 "/>
            <p>
              <Icon icon="bx:mail-send" className="contact__card-icon"></Icon>Address
            </p>
            <p>
              <Icon icon="bxl:whatsapp" className="contact__card-icon"></Icon>Address
            </p>
            <p>
              <Icon icon="bxl:instagram" className="contact__card-icon"></Icon>Address
            </p>
          </div>
          <hr className="mb-4 "/>
          <div className="row d-flex justify-content-center">
            <div>
                <p>
                <span className="footer__copy">Copyright &#169;2022 Manuel LABRIDY All rights reserved</span>
                <a href="#">
                    <strong className="text-info"> OTOMATA</strong>
                </a>
                </p>
            </div>
          </div>
          <div className="footer__social">

              <a href="https://www.instagram.com/oto.mata33/" className="footer__social-link" target="_blank" rel="noreferrer">
               <Icon icon="bxl:instagram"></Icon>
              </a>

              <a href="https://www.linkedin.com/" className="footer__social-link color-link1" target="_blank" rel="noreferrer">
                <Icon icon="bxl:linkedin-square"></Icon>
              </a>

              <a href="https://github.com/LuckyMate97" className="footer__social-link color-link2" target="_blank" rel="noreferrer">
                 <Icon icon="bxl:github"></Icon>
              </a>
     
            </div>
        </div>
      </div>
    </footer>
  );
}
