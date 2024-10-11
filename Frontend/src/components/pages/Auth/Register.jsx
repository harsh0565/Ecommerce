import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import axios from "axios"
import Layout from '../../Layout/Layout';
import { toast } from 'react-toastify';

const Register = () => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        address: "",
        answer: ""
    })

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
        
    }

    const submitForm = async (e) => {

        e.preventDefault();
        console.log(user);
        await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/register`, user).then((res) => {
            if (res.data.success) {
                // console.log(res.data.message);
                
                toast.success(res.data.message);
                setTimeout(() => {
                    navigate("/login");
                }, 1000);
            }
            else {
                toast.error(res.data.message);
            }
        }).catch((error) => {
            console.log(error);
            toast.error("something went wrong")

        })
    }
    return (
        <Layout title="Registration - Ecommerce">


            <div className='d-flex align-item-center justify-content-center bg-body-secondary p-2'>

                <form className='border border-primary p-5 m-5 w-50' onSubmit={submitForm}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input onChange={inputHandler} type="text" className="form-control" required name='name' id="name" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input onChange={inputHandler} type="email" className="form-control" required name='email' id="email" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone</label>
                        <input onChange={inputHandler} type='number' min={10} maxLength={10} required className="form-control" name='phone' id="phone" aria-describedby="emailHelp" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input onChange={inputHandler} type="password" className="form-control" required name='password' id="password" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Address</label>
                        <input onChange={inputHandler} type="text" className="form-control" required name='address' id="address" />
                    </div>


                    <div className="mb-3">
                        <label htmlFor="answer" className="form-label">What is your favourite sports</label>
                        <input onChange={inputHandler} type="text" className="form-control" required name='answer' id="answer" />
                    </div>
                    <input type="reset" className='btn' value="Reset" />
                    <center> <button type="submit" className="btn btn-primary">SignUp</button></center>
                    <center className='mt-5 p-1'>Already Registered? <Link to={'/login'}>Login</Link>  </center>
                </form>
            </div>
        </Layout>
    )
}

export default Register
