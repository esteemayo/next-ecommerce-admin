'use client';

import { useEffect, useState } from 'react';
import { getOrders } from '@/services/orderService';

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await getOrders();
        setOrders(data);
      } catch (err) {
        console.log(err);
      }
    })();
  }, []);

  return (
    <>
      <h1>Orders</h1>
      <table className='basic'>
        <thead>
          <tr>
            <th>Date</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 && orders.map((item) => {
            const { _id: id, name, email, city, postalCode, country, streetAddress, createdAt, line_items } = item;
            return (
              <tr key={id}>
                <td>{createdAt}</td>
                <td>
                  {name} {email} <br />
                  {city} {postalCode} {country} <br />
                  {streetAddress}
                </td>
                <td>
                  {line_items.map((item, index) => {
                    return (
                      <div key={index}>
                        {item.price_data.product_data.name} x {item.quantity}
                      </div>
                    );
                  })}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Orders;
