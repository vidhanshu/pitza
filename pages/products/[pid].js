import React, { useEffect, useState } from "react";

import Image from "next/image";
import Toppins from "../../components/toppins";
import { addProduct } from "../../redux/cartSlice";
import axios from "../../helpers/axios";
import { useDispatch } from "react-redux";

const Index = ({ product }) => {
  const { img, title, prices: p, desciption, toppins } = product;
  const [size, setSize] = useState(1);
  const [price, setPrice] = useState(p[0]);
  const [qty, setQty] = useState(1);

  const [extra, setExtra] = useState([]);

  const dispatch = useDispatch();

  const getExtraPrice = () => {
    let extraPrice = 0;
    extra.forEach((item) => {
      extraPrice += item.price;
    });
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

  const handleClick = () => {
    dispatch(addProduct({ ...product, price, qty, size, extra }));
    console.log("clicked");
  };

  const handleToppins = ({ event, data }) => {
    if (event.target.checked) {
      setExtra((e) => [
        ...e,
        {
          text: data.text,
          price: data.price,
        },
      ]);
    } else {
      setExtra((e) => e.filter((e) => e.text !== data.text));
    }
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
          <h1 className="text-primary font-semibold">₹{price}/- INR</h1>
          <p className="text-text-gray max-w-md">{desciption}</p>
        </div>
        <PizzaSize setSize={setSize} />
        <PizzaToppinsOption
          handleToppins={handleToppins}
          toppins={toppins}
          setExtra={setExtra}
        />
        <Quantity handleClick={handleClick} qty={qty} setQty={setQty} />
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

const Quantity = ({ setQty, qty, handleClick }) => (
  <div className="gap-5 flex items-center">
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
    <button className="m-0 btn-primary" onClick={handleClick}>
      ADD TO CART
    </button>
  </div>
);

const PizzaToppinsOption = ({ toppins, setExtra, handleToppins }) => (
  <div>
    <h1 className="gray-title">Choose Additional Ingredients</h1>
    <div className="horizontal-items max-w-md select-none">
      {toppins.map(({ _id, text, price }) => (
        <label
          key={_id}
          className="flex justify-center items-center cursor-pointer"
        >
          <input
            className="w-5 h-5"
            type="checkbox"
            onChange={(e) => handleToppins({ event: e, data: { text, price } })}
          />
          &nbsp; {text}
        </label>
      ))}
    </div>
  </div>
);

export default Index;

export async function getServerSideProps(context) {
  const { pid } = context.params;
  console.log("called");
  const res = await axios.get(`/products/${pid}`);
  return {
    props: {
      product: res.data,
    },
  };
}
