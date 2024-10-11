import React, { useEffect, useState } from 'react'
import Layout from './../Layout/Layout';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/Cart';
import { toast } from 'react-toastify';

const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [relatedProduct, setRelatedProduct] = useState([]);
    const navigate = useNavigate();
    const [cart , setCart] = useCart();
    useEffect(() => {
        if (params?.slug) {
            getProduct();
        }
    }, [params?.slug]);
    const getProduct = async () => {
        try {

            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product);
            getSimilarProduct(data?.product._id, data?.product.category?._id)
        } catch (error) {
            console.log(error);
        }
    }

    // get similar products
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/product/related-product/${pid}/${cid}`)
            setRelatedProduct(data?.products);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Layout title="Product-Info">
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-6">
                        <img
                            src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${product._id}`}
                            alt={product.name}
                            height={"300px"}
                            width={"350px"}
                            className="img img-responsive"
                        />
                    </div>
                    <div className="col-md-6">
                        <h1 className='text-center'>Product Details</h1>
                        <h5>Name: {product.name}</h5>
                        <h6>Description: {product.description}</h6>
                        <h6>Category: {product.category?.name}</h6>
                        <h5>Price: $ {product.price}</h5>
                        <button className='btn btn-secondary ms-1 mb-2'
                      onClick={() => {
                        setCart([...cart, product])
                        localStorage.setItem('cart', JSON.stringify([...cart, product]))
                        toast.success("Item Added to cart")
                      }}
                    >Add to cart</button>

                    </div>
                </div>
                <hr />

                <div className="row">
                    <h6>Similar Products</h6>
                    {relatedProduct.length < 1 ? <p className='text-center'>No Similar Products Found</p> :
                        <div className="d-flex flex-wrap">
                         
                            {relatedProduct?.map((p, index) => (

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

                                        </div>
                                    </div>
                                </div>

                            )
                            )}
                        </div>
                    }
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails
