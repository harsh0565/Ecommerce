import React, { useEffect, useState } from 'react';
import Layout from '../../Layout/Layout';
import UserMenu from '../../Layout/UserMenu';
import { useAuth } from '../../context/Auth';
import axios from 'axios';
import moment from 'moment'

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [auth] = useAuth();

  const getOrder = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/auth/orders`);
      setOrders(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    if (auth?.token) getOrder();
  }, [auth?.token]);

  return (
    <Layout title='Orders'>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3 sticky-sidebar">
            <UserMenu />
          </div>
          <div className="col-md-9 scrollable-products">
            <h1 className='text-center'>All Orders</h1>
            {orders.length === 0 ? (
              <p>No orders found.</p>
            ) : (
              orders.map((order, index) => (
                <div className="card mb-3" key={order._id}>
                  <div className="card-header">
                    <h5>Order {index + 1}</h5>
                    <small>Order ID: {order._id}</small><br />
                    <small>Quantity: {order?.products?.length}</small><br />
                    <small>Status: {order?.status}</small><br />
                    <small>Ordered on: {new Date(order.createdAt).toLocaleDateString('en-GB')}</small> <br/>
                    <small>Ordered  {moment(order.createdAt).fromNow()}  </small>
                  </div>
                  <div className="card-body scrollable-products">
                    <p><strong>Products:</strong></p>
                    <ul className="list-group">
                      {order.products?.map((product, idx) => (
                        <li key={product._id} className="list-group-item">
                           {idx + 1}.    
                          <img 
                            src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product._id}`}
                            style={{ width: "100px", height: "100px", objectFit: "cover" }} 
                            className="card-img-top ms-3 me-3"
                            alt={product.name}
                          />

                            Product Name: {product.name}

                        </li>
                      ))}
                    </ul>
                  </div>
                 
                </div>
              ))
            )}
          </div>
          
        </div>
      </div>
    </Layout>
  );
};

export default Orders;
