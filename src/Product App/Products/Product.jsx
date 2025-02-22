import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import productsData from "./products.json";
import "./ProductList.css";

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products);

  useEffect(() => {
    dispatch({ type: "SET_PRODUCTS", payload: productsData });
  }, [dispatch]);

  const addToCart = (product) => {
    if (product.stock > 0) {
      dispatch({ type: "ADD_TO_CART", payload: { ...product, quantity: 1 } });
    }
  };

  return (
    <div>
      <h2>Different types of shampoo</h2>
      <ul className="product_list">
        {products.map((product) => (
          <li key={product.id} className="product_item">
            <div className="img_cntainer">
              <img src={product.image} alt={product.name} className="product_img" width="100" />
            </div>
            <h3 className="product_name">{product.name}</h3>
            <p className="description">{product.description}</p>
            <p className="Price">Price: ₹{product.price}</p>
            <p className={`description `}>Stock: <b style={{color:'red'}}>{product.stock > 0 ? product.stock : "Out of Stock"}</b> </p>
            <button
              className={`addTOCart_Button ${product.stock > 0 ? product.stock : "OutofStock"}`}
              onClick={() => addToCart(product)}
              disabled={product.stock === 0}
            >
              {product.stock > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductList;
