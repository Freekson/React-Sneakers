import React from "react";
import Card from "../components/Card";
import { Link } from "react-router-dom";

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
        {favoriteItems.length !== 0 ? (
          favoriteItems.map((item, index) => (
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
          ))
        ) : (
          <div className="infoBlock">
            <img src="/img/not-found-favorite.png" alt="not found" />
            <strong>No favorites :(</strong>
            <p>You haven't bookmarked anything.</p>
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

export default Favorites;
