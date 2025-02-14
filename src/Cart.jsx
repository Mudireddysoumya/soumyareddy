import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { addPurchaseDetails, clearCart, decraement, increament, remove } from './Store';
import "./Cart.css"; // Import CSS file

function Cart() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector(state => state.cart);
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [showDiscount, setShowDiscount] = useState(false);
  const [cuponCode, setCuponCode] = useState('');
  const [cuponCodeDiscountPer, setCuponCodeDiscountPer] = useState(0);

  let totalPrice = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
  let discountAmount = (totalPrice * discountPercentage) / 100;
  let cuponDiscountAmount = (totalPrice * cuponCodeDiscountPer) / 100;
  let finalAmount = totalPrice - discountAmount - cuponDiscountAmount;

  const handleCouponApply = () => {
    const coupons = {
      "RATAN10": 10,
      "RATAN20": 20,
      "RATAN30": 30,
      "RATAN40": 40
    };
    
    if (coupons[cuponCode.toUpperCase()]) {
      setCuponCodeDiscountPer(coupons[cuponCode.toUpperCase()]);
    } else {
      alert('Invalid coupon code');
      setCuponCodeDiscountPer(0);
    }
  };

  const handleCompletePurchase = () => {
    if (!isAuthenticated) {
      navigate('/Login');
      return;
    }

    const purchaseDetails = {
      date: new Date().toLocaleDateString(),
      items: [...cartItems],
      totalPrice: finalAmount
    };

    dispatch(clearCart());
    dispatch(addPurchaseDetails(purchaseDetails));
    alert('Purchase Completed Successfully!');
  };

  return (
    <div className="cart-container">
      {cartItems.length > 0 ? (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="list-group-item">
                <span>{item.name} - ${item.price}</span>
                <div className="cart-actions">
                  <button onClick={() => dispatch(increament(item))}>+</button>
                  <button onClick={() => dispatch(decraement(item))}>-</button>
                  <span className="quantity">Quantity: {item.quantity}</span>
                  <button onClick={() => dispatch(remove(item))}>Remove</button>
                </div>
              </li>
            ))}
          </ul>

          <p className="total-amount">Your total amount: <strong>${totalPrice.toFixed(2)}</strong></p>

          {showDiscount && (
            <div className="discount-section">
              <p>Your Discount Applied: {discountPercentage}%</p>
              <p className="discount-amount">Discount Amount: ${discountAmount.toFixed(2)}</p>
            </div>
          )}

          <p className="final-amount">Your final amount: <strong>${finalAmount.toFixed(2)}</strong></p>

          <div className="discount-buttons">
            <button onClick={() => { setDiscountPercentage(10); setShowDiscount(true); }}>Apply 10% discount</button>
            <button onClick={() => { setDiscountPercentage(20); setShowDiscount(true); }}>Apply 20% discount</button>
            <button onClick={() => { setDiscountPercentage(30); setShowDiscount(true); }}>Apply 30% discount</button>
          </div>

          <div className="coupon-section">
            <input
              type="text"
              value={cuponCode}
              onChange={(e) => setCuponCode(e.target.value)}
              placeholder="Enter Coupon Code"
            />
            <button onClick={handleCouponApply}>Apply Coupon</button>
          </div>

          {cuponCode && cuponDiscountAmount > 0 && (
            <div className="coupon-discount">
              <p>Coupon Code Applied: <strong>{cuponCode}</strong></p>
              <p>Discount: <strong>{cuponCodeDiscountPer}%</strong></p>
            </div>
          )}

          <button className="complete-purchase-btn" onClick={handleCompletePurchase}>
            Complete Purchase
          </button>
        </>
      ) : (
        <p className="empty-cart">Your cart is empty...</p>
      )}
    </div>
  );
}

export default Cart;
