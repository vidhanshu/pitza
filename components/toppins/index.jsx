import Image from "next/image";
import React from "react";
const Toppins = ({ extra,getSize }) => {
  return (
    <>
      {extra.chees && (
        <div className="absolute top-[10%] left-[10%]">
          <Image alt="" src="/img/chees.png" width={100} height={100} />
        </div>
      )}
      {extra.pepperoni && (
        <div className="absolute top-[10%] left-[10%]">
          <Image
            alt=""
            src="/img/pepperoni.png"
            width={getSize() - 100}
            height={getSize() - 100}
          />
        </div>
      )}
      {extra.mushroom && (
        <div className="absolute top-[10%] left-[10%]">
          <Image
            alt=""
            src="/img/mushroom.png"
            width={getSize() - 100}
            height={getSize() - 100}
          />
        </div>
      )}
      {extra.sauce && (
        <div className="absolute right-[-10%] top-0">
          <Image alt="" src="/img/sauce.png" width={200} height={100} />
        </div>
      )}
    </>
  );
};

export default Toppins;
