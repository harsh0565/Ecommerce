import React from 'react'
import Layout from '../Layout/Layout'
const Policy = () => {
    return (
        <Layout title="Policy -Ecommerce">
            <div className="container">
                <div className="row mt-5">
                    <div className="col-md-6">
                        <img src="/images/contactus.jpeg" alt="About us" style={{ width: "100%" }} />
                    </div>
                    <div className="col-md-6 p-5 align-content-center scrollable-products">
                        <div>
                            <h3>Privacy Policy</h3>
                            <ul>
                                <li className='fst-italic'>To initiate a return, please contact our customer service team with your order number and reason for the return.</li>
                                <li className='fst-italic'>Once your return is received and inspected, we will notify you of the approval or rejection of your refund. Approved refunds will be processed within 7-10 business days.</li>
                            </ul>
                        </div>
                        <div>
                            <h3>Shipping Policy</h3>
                            <ul>
                                <li className='fst-italic'>We offer free standard shipping on all orders over $50. For orders below $50, a flat-rate shipping fee of $5 applies.</li>
                                <li className='fst-italic'>Orders are processed within 1-2 business days and typically delivered within 5-7 business days</li>
                            </ul>
                        </div>
                        <div>
                            <h3>Terms of Service</h3>
                            <ul>
                                <li className='fst-italic'>By using this website, you agree to abide by all applicable laws and regulations.</li>
                                <li className='fst-italic'>We reserve the right to modify, suspend, or discontinue any aspect of the site at any time without notice.</li>
                                <li className='fst-italic'>All product prices, descriptions, and availability are subject to change without prior notice.</li>
                            </ul>
                        </div>
                        <div>
                            <h3>Discount & Promotion Policy</h3>
                            <ul>
                                <li className='fst-italic'>Discounts are valid only for a limited time and may be subject to specific terms and conditions.</li>
                               
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Policy
