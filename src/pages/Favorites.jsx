import React from "react";
import Card from "../components/Card";

function Favorites({ items, onAddToFavotite, onAddToCart }) {
  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>My favorites</h1>
      </div>
      <div className="d-flex flex-wrap">
        {items.map((item, index) => (
          <Card
            key={index}
            onFavorite={(obj) => {
              onAddToFavotite(obj);
            }}
            onPlus={(obj) => {
              onAddToCart(obj);
            }}
            favorited={true}
            {...item}
          />
        ))}
      </div>
    </div>
  );
}

export default Favorites;
