import React from "react";
import Image from "next/image";
import img from "../../public/images/Broken.png";
import Format from "../../layout/Format";

export default function Error() {
  return (
    <Format>
      <div className="text-center py-10 mt-20">
        <h1 className="text-3xl font-bold text-orange-600 py-10">
          Something went wrong
        </h1>
        <div className="flex justify-center item-center">
          <Image src={img} alt="" width={400} height={400} />
        </div>
      </div>
    </Format>
  );
}
