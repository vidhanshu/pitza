import styles from "./style.module.css";
import Image from "next/image";
import { useEffect, useState } from "react";

const Featured = () => {
  const [index, setIndex] = useState(0);
  const CAROUSEL_IMAGES = [
    "/img/featured.png",
    "/img/featured2.png",
    "/img/featured1.png",
  ];

  const handleArrow = (direction) => {
    if (direction === "l") {
      setIndex(index !== 0 ? index - 1 : 2);
    }
    if (direction === "r") {
      setIndex(index !== CAROUSEL_IMAGES.length - 1 ? index + 1 : 0);
    }
  };

  return (
    <div className={styles.container}>
      <div
        className={`${styles.arrowContainer} link`}
        style={{ left: 10 }}
        onClick={() => handleArrow("l")}
      >
        <Image src="/img/arrowl.png" alt="" layout="fill" objectFit="contain" />
      </div>
      <div
        className={styles.wrapper}
        style={{ transform: `translateX(${-100 * index}vw)` }}
      >
        {CAROUSEL_IMAGES.map((img, i) => (
          <div className={styles.imgContainer} key={i}>
            <Image src={img} alt="" layout="fill" objectFit="contain" />
          </div>
        ))}
      </div>
      <div
        className={`${styles.arrowContainer} link`}
        style={{ right: 10 }}
        onClick={() => handleArrow("r")}
      >
        <Image src="/img/arrowr.png" layout="fill" alt="" objectFit="contain" />
      </div>
    </div>
  );
};

export default Featured;
