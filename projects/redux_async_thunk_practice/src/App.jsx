import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import "./index.css";
import Navbar from "./components/Navbar";
import CartContainer from "./components/CartContainer";
import Modal from "./components/Modal";
import { calculateTotals, getCartItems } from "./features/cart/cartSlice";

function App() {
  const dispatch = useDispatch();
  const { cartItems, isLoading } = useSelector((state) => state.cart);
  const { isOpen } = useSelector((state) => state.modal);

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems]);

  useEffect(() => {
    const t = setTimeout(() => {
      dispatch(getCartItems());
    }, 0);

    return () => {
      clearTimeout(t);
    };
  }, []);

  if (isLoading) {
    return (
      <div className="loading">
        <h1>loading...</h1>
      </div>
    );
  }

  return (
    <main className="App">
      {isOpen ? <Modal /> : null}
      <Navbar />
      <CartContainer />
    </main>
  );
}

export default App;
