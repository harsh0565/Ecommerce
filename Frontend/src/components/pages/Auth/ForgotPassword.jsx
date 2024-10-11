import React, { useState } from 'react'
import { useNavigate,} from 'react-router-dom'
import axios from "axios"
import Layout from '../../Layout/Layout';
import { toast } from 'react-toastify';


const ForgotPassword = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        email: "",
        newPassword: "",
        answer: ""
    })

    const inputHandler = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });

    }
    const submitForm = async (e) => {

        e.preventDefault();
        console.log(user);
        await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/auth/forgot-password`, user).then((res) => {
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
        <Layout title="Password reset">
            <div className='d-flex align-item-center justify-content-center bg-body-secondary p-2'>

                <form className='border border-primary p-5 m-5 w-50' onSubmit={submitForm}>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input onChange={inputHandler} type="email" className="form-control" required name='email' id="email" aria-describedby="emailHelp" />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="newPassword" className="form-label">New Password</label>
                        <input onChange={inputHandler} type="password" className="form-control" required name='newPassword' id="newPassword" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="answer" className="form-label">Enter your Favourite sports(case sensitive)</label>
                        <input onChange={inputHandler} type="text" className="form-control" required name='answer' id="answer" aria-describedby="emailHelp" />
                    </div>

                   
                    <center> <button type="submit" className="btn btn-primary">Reset</button></center>
                </form>
                </div>
        </Layout>
    )
}

export default ForgotPassword
