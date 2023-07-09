import React from "react";
import styles from "./Card.module.scss";

function Card({
  id,
  imageUrl,
  title,
  price,
  onPlus,
  onFavorite,
  favorited = false,
}) {
  const [isAdded, setIsAdded] = React.useState(false);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({ id, title, imageUrl, price });
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({ id, title, imageUrl, price });
    setIsFavorite(!isFavorite);
  };

  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img
          src={isFavorite ? "/img/heart-liked.svg" : "/img/heart-unliked.svg"}
          alt="heart unliked"
          onClick={onClickFavorite}
        />
      </div>
      <img className={styles.sneaker_img} src={imageUrl} alt="sneaker" />
      <h5>{title}</h5>
      <div className={styles.bottom_block}>
        <div className="d-flex flex-column">
          <span>Price:</span>
          <strong>{price} $</strong>
        </div>
        <img
          src={isAdded ? "/img/btn-checked.svg" : "/img/btn-plus.svg"}
          alt="btn plus"
          onClick={onClickPlus}
        />
      </div>
    </div>
  );
}

export default Card;
