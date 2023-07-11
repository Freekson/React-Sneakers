import React from "react";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";

export const AppContext = React.createContext({});

function App() {
  const [cartOpen, setCartOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    async function fetchData() {
      const cartResponse = await axios.get("http://localhost:3001/cart");
      const favoriteResponse = await axios.get(
        "http://localhost:3001/favorite"
      );
      const itemsResponse = await axios.get("http://localhost:3001/items");

      setIsLoading(false);

      setCartItems(cartResponse.data);
      setFavoriteItems(favoriteResponse.data);
      setItems(itemsResponse.data);
    }

    fetchData();
  }, []);

  const onAddToCart = (obj) => {
    try {
      if (cartItems.find((item) => Number(item.id) === Number(obj.id))) {
        setCartItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
        axios.delete(`http://localhost:3001/cart/${obj.id}`);
      } else {
        axios
          .post("http://localhost:3001/cart", obj)
          .then((res) => setCartItems((prev) => [...prev, res.data]));
      }
    } catch (err) {
      console.log(err);
      alert("Failed to add to cart");
    }
  };

  const onAddToFavotite = async (obj) => {
    try {
      if (
        favoriteItems.find((favObj) => Number(favObj.id) === Number(obj.id))
      ) {
        setFavoriteItems((prev) =>
          prev.filter((item) => Number(item.id) !== Number(obj.id))
        );
        axios.delete(`http://localhost:3001/favorite/${obj.id}`);
      } else {
        axios
          .post("http://localhost:3001/favorite", obj)
          .then((res) => setFavoriteItems((prev) => [...prev, res.data]));
      }
    } catch (err) {
      alert("Failed to add to favorites");
      console.log(err);
    }
  };

  const onRemoveItem = (id) => {
    axios.delete(`http://localhost:3001/cart/${id}`);
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.id) === Number(id));
  };

  const isItemLiked = (id) => {
    return favoriteItems.some((obj) => Number(obj.id) === Number(id));
  };

  return (
    <AppContext.Provider
      value={{
        items,
        cartItems,
        favoriteItems,
        isItemAdded,
        isItemLiked,
        onAddToFavotite,
        onAddToCart,
      }}
    >
      <div className="wrapper clear">
        {cartOpen && (
          <Drawer onClose={() => setCartOpen(false)} onRemove={onRemoveItem} />
        )}
        <Header onClickCart={() => setCartOpen(true)} />
        <Routes>
          <Route path="/" element={<Home isLoading={isLoading} />} exact />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
