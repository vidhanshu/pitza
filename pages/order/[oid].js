import React from "react";
import PriceCard from "../../components/priceCard";
import { ORDERS, ORDER_STATUS } from "../../constants";
// import Section from "../../components/Section";
import Image from "next/image";
import styles from "./style.module.css";
const Index = (props) => {
  const { orderID, customer, address, total } = props.order;
  const status = 2;

  const getStatusClass = (index) => {
    if (index - status < 0) {
      return styles.done;
    } else if (index - status === 0) {
      return styles.progess;
    } else {
      return styles.undone;
    }
  };

  return (
    <div className="py-10 max-w-6xl m-auto block">
      <div className="flex  justify-center p-2 lg:flex-row flex-col">
        <div className="flex-1 flex flex-col gap-10 p-5 overflow-auto">
          <table>
            <thead>
              <tr>
                <th className="text-left">ID</th>
                <th className="text-left">Customer</th>
                <th className="text-left">Address</th>
                <th className="text-left">Total</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{orderID}</td>
                <td>{customer}</td>
                <td>{address}</td>
                <td>{total}</td>
              </tr>
            </tbody>
          </table>
          <div className="flex justify-self-center justify-between max-w-sm">
            {ORDER_STATUS.map(({ img, title }, index) => (
              <div
                key={index}
                className={`flex gap-1 justify-between items-center flex-col ${getStatusClass(
                  index
                )}`}
              >
                <div
                  className={`flex gap-1 justify-between items-center flex-col`}
                >
                  <Image src={img} width={30} height={30} alt="" />
                  {title}
                </div>
                {index - status < 0 && (
                  <Image src="/img/checked.png" width={30} height={30} alt="" />
                )}
              </div>
            ))}
          </div>
        </div>
        <PriceCard {...props.quotation} btnTitle="PAY NOW" />
      </div>
    </div>
  );
};

export default Index;

export const getStaticProps = async () => {
  const subtotal = ORDERS.reduce((acc, item) => acc + item.total, 0);
  const delivery = 10;
  const discount = 5;

  return {
    props: {
      quotation: {
        subtotal,
        delivery,
        discount,
      },
      order: ORDERS[0],
    },
  };
};

export async function getStaticPaths() {
  return {
    paths: [
      {
        params: { oid: "1" },
      },
    ],
    fallback: false,
  };
}
