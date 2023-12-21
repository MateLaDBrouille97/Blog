import React from "react";
// import photos from "../../data";


export default function Featured() {
//   const [firstImage, secondImage] = photos;
  const images=["/kirill-shavlo-PY5DFAeLFAA-unsplash.jpg","/marvin-meyer-SYTO3xs06fU-unsplash.jpg","/etactics-inc-bw6KWl4KaFg-unsplash.jpg"]
  return (
    <section className="featured-section"  data-scroll-section>
      <div className="featured-row-layout">
        <h6></h6>
        <img src={images[0]} data-scroll/>
      </div>
      <div className='featured-column-layout'>
        <h6></h6>
        <img src={images[1]} data-scroll/>
      </div>
      {/* <div className='featured-center-layout'>
        <h6></h6>
        <img src={images[2]} data-scroll/>
      </div> */}
    </section>
  );
}