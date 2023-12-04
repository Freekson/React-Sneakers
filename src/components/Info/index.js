import React from "react";
import { AppContext } from "../../App";
import styles from "./Info.module.scss";

const Info = ({ title, description, imageUrl }) => {
  const { setCartOpen } = React.useContext(AppContext);

  return (
    <div className={styles.empty_cart}>
      {imageUrl && (
        <div className={styles.cart_image}>
          <img src={`/img/${imageUrl}`} alt="cart img" />
        </div>
      )}
      <strong>{title}</strong>
      <p>{description}</p>
      <button className={styles.greenBtn} onClick={() => setCartOpen(false)}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="14"
          viewBox="0 0 16 14"
          fill="none"
        >
          <path
            d="M1 7H14.7143"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.71436 1L14.7144 7L8.71436 13"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        Go back
      </button>
    </div>
  );
};

export default Info;
