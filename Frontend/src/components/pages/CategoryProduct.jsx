import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../context/Cart';

const CategoryProduct = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState();
  const [cart , setCart] =useCart();
  const params = useParams();
  useEffect(() => {
    if (params?.slug) getProductByCat();
  }, [params?.slug])
  const getProductByCat = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/product-category/${params.slug}`)
      setProducts(data?.products)
      setCategory(data?.category)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout title="Category-Wise">
      <div className="container mt-2">
        <h3 className='text-center text-capitalize'> {category?.name}</h3>
        <h6 className='text-center'> {products?.length} Products Found</h6>

        <div className="row">
          <div className="d-flex flex-wrap ">
            {products?.map((p, index) => (

              <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                <img src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`} className="card-img-top product-photo" alt={p.name} />
                <div className="card-body">
                  <div className='d-flex justify-content-between flex-wrap'>
                  <h5 className="card-title text-capitalize">{p.name}</h5>
                  <h5 className="card-text text-success"> ${p.price}</h5>

                  </div>
                  <p className="card-text text-capitalize"> {p.description.substring(0, 25)}...</p>
                  <div className='d-flex justify-content-between flex-wrap g-2'>

                  <button className='btn btn-primary ms-1 mb-2 ' onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                  <button className='btn btn-secondary ms-1 mb-2'
                    onClick={() => {
                      setCart([...cart, p])
                      localStorage.setItem('cart', JSON.stringify([...cart, p]))
                      toast.success("Item Added to cart")
                    }}
                  >Add to cart</button>
                  </div>
                </div>
              </div>

            )
            )}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default CategoryProduct
