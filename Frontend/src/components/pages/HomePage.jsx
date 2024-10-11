import React, { useEffect, useState } from 'react'
import Layout from '../Layout/Layout'
import { toast } from 'react-toastify';
import axios from 'axios';
import { Checkbox, Radio } from 'antd';
import { Prices } from '../Prices';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/Cart';
const HomePage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState();
  const [checked, setChecked] = useState([]);
  const [radio, setRadio] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [cart, setCart] = useCart();

  const getAllCategory = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/category/get-category`)
      if (res.data?.success) {
        setCategories(res.data?.category);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getAllCategory();
    getTotal();
  }, [])
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/product-list/${page}`);
      setLoading(false);
      console.log(data);
      setProducts(data.products);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error("something went wrong")
    }
  }

  // get total
  const getTotal = async () => {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/product-count`);
      setTotal(data?.total)

    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    if (page === 1) return;
    loadMore();
  }, [page])
  const loadMore = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/product-list/${page}`);
      setProducts([...products, ...data?.products])
      setLoading(false);

    } catch (error) {
      setLoading(false);
      console.log(error)
    }
  }


  useEffect(() => {
    if (!checked.length || !radio.length) getAllProducts();
  }, [checked.length, radio.length])

  useEffect(() => {

    if (checked.length || radio.length) filteredProducts();

  }, [checked, radio])
  // filter by category
  const handleFilter = (value, id) => {
    let all = [...checked];
    if (value) {
      all.push(id);
    }
    else {
      all = all.filter(c => c !== id);
    }
    setChecked(all);

  }

  const filteredProducts = async () => {
    try {
      const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/product/product-filters`, { checked, radio })
      setProducts(data?.products)
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <Layout title="All Products - Best Offers">

      <img src="/images/banner2.jpg" style={{ height: '90vh', width: '100vw' }} alt="banner" />
      <div className="row mt-3 ms-3" >
        <div className="col-md-2 sticky-sidebar">
          <div>
            <h4 className='text-center mt-5'>
              Filter By Category
            </h4>
            <div className="d-flex flex-column">

              {categories?.map((c) => (

                <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                  {c.name}
                </Checkbox>

              ))}
            </div>

            <h4 className='text-center mt-4'>
              Filter By Price
            </h4>
            <div className="d-flex flex-column">
              <Radio.Group onChange={e => setRadio(e.target.value)}>
                {Prices?.map((p) => (
                  <div key={p._id}>
                    <Radio value={p.array}>
                      {p.name}

                    </Radio>
                  </div>
                ))}
              </Radio.Group>

            </div>
            <div>
              <Radio.Group onChange={e => setRadio(e.target.value)}>
                <button className='btn btn-danger mt-3' onClick={() => window.location.reload()}>Reset Filters</button>
              </Radio.Group>

            </div>
          </div>
        </div>
        <div className="col-md-10 scrollable-products">
          <h1 className='text-center'>All Products</h1>
          <div className="d-flex flex-wrap justify-content-evenly ">
           
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
          <div className='m-2 p-3'>
            {products && products.length < total && (
              <button className='btn btn-warning' onClick={(e) => {
                e.preventDefault();
                setPage(page + 1);
              }}>
                {loading ? "Loading..." : "Loadmore"}
              </button>
            )}

          </div>
        </div>
      </div>
    </Layout>
  )
}

export default HomePage
