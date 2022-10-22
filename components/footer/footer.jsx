import Image from "next/image";
import React from "react";
import { FOOTER_IMG, FOOTER_TAG_LINE } from "../../constants";
import { FOOTER } from "../../constants";

const footer = () => {
  return (
    <div className="flex bg-black text-white xl:h-[500px]">
      <div className={`hidden xl:block min-w-[400px] relative`}>
        <Image src={FOOTER_IMG} layout="fill" alt=""/>
      </div>
      <div className={`flex-1 flex p-10 gap-5 flex-col md:flex-row`}>
        <div className={`flex-1`}>
          <h1 className="font-black text-3xl">{FOOTER_TAG_LINE}</h1>
        </div>
        {FOOTER.map(({ title, data }, idx) => (
          <div key={idx} className={`flex-1`}>
            <h1 className="font-bold text-2xl text-yellow-500 mb-3">{title}</h1>
            <ul className="flex flex-col gap-10">
              {data.map((e, idx1) => (
                <li className="text-text-gray-1 max-w-xs" key={idx1}>{e}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default footer;
