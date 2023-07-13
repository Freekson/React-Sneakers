import React from "react";
import axios from "axios";

import { AppContext } from "../../App";

import Info from "../Info";

import styles from "./Drawer.module.scss";

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, opened }) {
  const { cartItems, setCartItems, totalPrice } = React.useContext(AppContext);

  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [orderId, setOrderId] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);

  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post("http://localhost:3001/orders", {
        items: cartItems,
      });

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete("http://localhost:3001/cart/" + item.id);
        await delay(100);
      }

      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);
    } catch (err) {
      alert("Error while creating order");
      console.log(err);
    }
    setIsLoading(false);
  };

  return (
    <div className={opened ? styles.overlay : styles.overlayHiden}>
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between">
          Cart
          <img
            className={styles.remove_btn}
            src="img/btn-remove.svg"
            alt="btn remove"
            onClick={onClose}
          />
        </h2>
        {cartItems.length > 0 ? (
          <div className={styles.cart}>
            <div className={styles.cartItems}>
              {cartItems.map((item, index) => (
                <div className={styles.cart_item} key={index}>
                  <img
                    className="mr-20 ml-20"
                    width="25%"
                    src={item.imageUrl}
                    alt="sneaker"
                  />
                  <div className="mr-20">
                    <p className="mb-5">{item.name}</p>
                    <strong>{item.price} $</strong>
                  </div>
                  <img
                    className={styles.remove_btn}
                    src="img/btn-remove.svg"
                    alt="btn remove"
                    onClick={() => {
                      onRemove(item.id);
                    }}
                  />
                </div>
              ))}
            </div>
            <div className={styles.total_block}>
              <ul className="mb-40">
                <li>
                  <span>Total</span>
                  <div></div>
                  <strong>{totalPrice} $</strong>
                </li>
                <li>
                  <span>Tax 5%</span>
                  <div></div>
                  <strong>{Math.round(totalPrice * 0.05)} $</strong>
                </li>
              </ul>
              <button
                disabled={isLoading}
                className={styles.greenBtn}
                onClick={onClickOrder}
              >
                Ordering
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
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                  <path
                    d="M8.71436 1L14.7144 7L8.71436 13"
                    stroke="white"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Order is processed!" : "Cart empty"}
            description={
              isOrderComplete
                ? `Your order #${orderId} will be delivered to courier soon`
                : "Add at least one pair of sneakers to place an order."
            }
            imageUrl={
              isOrderComplete ? "successful-order.png" : "empty-cart.png"
            }
          />
        )}
      </div>
    </div>
  );
}

export default Drawer;
