function Drawer() {
  return (
    <div className="overlay" style={{ display: "none" }}>
      <div className="drawer">
        <h2 className="d-flex justify-between">
          Cart
          <img
            className="remove-btn mr-20 cu-p"
            src="img/btn-remove.svg"
            alt="btn remove"
          />
        </h2>
        <div className="items">
          <div className="cart-item d-flex align-center mb-20">
            <img
              className="mr-20 ml-20"
              width="25%"
              src="/img/sneakers/sneaker-1.png"
              alt="sneaker"
            />
            <div className="mr-20">
              <p className="mb-5">Nike Blazer Mid Suede Men's Sneakers</p>
              <strong>1000 $</strong>
            </div>
            <img
              className="remove-btn mr-20"
              src="img/btn-remove.svg"
              alt="btn remove"
            />
          </div>
          <div className="cart-item d-flex align-center mb-20">
            <img
              className="mr-20 ml-20"
              width="25%"
              src="/img/sneakers/sneaker-2.png"
              alt="sneaker"
            />
            <div className="mr-20">
              <p className="mb-5">Nike Air Max 270 Men's Running Shoes</p>
              <strong>1000 $</strong>
            </div>
            <img
              className="remove-btn mr-20"
              src="img/btn-remove.svg"
              alt="btn remove"
            />
          </div>
        </div>
        <div className="total-block">
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
          <button className="greenBtn">
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
    </div>
  );
}

export default Drawer;
