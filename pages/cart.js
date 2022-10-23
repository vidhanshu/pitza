import {
  PayPalButtons,
  PayPalScriptProvider,
  usePayPalScriptReducer,
} from "@paypal/react-paypal-js";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

import Image from "next/image";
import PriceCard from "../components/priceCard";
import React from "react";
import { removeProduct } from "../redux/cartSlice";

function Cart() {
  const [payBtn, setPayBtn] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const { products, total } = cart;
  const getExtraString = (extra) => {
    if (extra.length === 0) {
      return "No Extra";
    } else {
      let str = extra.map((e) => e.text + ",");
      return str;
    }
  };

  const quotation = {
    subtotal: total,
    delivery: total > 500 ? 0 : 50,
    discount: total > 500 ? 30 : 0,
  };

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
                <th>Size</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Option</th>
              </tr>
              {products.map((item, index) => {
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
                    <td>{getExtraString(item.extra)}</td>
                    <td>{item.size}</td>
                    <td>₹{item.price}</td>
                    <td>{item.qty}</td>
                    <td>
                      <button
                        onClick={() => dispatch(removeProduct(index))}
                        className="btn-danger"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                );
              })}
            </thead>
          </table>
        </div>
        <PriceCard
          onClick={() => setPayBtn(true)}
          {...quotation}
          btnTitle="CHECKOUT NOW"
          payBtn={payBtn}
        >
          <div className="mt-5 flex justify-center items-center">
            <PayPalBtn amount={total} />
          </div>
        </PriceCard>
      </div>
    </div>
  );
}

export default Cart;

// This values are the props in the UI
const currency = "USD";

// Custom component to wrap the PayPalButtons and handle currency changes
const ButtonWrapper = ({ currency, showSpinner, amount }) => {
  // usePayPalScriptReducer can be use only inside children of PayPalScriptProviders
  // This is the main reason to wrap the PayPalButtons in a new component
  const [{ options, isPending }, dispatch] = usePayPalScriptReducer();

  useEffect(() => {
    dispatch({
      type: "resetOptions",
      value: {
        ...options,
        currency: currency,
      },
    });
  }, [currency, showSpinner]);

  return (
    <>
      {showSpinner && isPending && <div className="spinner" />}
      <PayPalButtons
        style={{ layout: "vertical" }}
        disabled={false}
        forceReRender={[amount, currency, { layout: "vertical" }]}
        fundingSource={undefined}
        createOrder={async (data, actions) => {
          return actions.order
            .create({
              purchase_units: [
                {
                  amount: {
                    currency_code: currency,
                    value: amount,
                  },
                },
              ],
            })
            .then((orderId) => {
              console.log("orderId", orderId);
              return orderId;
            });
        }}
        onApprove={async function (data, actions) {
          return actions.order.capture().then(function () {
            console.log("Transaction completed by " + data);
          });
        }}
      />
    </>
  );
};

function PayPalBtn({ amount }) {
  return (
    <div style={{ maxWidth: "750px", minHeight: "200px" }}>
      <PayPalScriptProvider
        options={{
          "client-id": `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`,
          components: "buttons",
          currency: "USD",
        }}
      >
        <ButtonWrapper
          amount={amount}
          currency={currency}
          showSpinner={false}
        />
      </PayPalScriptProvider>
    </div>
  );
}
