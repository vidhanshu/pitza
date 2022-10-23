import Image from "next/image";
import Link from "next/link";
import React from "react";

export const PizzaCard = ({ _id, img, title, price, description }) => {
  return (
    <Link href={`/products/${_id}`}>
      <div
        className={`cursor-pointer max-w-xs p-3 flex flex-col gap-5 justify-center items-center rounded-md border-2`}
      >
        <div className={`relative w-[200px] h-[200px]`}>
          <Image src={img} layout="fill" alt="" />
        </div>
        <div className="text-center">
          <h1 className={`text-2xl font-bold text-primary`}>{title}</h1>
          <h2 className={`text-md font-bold`}>₹{price}/- INR</h2>
          <p className={`text-sm`}>{description}</p>
        </div>
      </div>
    </Link>
  );
};
