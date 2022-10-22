import React from "react";

const PriceCard = ({ subtotal, delivery, discount, btnTitle }) => {
  return (
    <div className="flex-1 flex justify-center items-center">
      <div className="w-full bg-black text-white lg:max-w-xs p-2 rounded-md  shadow-xl">
        <h1 className="font-black text-xl text-center mb-2">CART TOTAL</h1>
        <div className="overflow-auto">
          <table className="w-[100%]">
            <tbody>
              <tr className="px-4 py-2 text-center">
                <td className="px-4 py-2 text-center font-bold">Subtotal</td>
                <td className="px-4 py-2 text-center">+ ₹{subtotal}</td>
              </tr>
              <tr className="px-4 py-2 text-center">
                <td className="px-4 py-2 text-center font-bold">Delivery</td>
                <td className="px-4 py-2 text-center">+ ₹{delivery}</td>
              </tr>
              <tr className="px-4 py-2 text-center">
                <td className="px-4 py-2 text-center font-bold">Discount</td>
                <td className="px-4 py-2 text-center">- ₹{discount}</td>
              </tr>
              <tr className="px-4 py-2 text-center border-t-[2px]">
                <td className="px-4 py-2 text-center font-bold">Total</td>
                <td className="px-4 py-2 text-center">
                  ₹{delivery - discount + subtotal}
                </td>
              </tr>
            </tbody>
          </table>
          <button className="btn-primary mt-5">{btnTitle}</button>
        </div>
      </div>
    </div>
  );
};

export default PriceCard;
