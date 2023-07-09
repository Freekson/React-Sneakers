import React from "react";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

function App() {
  const [cartOpen, setCartOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");

  React.useEffect(() => {
    axios.get("http://localhost:3001/items").then((res) => setItems(res.data));
    axios
      .get("http://localhost:3001/cart")
      .then((res) => setCartItems(res.data));
    axios
      .get("http://localhost:3001/favorite")
      .then((res) => setFavoriteItems(res.data));
  }, []);

  const onAddToCart = (obj) => {
    axios
      .post("http://localhost:3001/cart", obj)
      .then((res) => setCartItems((prev) => [...prev, res.data]));
  };

  const onAddToFavotite = async (obj) => {
    try {
      if (favoriteItems.find((favObj) => favObj.id === obj.id)) {
        axios.delete(`http://localhost:3001/favorite/${obj.id}`);
      } else {
        const { data } = await axios.post(
          "http://localhost:3001/favorite",
          obj
        );
        setFavoriteItems((prev) => [...prev, data]);
      }
    } catch (err) {
      alert("Failed to add to favorites");
      console.log(err);
    }
  };

  const onChangeInput = (event) => {
    setSearchValue(event.target.value);
  };

  const onDeleteInput = () => {
    setSearchValue("");
  };

  const onRemoveItem = (id) => {
    axios.delete(`http://localhost:3001/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="wrapper clear">
      {cartOpen && (
        <Drawer
          onClose={() => setCartOpen(false)}
          items={cartItems}
          onRemove={onRemoveItem}
        />
      )}
      <Header onClickCart={() => setCartOpen(true)} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              items={items}
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeInput={onChangeInput}
              onAddToFavotite={onAddToFavotite}
              onAddToCart={onAddToCart}
              onDeleteInput={onDeleteInput}
            />
          }
          exact
        />
        <Route
          path="/favorites"
          element={
            <Favorites
              items={favoriteItems}
              onAddToFavotite={onAddToFavotite}
              onAddToCart={onAddToCart}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
