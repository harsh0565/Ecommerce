import React, { useState } from 'react'
import Layout from '../Layout/Layout'
import { useCart } from '../context/Cart'
import { useAuth } from '../context/Auth';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

const CartPage = () => {
    const [cart, setCart] = useCart();
    const [auth, setAuth] = useAuth();
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map(item => {
                total = total + item.price;
            })
            return total.toLocaleString("en-us", {
                style: "currency",
                currency: "USD"
            })

        } catch (error) {
            console.log(error);
        }
    }
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart))
        } catch (error) {
            console.log(error);
        }
    }
   
    const handlePayment = async () => {
        try {
          if (!cart || cart.length === 0) {
            toast.error("Your cart is empty!");
            return;
          }
          
          if (!auth?.user?.address) {
            toast.error("Please update your address before making payment");
            navigate("/dashboard/user/profile");
            return;
          }
      
      
          const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/product/payment`, {
            cart 
          });
      
          if (data?.success) {
            localStorage.removeItem('cart');
            setCart([]); 
            toast.success("Order placed successfully!");
      
            setLoading(true);
            setTimeout(() => {
              navigate("/dashboard/user/orders");
              setLoading(false);
            }, 1000);
          } else {
            toast.error("Payment failed, please try again.");
          }
        } catch (error) {
          console.error("Payment Error:", error); 
          toast.error("Error processing payment, please try again.");
        }
      };
      
      


    return (
        <Layout title="Ecommerce-cart">
            <div className="container">
                <div className="row">
                    <div className="col-md-12">
                        <h1 className='text-center p-2 mb-1  text-capitalize'>
                            {`Hello ${auth?.token && auth?.user.name}`}
                        </h1>
                        <h4 className='text-center text-capitalize'>
                            {cart?.length ? `You Have ${cart?.length} items in your cart ${auth?.token ? "" : "Please login to checkout"} ` : "Your Cart is Empty"}
                        </h4>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-8 scrollable-products">
                        {
                            cart?.map(p => (
                                <div className="row card mb-2 p-3 flex-row btn-outline-light btn ">
                                    <div className="col-md-4">
                                        <img src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`} className="card-img-top product-photo" alt={p.name} width={'80px'} height={'80px'} />
                                    </div>
                                    <div className="col-md-8">
                                        <h3>{p.name}</h3>
                                        <p>Price :   $ {p.price}</p>
                                        <button className='btn btn-danger btn-outline-dark' onClick={() => removeCartItem(p._id)}>Remove</button>
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className="col-md-4 text-center">
                        <h2>Cart Summary</h2>
                        <p>Total | Checkout | Payment</p>

                        <hr />
                        <h4>Total: {totalPrice()} </h4>
                        {auth?.user?.address ? (
                            <>
                                <div className="mb-3">
                                    <h3>Current Address</h3>
                                    <h4>{auth?.user?.address}</h4>
                                    <button className='btn btn-outline-warning' onClick={() => navigate("/dashboard/user/profile")}>Update Address</button>
                                    <hr />
                                    {loading ? (<>
                                        <button className='btn  btn-outline-success disabled'>Processing</button>

                                    </>) : (<>
                                        <button className='btn  btn-outline-success ' onClick={handlePayment}>Make Payment</button>
                                    </>)}
                                </div>
                            </>
                        ) : (<>
                            <div className="mb-3">
                                {
                                    auth?.token ? (
                                        <>
                                            <button className='btn btn-outline-warning' onClick={() => navigate("/dashboard/user/profile")} >Update Address</button>
                                        </>
                                    ) : (
                                        <>
                                            <button className='btn btn-outline-warning' onClick={() => navigate("/login", {
                                                state: "/cart"
                                            })}>Please Login to Checkout</button>
                                            <hr />
                                            <button className='btn  btn-outline-success disabled'>Make Payment</button>

                                        </>
                                    )
                                }
                            </div>
                        </>)}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CartPage
