import React from "react";
import Image from "next/image";
import img from "../../public/images/Broken.png";
import Format from "../../layout/Format";

export default function Error2() {
  return (
   
      <div className="text-center py-4">
        <h1 className="text-3xl font-bold text-orange-600 py-2">
          Something went wrong
        </h1>
        <div className="flex justify-center item-center">
          <Image src={img} alt="" width={400} height={400} />
        </div>
      </div>
   
  );
}
