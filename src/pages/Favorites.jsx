import React from "react";
import Card from "../components/Card";
import { AppContext } from "../App";

function Favorites() {
  const { favoriteItems, onAddToFavotite, onAddToCart } =
    React.useContext(AppContext);

  return (
    <div className="content p-40">
      <div className="d-flex align-center justify-between mb-40">
        <h1>My favorites</h1>
      </div>
      <div className="d-flex flex-wrap">
        {favoriteItems.map((item, index) => (
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
