import Image from "next/image";
import React from "react";
// import Section from "../components/Section";
import { CART } from "../constants";
import PriceCard from "../components/priceCard";
function Cart(props) {
  return (
    <div className="py-10 max-w-6xl m-auto block">
      <div className="flex px-2 min-h-96 flex-col gap-5 lg:flex-row">
        <div className="flex-2 px-5 overflow-auto">
          <table className="w-[100%] text-center">
            <thead>
              <tr>
                <th>Sr. </th>
                <th>Product</th>
                <th>Name</th>
                <th>Extras</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Option</th>
              </tr>
              {props.cart.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>
                      <Image
                        width={50}
                        height={50}
                        src={item.img}
                        alt="pizza"
                      />
                    </td>
                    <td>{item.title}</td>
                    <td>
                      {item.extra.map((extra, index) => {
                        return extra + ",";
                      })}
                    </td>
                    <td>₹{item.price}</td>
                    <td>{item.quantity}</td>
                    <td>
                      <button className="btn-danger">Remove</button>
                    </td>
                  </tr>
                );
              })}
            </thead>
          </table>
        </div>
        <PriceCard {...props.quotation} btnTitle="CHECKOUT NOW" />
      </div>
    </div>
  );
}

export default Cart;

export const getStaticProps = async () => {
  const subtotal = CART.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const delivery = 10;
  const discount = 5;

  return {
    props: {
      quotation: {
        subtotal,
        delivery,
        discount,
      },
      cart: CART,
    },
  };
};
