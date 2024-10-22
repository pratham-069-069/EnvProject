import React, { useState, useEffect } from 'react';
import { FaTrash, FaRecycle, FaLeaf, FaBatteryFull, FaCheckCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const wasteTypes = [
  { id: 'general', name: 'General Waste', icon: FaTrash, pricePerKg: 40, color: 'text-gray-600' },
  { id: 'recyclable', name: 'Recyclable', icon: FaRecycle, pricePerKg: 25, color: 'text-blue-600' },
  { id: 'green', name: 'Green Waste', icon: FaLeaf, pricePerKg: 15, color: 'text-green-600' },
  { id: 'electronic', name: 'Electronic Waste', icon: FaBatteryFull, pricePerKg: 80, color: 'text-red-600' },
];

const WastePricing = () => {
  const [selectedWaste, setSelectedWaste] = useState(wasteTypes[0].id);
  const [amount, setAmount] = useState(1);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  const [orderSubmitted, setOrderSubmitted] = useState(false);

  useEffect(() => {
    const newTotal = cart.reduce((sum, item) => sum + item.amount * item.pricePerKg, 0);
    setTotal(newTotal);
  }, [cart]);

  const handleAddToCart = () => {
    const wasteType = wasteTypes.find(w => w.id === selectedWaste);
    const existingItemIndex = cart.findIndex(item => item.id === selectedWaste);

    if (existingItemIndex !== -1) {
      const newCart = [...cart];
      newCart[existingItemIndex].amount += amount;
      setCart(newCart);
    } else {
      setCart([...cart, { ...wasteType, amount }]);
    }

    setAmount(1);
  };

  const handleRemoveFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const handlePlaceOrder = () => {
    // Here you would typically send the order to a server
    setOrderSubmitted(true);
    // Reset the cart after order is placed
    setCart([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-green-50">
      <header className="bg-white shadow-md">
        <div className="container mx-auto px-4 py-6 flex justify-between items-center">
          <Link to="/" className="flex items-center text-2xl font-bold text-green-600">
            <FaLeaf className="mr-2" />
            <span>EcoCollect</span>
          </Link>
          <nav>
            <ul className="flex space-x-6">
              <li><Link to="/" className="text-green-700 hover:text-green-900">Home</Link></li>
              <li><Link to="/about" className="text-green-700 hover:text-green-900">About</Link></li>
              <li><Link to="/wastepricing" className="text-green-700 hover:text-green-900">Pricing</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-center mb-8 text-green-800">Waste Collection Pricing</h1>
        
        {/* Waste Pricing Menu */}
        <div className="mb-8 bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4 text-green-700">Waste Pricing Menu</h2>
          <p className="text-sm text-gray-600 mb-4">Our current rates per kilogram</p>
          <ul className="space-y-4">
            {wasteTypes.map((waste) => (
              <li key={waste.id} className="flex items-center justify-between">
                <span className="flex items-center">
                  <waste.icon className={`mr-2 ${waste.color}`} />
                  {waste.name}
                </span>
                <span className="font-semibold">₹{waste.pricePerKg.toFixed(2)}/kg</span>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm text-gray-600">
            Prices are subject to change. Please contact us for bulk pricing and special waste handling.
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-green-700">Select Waste Type and Amount</h2>
            <p className="text-sm text-gray-600 mb-4">Choose the type of waste and enter the amount in kg</p>
            <div className="space-y-4">
              <div>
                <label htmlFor="waste-type" className="block text-sm font-medium text-gray-700 mb-1">Waste Type</label>
                <select
                  id="waste-type"
                  value={selectedWaste}
                  onChange={(e) => setSelectedWaste(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                >
                  {wasteTypes.map((waste) => (
                    <option key={waste.id} value={waste.id}>
                      {waste.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">Amount (kg)</label>
                <input
                  id="amount"
                  type="number"
                  min="1"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:ring-green-500 focus:border-green-500"
                />
              </div>
            </div>
            <button
              onClick={handleAddToCart}
              className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
            >
              Add to Cart
            </button>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4 text-green-700">Your Waste Collection Cart</h2>
            <p className="text-sm text-gray-600 mb-4">Review your selected waste types and amounts</p>
            {orderSubmitted ? (
              <div className="text-center p-4 bg-green-100 rounded-lg">
                <FaCheckCircle className="mx-auto text-green-600 text-4xl mb-2" />
                <p className="text-lg font-semibold text-green-800">Order Submitted Successfully!</p>
                <p className="text-sm text-green-600 mt-2">Thank you for choosing our service.</p>
              </div>
            ) : (
              <>
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Type</th>
                      <th className="text-left py-2">Amount (kg)</th>
                      <th className="text-left py-2">Price/kg</th>
                      <th className="text-left py-2">Subtotal</th>
                      <th className="text-left py-2"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((item) => (
                      <tr key={item.id} className="border-b">
                        <td className="py-2 flex items-center">
                          <item.icon className={`mr-2 ${item.color}`} />
                          {item.name}
                        </td>
                        <td className="py-2">{item.amount}</td>
                        <td className="py-2">₹{item.pricePerKg.toFixed(2)}</td>
                        <td className="py-2">₹{(item.amount * item.pricePerKg).toFixed(2)}</td>
                        <td className="py-2">
                          <button
                            onClick={() => handleRemoveFromCart(item.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <FaTrash />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-sm text-gray-600">Total Amount</span>
                  <span className="text-xl font-bold text-green-700">₹{total.toFixed(2)}</span>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition duration-300"
                  disabled={cart.length === 0}
                >
                  Place Order
                </button>
              </>
            )}
          </div>
        </div>
      </main>

      <footer className="bg-green-800 text-white py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p>&copy; 2024 EcoCollect. All rights reserved.</p>
            <nav className="mt-4 md:mt-0">
              <Link to="/terms" className="mr-4 hover:underline">Terms of Service</Link>
              <Link to="/privacy" className="hover:underline">Privacy Policy</Link>
            </nav>
          </div>
        </div>
      </footer>

      <div className="fixed bottom-8 left-0 right-0 flex justify-center">
        <Link 
          to="/" 
          className="bg-green-600 text-white py-2 px-6 rounded-md hover:bg-green-700 transition duration-300 shadow-md"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default WastePricing;