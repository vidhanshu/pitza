import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { FaBars } from "react-icons/fa";
import { NAVBAR } from "../../constants";
const Navbar = () => {
  const [count, setCount] = useState(2);
  const [active, setActive] = useState(false);

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
          <li className="font-semibold text-lg">+012123</li>
        </ul>
      </div>
      <div className={`center flex-[3] hidden lg:block`}>
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
      <div className={`center flex-1 gap-5`}>
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
        <span
          onClick={() => setActive((e) => !e)}
          className="link cursor-pointer lg:hidden block"
        >
          <FaBars size={30} />
        </span>
      </div>
      {active && (
        <div
          onClick={() => setActive(false)}
          className="lg:hidden fixed top-[100px] bottom-0 left-0 right-0 bg-[rgba(0,0,0,.5)]"
        ></div>
      )}
      <div
        className={`transition-all ease-linear z-20 fixed top-[100px] bottom-0 max-w-sn w-[50%] right-0 bg-white text-black lg:hidden 
        ${
          active ? "right-0" : "-right-full"
        }`}
      >
        <ul className={` flex-col flex`}>
          {NAVBAR.map(({ title, link }, idx) => (
            <li
              key={idx}
              className="py-5 px-3 border-b-[1px] hover:bg-slate-100"
            >
              <Link href={link}>{title}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Navbar;
