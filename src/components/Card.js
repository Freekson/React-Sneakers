function Cart() {
  return (
    <div className="card">
      <div className="favorite">
        <img src="/img/heart-unliked.svg" alt="heart unliked" />
      </div>
      <img
        className="sneaker-img"
        src="/img/sneakers/sneaker-1.png"
        alt="sneaker"
      />
      <h5>Nike Blazer Mid Suede Men's Sneakers</h5>
      <div className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Price:</span>
          <strong>1000 $</strong>
        </div>
        <img src="/img/btn-plus.svg" alt="btn plus" />
      </div>
    </div>
  );
}

export default Cart;
