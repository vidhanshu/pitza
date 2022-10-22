import React from "react";
import {
  PIZZA_LIST_DESCRIPTION,
  PIZZA_LIST_TITLE,
  PIZZA_LIST,
} from "../../constants";
import Section from "../section";
import { PizzaCard } from "./PizzaCard";
const PizzaList = () => {
  return (
    <Section title={PIZZA_LIST_TITLE} description={PIZZA_LIST_DESCRIPTION}>
      <div className="grid grid-cols-1 px-5  sm:grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-5 place-items-center">
        {PIZZA_LIST.map((e, idx) => (
          <PizzaCard key={idx} {...e} />
        ))}
      </div>
    </Section>
  );
};

export default PizzaList;
