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
            <th>Category name</th>
            <th>Recipient</th>
            <th>Products</th>
          </tr>
        </thead>
        <tbody>
          {orders.length > 0 && orders.map((item) => {
            const { _id: id, name, email, city, postalCode, country, streetAddress } = item;
            return (
              <tr key={id}>
                <td>{id}</td>
                <td>
                  {name} {email} <br />
                  {city} {postalCode} {country} <br />
                  {streetAddress}
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
