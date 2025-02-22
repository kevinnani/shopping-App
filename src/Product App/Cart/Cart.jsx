import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import "./Cart.css";

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    document.getElementById("cartTotal").innerText = `Total: ₹${total}`;
  }, [cart]);

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      {cart.length === 0 ? <p>Cart is empty</p> : null}
      <ul className="cart-list">
        {cart.map((item) => {
          const product = products.find((p) => p.id === item.id);
          return (
            <li key={item.id} className="cart-item">
              <img src={item.image} alt={item.name} className="cart-image" />
              <div className="cart-details">
                <h4>{item.name}</h4>
                <p>₹{item.price}</p>
                <p>Stock Left: {product ? product.stock : "N/A"}</p>
                <div className="quantity-control">
                  <button onClick={() => dispatch({ type: "DECREASE_QUANTITY", payload: item.id })}>-</button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => dispatch({ type: "INCREASE_QUANTITY", payload: item.id })}
                    disabled={product && product.stock <= 0}
                  >
                    +
                  </button>
                </div>
                <button className="remove-btn" onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item.id })}>
                  Remove
                </button>
              </div>
            </li>
          );
        })}
      </ul>
      <h3 id="cartTotal">Total: ₹0</h3>
    </div>
  );
};

export default Cart;
