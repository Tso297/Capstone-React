import React, { useEffect, useState } from 'react';
import './Orders.css'
import Background from '../public/checkout.png'

const API_URL = 'https://flask-capstone-1.onrender.com/api'; // Your Flask API URL

function Orders() {
  const [orders, setOrders] = useState([]);
  const [fulfilledOrders, setFulfilledOrders] = useState([]);

  useEffect(() => {
    fetchOrders();
    fetchFulfilledOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/orders`);
      if (!response.ok) {
        throw new Error('Failed to fetch orders');
      }
      const data = await response.json();
      setOrders(data.map(order => ({
        ...order,
        order_details: JSON.parse(order.order_details || '[]'),
        createdAt: new Date(order.createdAt).toLocaleString()
      })));
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };
  
  const fetchFulfilledOrders = async () => {
    try {
      const response = await fetch(`${API_URL}/fulfilled_orders`);
      if (!response.ok) {
        throw new Error('Failed to fetch fulfilled orders');
      }
      const data = await response.json();
      setFulfilledOrders(data.map(order => ({
        ...order,
        order_details: JSON.parse(order.order_details || '[]'),
        createdAt: new Date(order.createdAt).toLocaleString()
      })));
    } catch (error) {
      console.error('Error fetching fulfilled orders:', error);
    }
  };

  const handleFulfillOrder = async (orderId) => {
    try {
      const response = await fetch(`${API_URL}/fulfill_order/${orderId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      });
      if (response.ok) {
        await fetchOrders();
        await fetchFulfilledOrders();
      } else {
        console.error('Failed to fulfill order:', await response.json());
      }
    } catch (error) {
      console.error('Error fulfilling order:', error);
    }
  };
  
  const handleUnfulfillOrder = async (orderId) => {
    try {
      const response = await fetch(`${API_URL}/unfulfill_order/${orderId}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'}
      });
      if (response.ok) {
        await fetchOrders();
        await fetchFulfilledOrders();
      } else {
        console.error('Failed to unfulfill order:', await response.json());
      }
    } catch (error) {
      console.error('Error unfulfilling order:', error);
    }
  };

  return (
    <div className="orders-container" style={{
        backgroundImage: `url(${Background})`,
        backgroundSize: 'cover',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',

        boxShadow: 'inset 0 0 300px rgba(0,0,0,0.9)'
    }}>
      <div className="main-section">
        <div className="orders-list">
          <h2 className="orders-h2">Unfulfilled Orders</h2>
          {orders.map(order => (
            <div key={order.id} className="order-block">
              <div className="order-header">
                <h3 className="orders-h3">Order #{order.id}</h3>
                <span className="created-date">{order.createdAt}</span>
              </div>
              {order.order_details.map((blend, index) => (
                <p key={index} className="blend-details">
                  <strong>{blend.name} : </strong> {blend.ingredients.map(ingredient => `${ingredient.name} ${ingredient.percentage}%`).join(', ')}
                  <span className="price-detail">${blend.totalPrice.toFixed(2)}</span>
                </p>
              ))}
              <div className="shipping-info">
                <strong>Shipping :</strong> {order.shipping_name}, {order.shipping_line1}, {order.shipping_city}, {order.shipping_country}, {order.shipping_postal_code}
                <button className="orders-button" onClick={() => handleFulfillOrder(order.id)}>Fulfill</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="main-section"> 
        <div className="orders-list">
          <h2 className="orders-h2">Fulfilled Orders</h2>
          {fulfilledOrders.map(order => (
            <div key={order.id} className="order-block">
              <div className="order-header">
                <h3 className="orders-h3">Order #{order.id}</h3>
                <span className="created-date">{order.createdAt}</span>
              </div>
              {order.order_details.map((blend, index) => (
                <p key={index} className="blend-details">
                  <strong>{blend.name}: </strong> {blend.ingredients.map(ingredient => `${ingredient.name} ${ingredient.percentage}%`).join(', ')}
                  <span className="price-detail">${blend.totalPrice.toFixed(2)}</span>
                </p>
              ))}
              <div className="shipping-info">
                <strong>Shipping:</strong> {order.shipping_name}, {order.shipping_line1}, {order.shipping_city}, {order.shipping_country}, {order.shipping_postal_code}
                <button className="orders-button"  onClick={() => handleUnfulfillOrder(order.id)}>Unfulfill</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;