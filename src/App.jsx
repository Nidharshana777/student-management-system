import { useState, useEffect } from 'react'
import './App.css'

// Header Component
function Header() {
  return (
    <header>
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
  useEffect(() => {
    // Save the previous browser tab title
    const previousTitle = document.title

    // Update the tab title
    document.title = `${productName} | ${selectedColor} | Cart: ${quantity}`

    // Restore the previous title when the effect cleans up
    return () => {
      document.title = previousTitle
    }
  }, [productName, selectedColor, quantity])

  const totalAmount = quantity * price

  return (
    <div className="product-card">
      <h2>Product Details</h2>

      <p><strong>Product:</strong> {productName}</p>
      <p><strong>Price:</strong> ₹{price}</p>
      <p><strong>Colour:</strong> {selectedColor}</p>
      <p><strong>Deliver to:</strong> {deliveryCity}</p>
      <p><strong>Cart Quantity:</strong> {quantity}</p>
      <p><strong>Total Amount:</strong> ₹{totalAmount}</p>
      <p>
        <strong>Status:</strong>{' '}
        {quantity === 0
          ? 'Cart is empty'
          : 'Product added to cart'}
      </p>
    </div>
  )
}

// Footer Component
function Footer() {
  return (
    <footer>
      <p>© 2026 Amazon Product Store</p>
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
        <div className="controls">
          <label htmlFor="color">Select Colour: </label>
          <select
            id="color"
            value={selectedColor}
            onChange={(event) => setSelectedColor(event.target.value)}
          >
            <option value="Black">Black</option>
            <option value="Blue">Blue</option>
            <option value="White">White</option>
          </select>

          <br />

          <label htmlFor="city">Delivery City: </label>
          <input
            id="city"
            type="text"
            value={deliveryCity}
            onChange={(event) => setDeliveryCity(event.target.value)}
          />
        </div>

        <div className="buttons">
          <button onClick={() => setQuantity(quantity + 1)}>
            Add to Cart
          </button>

          <button
            onClick={() => setQuantity(quantity - 1)}
            disabled={quantity === 0}
          >
            Remove One
          </button>

          <button onClick={() => setQuantity(0)}>
            Reset Cart
          </button>

          <button onClick={() => setShowProduct(!showProduct)}>
            {showProduct ? 'Hide Product' : 'Show Product'}
          </button>
        </div>

        {showProduct && (
          <ProductCard
            productName={productName}
            price={price}
            quantity={quantity}
            selectedColor={selectedColor}
            deliveryCity={deliveryCity}
          />
        )}
      </main>

      <Footer />
    </div>
  )
}

export default App