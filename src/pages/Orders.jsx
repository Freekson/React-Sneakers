import React from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";

import { AppContext } from "../App";

import axios from "axios";

function Orders() {
  const [orders, setOrders] = React.useState([]);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const data = await axios.get("http://localhost:3001/orders");
        setOrders(data.data);
      } catch (err) {
        alert("Erroe while fetch orders");
        console.log(err);
      }
    }
    fetchData();
  }, []);

  const { onAddToFavotite } = React.useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between">
        <h1>My Orders</h1>
      </div>
      <div className="d-flex flex-column flex-wrap">
        {orders.length !== 0 ? (
          orders.map((item, index) => (
            <div key={index} className="p-40">
              <h3>Order #{item.id}</h3>
              <div className="d-flex mb-20">
                {item.items.map((order, index) => (
                  <Card
                    key={index}
                    onFavorite={(obj) => {
                      onAddToFavotite(obj);
                    }}
                    favorited={true}
                    {...order}
                  />
                ))}
              </div>
            </div>
          ))
        ) : (
          <div className="infoBlock">
            <img src="/img/not-found-order.png" alt="not found" />
            <strong>You have no orders</strong>
            <p>Place at least one order.</p>
            <Link to="/" className="greenBtn">
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
              <span>Go back</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;
