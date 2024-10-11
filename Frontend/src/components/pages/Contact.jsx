import React from 'react'
import Layout from '../Layout/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";


const Contact = () => {
    return (
        <Layout title="Contact Us - Ecommerce">
            <div className="container-fluid">
                <div className="container">
                    <div className="row contactus mt-5">
                        <div className="col-md-6">
                            <img src="/images/contactus.jpeg" alt="contactus" style={{ width: "100%" }} />
                        </div>
                        <div className="col-md-6 mt-5">
                            <h1 className='bg-dark text-white text-uppercase text-center'>Contact Us</h1>
                            <p className='mt-3'>Any query and info about product feel free to call anytime  24X7 available</p>
                            <p className='mt-3'><BiMailSend /> :www.help@ecommerce.com</p>
                            <p className='mt-3'>
                                <BiPhoneCall /> :3292330323
                            </p>
                            <p className='mt-3'>
                                <BiSupport /> : 1800-0000-0000 (toll free)
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Contact
