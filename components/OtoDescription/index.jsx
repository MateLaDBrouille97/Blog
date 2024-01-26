"use client";
import Paragraph from "../OtoDescription/_components/Paragraph";
import Word from "../OtoDescription/_components/Word";
import Character from "../OtoDescription/_components/Character";
import Link from "next/link";

const paragraph =
  "Otomata serves as a blog focused on the intricate relationship between Technology and its profound impact on our society, on sciences, present and future energy needs, and environmental concerns like climate change. The blog strives to depict a sketch of the evolving connections among nations during the AI revolution era.";

export default function OtoDescription() {
  const words = paragraph.split(" ");
  return (
    <>
      <section
        className="section section4 mx-auto md:px-20 py-16  w-8/9 "
        id="section1"
      >
        <div className="container-section4">
          <div style={{ height: "10vh" }}></div>
          {/* <Paragraph paragraph={paragraph}/>
        <div style={{height: "100vh"}}></div> */}
          <Word paragraph={paragraph} />
          <div style={{ height: "10vh" }}></div>
          {/* <Character paragraph={paragraph} /> */}
          {/* <div style={{height: "100vh"}}></div> */}
          <Link href="/Home">
          <div className="button-Otomata-container">
            <div className="button-Otomata">Take a look</div>
          </div>
          </Link>
        
        </div>
      </section>
    </>
  );
}
