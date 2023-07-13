import React from "react";
import Card from "../components/Card";
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
      <div className="d-flex align-center justify-between mb-40">
        <h1>My Orders</h1>
      </div>
      <div className="d-flex flex-column flex-wrap">
        {orders.map((item, index) => (
          <div key={index} className="p-50">
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
        ))}
      </div>
    </div>
  );
}

export default Orders;
