
import { useState, useEffect } from 'react'
import './App.css'

// Header Component
function Header() {
  return (
    <header className="header">
      <h1>Amazon Product Store</h1>
    </header>
  )
}

// ProductCard Component
function ProductCard({
  productName,
  price,
  quantity,
  selectedColor,
  deliveryCity
}) {
  // Select the correct image for the chosen colour
  const mouseImages = {
    Black: '/mouse-black.png',
    Blue: '/mouse-blue.png',
    White: '/mouse-white.png'
  }

  // Update browser tab title when product details change
  useEffect(() => {
    const previousTitle = document.title

    document.title =
      `${productName} | ${selectedColor} | Cart: ${quantity}`

    return () => {
      document.title = previousTitle
    }
  }, [productName, selectedColor, quantity])

  const totalAmount = quantity * price

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={mouseImages[selectedColor]}
          alt={`${selectedColor} Wireless Mouse`}
        />
      </div>

      <div className="product-details">
        <h2>{productName}</h2>

        <p className="price">
          ₹{price} <small>per item</small>
        </p>

        <p>Colour: {selectedColor}</p>
        <p>Deliver to: {deliveryCity}</p>

        <hr />

        <p>Cart Quantity: {quantity}</p>

        <p className="total">
          Total Amount: ₹{totalAmount}
        </p>

        <p className="status">
          {quantity === 0
            ? 'Cart is empty'
            : 'Product added to cart'}
        </p>
      </div>
    </div>
  )
}

// Footer Component
function Footer() {
  return (
    <footer>
      © 2026 Amazon Product Store
    </footer>
  )
}

// Main App Component
function App() {
  const [quantity, setQuantity] = useState(0)
  const [selectedColor, setSelectedColor] = useState('Black')
  const [deliveryCity, setDeliveryCity] = useState('Coimbatore')
  const [showProduct, setShowProduct] = useState(true)

  const productName = 'Wireless Mouse'
  const price = 499

  return (
    <div className="app">
      <Header />

      <main>
        {showProduct && (
          <ProductCard
            productName={productName}
            price={price}
            quantity={quantity}
            selectedColor={selectedColor}
            deliveryCity={deliveryCity}
          />
        )}

        <div className="controls">
          <div className="control-group">
            <label htmlFor="color">Product colour</label>

            <select
              id="color"
              value={selectedColor}
              onChange={(event) =>
                setSelectedColor(event.target.value)
              }
            >
              <option value="Black">Black</option>
              <option value="Blue">Blue</option>
              <option value="White">White</option>
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="city">Delivery city</label>

            <input
              id="city"
              type="text"
              value={deliveryCity}
              onChange={(event) =>
                setDeliveryCity(event.target.value)
              }
            />
          </div>
        </div>

        <div className="buttons">
          <button
            className="add-button"
            onClick={() => setQuantity(q => q + 1)}
          >
            Add to Cart
          </button>

          <button
            onClick={() =>
              setQuantity(q => Math.max(0, q - 1))
            }
            disabled={quantity === 0}
          >
            Remove One
          </button>

          <button onClick={() => setQuantity(0)}>
            Reset Cart
          </button>

          <button onClick={() => setShowProduct(v => !v)}>
            {showProduct ? 'Hide Product' : 'Show Product'}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default App
