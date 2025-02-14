import React from "react";
import { useSelector } from "react-redux";

function Orders() {
    const purchaseHistory = useSelector(state => state.purchaseDetails);
    console.log("Purchase History Data:", purchaseHistory);

    return (
        <>
            {purchaseHistory.length > 0 ? (
                <div className="container mt-4">
                    <h1 className="mb-4">Purchase History</h1>
                    {purchaseHistory.map((order, index) => (
                        <div key={index} className="card mb-4">
                            <div className="card-body">
                                <p><strong>Purchase Date:</strong> {order.date}</p>
                                <p><strong>Total Amount Paid:</strong> ${order.totalPrice ? order.totalPrice.toFixed(2) : "0.00"}</p>
                                
                                <h3 className="mt-3">Purchased Items:</h3>
                                <ul className="list-group">
                                    {order.items.map((product, i) => (
                                        <li key={i} className="list-group-item">
                                            {product.name} - ${product.price.toFixed(2)} × {product.quantity} = $
                                            {(product.price * product.quantity).toFixed(2)}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="container mt-4">
                    <p className="alert alert-warning">No Purchase History</p>
                </div>
            )}
        </>
    );
}

export default Orders;