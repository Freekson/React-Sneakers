import React from "react";
import ContentLoader from "react-content-loader";
import { AppContext } from "../../App";

import styles from "./Card.module.scss";

function Card({
  id,
  imageUrl,
  name,
  price,
  onPlus,
  onFavorite,
  loading = false,
}) {
  const { isItemAdded, isItemLiked } = React.useContext(AppContext);

  const onClickPlus = () => {
    onPlus({ id, name, imageUrl, price });
  };

  const onClickFavorite = () => {
    onFavorite({ id, name, imageUrl, price });
  };

  return (
    <div className={styles.card}>
      {loading ? (
        <ContentLoader
          speed={2}
          width={200}
          height={265}
          viewBox="0 0 200 265"
          backgroundColor="#f3f3f3"
          foregroundColor="#ecebeb"
        >
          <rect x="1" y="0" rx="10" ry="10" width="200" height="155" />
          <rect x="0" y="190" rx="5" ry="5" width="150" height="15" />
          <rect x="169" y="220" rx="10" ry="10" width="32" height="32" />
          <rect x="0" y="170" rx="5" ry="5" width="200" height="15" />
          <rect x="0" y="220" rx="10" ry="10" width="80" height="32" />
        </ContentLoader>
      ) : (
        <>
          <div className={styles.favorite}>
            <img
              src={
                isItemLiked(id)
                  ? "/img/heart-liked.svg"
                  : "/img/heart-unliked.svg"
              }
              alt="heart unliked"
              onClick={onClickFavorite}
            />
          </div>
          <img className={styles.sneaker_img} src={imageUrl} alt="sneaker" />
          <h5>{name}</h5>
          <div className={styles.bottom_block}>
            <div className="d-flex flex-column">
              <span>Price:</span>
              <strong>{price} $</strong>
            </div>
            <img
              src={
                isItemAdded(id) ? "/img/btn-checked.svg" : "/img/btn-plus.svg"
              }
              alt="btn plus"
              onClick={onClickPlus}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default Card;
