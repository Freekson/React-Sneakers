import styles from "./Card.module.scss";

function Card(props) {
  return (
    <div className={styles.card}>
      <div className={styles.favorite}>
        <img src="/img/heart-unliked.svg" alt="heart unliked" />
      </div>
      <img className={styles.sneaker_img} src={props.imageUrl} alt="sneaker" />
      <h5>{props.title}</h5>
      <div className={styles.bottom_block}>
        <div className="d-flex flex-column">
          <span>Price:</span>
          <strong>{props.price} $</strong>
        </div>
        <img src="/img/btn-plus.svg" alt="btn plus" onClick={props.onClick} />
      </div>
    </div>
  );
}

export default Card;
