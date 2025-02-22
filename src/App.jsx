import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ProductList from './Product App/Products/Product'
import Cart from './Product App/Cart/Cart'
import { Nav } from './Product App/Nav/Nav'

function App() {
  const [cartOpen, setCartOpen] = useState(false);
  return (

    <>
 <div className="app-container">
 
    {/* mobile menu */}
      <button className="cart-toggle-btn" onClick={() => setCartOpen(!cartOpen)}>
        {cartOpen ? "✖" : "☰"}
      </button>

      {/* Product List Section */}
      <div className="product-list">
        <ProductList />
      </div>

      {/* Cart Section */}
      <div className={`cart-section ${cartOpen ? "open" : ""}`}>
        <Cart />
      </div>
    </div>
    </>
   
  )
}

export default App
