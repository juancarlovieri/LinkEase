// OrdersQueue.js
const OrdersQueue = ({ orders }) => {
  const showOrder = true;
  return (
    <div className="orders-queue">
      <div className="orders-container">
        {orders.length === 0 ? (
          <p>No current offers.</p>
        ) : (
          orders.map(order => (
             (<div className="order-block">
              <h2>Order no. {order.id}</h2>
              <p> Selling {order.amount1} {order.blockchain1.name}</p>
              <p> Buying {order.amount2} {order.blockchain2.name}</p>
            </div>)
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersQueue;
