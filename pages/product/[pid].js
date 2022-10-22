import Image from "next/image";
import React, { useEffect, useState } from "react";
import Toppins from "../../components/toppins";
const Index = ({ product }) => {
  const { img, title, price: p, desciption } = product;
  const [size, setSize] = useState(1);
  const [price, setPrice] = useState(p);
  const [qty, setQty] = useState(1);
  const [extra, setExtra] = useState({
    sauce: false,
    chees: false,
    mushroom: false,
    pepperoni: false,
  });

  const getExtraPrice = () => {
    let extraPrice = 0;
    for (const key in extra) {
      if (extra[key]) {
        extraPrice += 10;
      }
    }
    return extraPrice;
  };

  const getSize = () => {
    switch (size) {
      case 1:
        return 300;
      case 2:
        return 350;
      case 3:
        return 400;
    }
  };

  const getPrice = () => {
    let calc = 0;
    switch (size) {
      case 1:
        calc = (parseInt(p) + getExtraPrice()) * qty;
        break;
      case 2:
        calc = (parseInt(p) + 50 + getExtraPrice()) * qty;
        break;
      case 3:
        calc = (parseInt(p) + 100 + getExtraPrice()) * qty;
        break;
    }
    setPrice(calc);
  };

  useEffect(() => {
    getPrice();
  }, [size, qty, extra]);

  return (
    <div className="flex-col md:flex-row flex">
      <div className="flex-1 p-10 center">
        <div className="relative">
          <Image alt="" src={img} width={getSize()} height={getSize()} />
          <Toppins extra={extra} getSize={getSize} />
        </div>
      </div>
      <div className="flex-1 p-10">
        <div className="flex flex-col gap-3">
          <h1 className="text-3xl font-bold">{title}</h1>
          <h1 className="text-primary font-semibold">{price}/- INR</h1>
          <p className="text-text-gray max-w-md">{desciption}</p>
        </div>
        <PizzaSize setSize={setSize} />
        <PizzaToppinsOption setExtra={setExtra} />
        <Quantity qty={qty} setQty={setQty} />
      </div>
    </div>
  );
};

const PizzaSize = ({ setSize }) => (
  <div className="mt-4">
    <h1 className="gray-title">Chose Your Hunger</h1>
    <div className="horizontal-items">
      <div
        className="relative cursor-pointer"
        onClick={() => {
          setSize(1);
        }}
      >
        <span className="label">small</span>
        <Image src="/img/size.png" width={30} height={30} alt="" />
      </div>
      <div
        className="relative cursor-pointer"
        onClick={() => {
          setSize(2);
        }}
      >
        <span className="label">medium</span>
        <Image src="/img/size.png" width={40} height={40} alt="" />
      </div>
      <div
        className="relative cursor-pointer"
        onClick={() => {
          setSize(3);
        }}
      >
        <span className="label">large</span>
        <Image src="/img/size.png" width={50} height={50} alt="" />
      </div>
    </div>
  </div>
);

const Quantity = ({ setQty, qty }) => (
  <div>
    <label>
      <input
        className=" w-16 select-none pl-2 text-black transition-all outline-2 outline-gray-500 focus:border-none outline-none focus:outline-3 focus:outline-blue-600 rounded-md"
        placeholder="Qty"
        type="number"
        name=""
        onChange={(e) => {
          setQty(e.target.value);
        }}
        min="1"
        max="10"
        value={qty}
      />
      &nbsp; Quantity
    </label>
  </div>
);
const PizzaToppinsOption = ({ setExtra }) => (
  <div>
    <h1 className="gray-title">Choose Additional Ingredients</h1>
    <div className="horizontal-items max-w-md select-none">
      <label className="flex justify-center items-center cursor-pointer">
        <input
          onChange={() => setExtra((e) => ({ ...e, sauce: !e.sauce }))}
          className="w-5 h-5"
          type="checkbox"
        />
        &nbsp; Sauce
      </label>
      <label className="flex justify-center items-center cursor-pointer">
        <input
          onChange={() => setExtra((e) => ({ ...e, pepperoni: !e.pepperoni }))}
          className="w-5 h-5"
          type="checkbox"
        />
        &nbsp; Pepperoni
      </label>
      <label className="flex justify-center items-center cursor-pointer">
        <input
          onChange={() => setExtra((e) => ({ ...e, mushroom: !e.mushroom }))}
          className="w-5 h-5"
          type="checkbox"
        />
        &nbsp; Mushroom
      </label>
      <label className="flex justify-center items-center cursor-pointer">
        <input
          onChange={() => setExtra((e) => ({ ...e, chees: !e.chees }))}
          className="w-5 h-5"
          type="checkbox"
        />
        &nbsp; Chees
      </label>
    </div>
  </div>
);

export default Index;

export async function getStaticProps(context) {
  console.log(context.params);
  return {
    props: {
      product: {
        img: "/img/pizza.png",
        title: "CAMPLOGANIA",
        desciption:
          "Lorem ipsum desciption desciption desciption desciption desciption Lorem ipsum desciption desciption desciption desciption desciption",
        price: "399",
      },
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { pid: "1" },
      },
    ],
    fallback: false,
  };
}
