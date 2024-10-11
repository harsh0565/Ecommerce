import React, { useEffect, useState } from 'react'
import AdminMenu from '../../Layout/AdminMenu'
import Layout from '../../Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/get-product`);
      console.log(data);
      setProducts(data.products);
    } catch (error) {
      console.log(error);
      toast.error("something went wrong")
    }
  }
  useEffect(() => {
    getAllProducts();
  }, [])
  return (
    <Layout title="Dashboard - All Product">
      <div className="row mt-3">
        <div className="col-md-3 sticky-sidebar">
          <AdminMenu />
        </div>
        <div className="col-md-9 scrollable-products">
          <h1 className='text-center'>All Products List</h1>
          <div className='d-flex flex-wrap justify-content-evenly'>
            {products.map((p, index) => (

              <Link to={`/dashboard/admin/product/${p.slug}`} key={p._id} className='product-link'>
                <div className="card m-2"  style={{ width: "18rem" }}>
                  <img src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`} className="card-img-top product-photo" alt={p.name}  />
                  <div className="card-body">
                    <h5 className="card-title">{p.name}</h5>
                    <p className="card-text"> {p.description.substring(0,30)}...</p>
                  </div>
                </div>
              </Link>
            )
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Products
