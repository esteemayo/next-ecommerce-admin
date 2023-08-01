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
          <tr>
            <td></td>
          </tr>
        </tbody>
      </table>
    </>
  );
};

export default Orders;
