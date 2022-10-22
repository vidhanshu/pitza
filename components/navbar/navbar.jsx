import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { NAVBAR } from "../../constants";
const Navbar = () => {
  const [count, setCount] = useState(2);
  return (
    <div
      className={`text-white h-[100px] px-5 bg-primary flex items-center sticky top-0 z-20`}
    >
      <div className={`center gap-2 flex-1`}>
        <div className={`rounded-full w-[50px] h-[50px] p-2 bg-white`}>
          <Image src={"/img/telephone.png"} width={32} height={32} alt="" />
        </div>
        <ul>
          <li className="text-xs">ORDER NOW</li>
          <li className="font-semibold text-lg">+012 1234 432</li>
        </ul>
      </div>
      <div className={`center flex-[3]`}>
        <ul className={`center gap-3`}>
          {NAVBAR.slice(0, 3).map(({ title, link }, idx) => (
            <li key={idx} className="link">
              <Link href={link}>{title}</Link>
            </li>
          ))}
          <div
            className={`center rounded-full border-4 border-orange-600 shadow-md cursor-pointer p-2 bg-white`}
          >
            <h1 className="text-black font-bold text-xl">PitZa</h1>
          </div>
          {NAVBAR.slice(3, NAVBAR.length).map(({ title, link }, idx) => (
            <li key={idx} className="link">
              <Link href={link}>{title}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={`center flex-1`}>
        <div className="relative link center cursor-pointer">
          <span className="z-10 bg-white text-black absolute top-[-8px] right-[-8px] w-5 h-5 rounded-full center">
            {count}
          </span>
          <Link href="/cart">
            <a>
              <Image src={"/img/cart.png"} width={32} height={32} alt="" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
