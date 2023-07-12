import React from "react";
import { AppContext } from "../../App";
import styles from "./Drawer.module.scss";
import Info from "../Info";

function Drawer({ onClose, onRemove }) {
  const { cartItems, setCartItems } = React.useContext(AppContext);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);

  const onClickOrder = () => {
    setIsOrderComplete(true);
    setCartItems([]);
  };

  return (
    <div className={styles.overlay}>
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
                  <strong>2000 $</strong>
                </li>
                <li>
                  <span>Tax 5%</span>
                  <div></div>
                  <strong>100 $</strong>
                </li>
              </ul>
              <button className={styles.greenBtn} onClick={onClickOrder}>
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
                ? "Your order #18 will be delivered to courier soon"
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
