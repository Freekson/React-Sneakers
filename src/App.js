import React from "react";
import axios from "axios";
import Header from "./components/Header";
import Drawer from "./components/Drawer";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Favorites from "./pages/Favorites";
import Orders from "./pages/Orders";

export const AppContext = React.createContext({});

function App() {
  const [cartOpen, setCartOpen] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [favoriteItems, setFavoriteItems] = React.useState([]);
  const [cartItems, setCartItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

  React.useEffect(() => {
    async function fetchData() {
      try {
        const [cartResponse, favoriteResponse, itemsResponse] =
          await Promise.all([
            axios.get("http://localhost:3001/cart"),
            axios.get("http://localhost:3001/favorite"),
            axios.get("http://localhost:3001/items"),
          ]);

        setIsLoading(false);
        setCartItems(cartResponse.data);
        setFavoriteItems(favoriteResponse.data);
        setItems(itemsResponse.data);
      } catch (err) {
        alert("Error while data loading");
        console.log(err);
      }
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
    try {
      axios.delete(`http://localhost:3001/cart/${id}`);
      setCartItems((prev) => prev.filter((item) => item.id !== id));
    } catch (err) {
      alert("Failed while removing cart item");
      console.log(err);
    }
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
        totalPrice,
        isItemAdded,
        isItemLiked,
        onAddToFavotite,
        onAddToCart,
        setCartItems,
        setCartOpen,
      }}
    >
      <div className="wrapper clear">
        <Drawer
          onClose={() => setCartOpen(false)}
          onRemove={onRemoveItem}
          opened={cartOpen}
        />
        <Header onClickCart={() => setCartOpen(true)} />
        <Routes>
          <Route path="/" element={<Home isLoading={isLoading} />} exact />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/orders" element={<Orders />} />
        </Routes>
      </div>
    </AppContext.Provider>
  );
}

export default App;
