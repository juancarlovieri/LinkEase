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
              <p> <b>Owner: </b> {order.owner} </p>
              <p> <b>To sell: </b>{order.amount1} {order.blockchain1.name}</p>
              <p> <b>To buy: </b>{order.amount2} {order.blockchain2.name}</p>
              <div className={`status ${order.completed === 'Completed' ? 'completed' : 'open'}`}>
                {order.completed}
              </div>
              {/* <p> Gas Fee: {order.fee} </p> */}
            </div>)
          ))
        )}
      </div>
    </div>
  );
};

export default OrdersQueue;
