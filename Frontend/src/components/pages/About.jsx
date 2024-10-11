import React from 'react'
import Layout from '../Layout/Layout'

const About = () => {
  return (
    <Layout title="About Us -Ecommerce">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <img src="/images/about.jpeg" alt="About us" style={{ width: "100%" }} />
          </div>
          <div className="col-md-6 p-5 align-content-center fst-italic ">
            <p>
              Welcome to HS Store, your trusted online destination for high-quality products and exceptional service. Our mission is simple: to provide our customers with an enjoyable, seamless shopping experience while offering a wide range of products that cater to every need.
            </p>
            <p>we believe in the power of choice, quality, and affordability. We have carefully curated a collection that reflects the latest trends and timeless classics, ensuring that there's something for everyone. From fashionable clothing and accessories to cutting-edge electronics, we are committed to offering only the best.</p>
            <p>Our journey began with a passion for making shopping more convenient and accessible to everyone. We continuously strive to improve and innovate, keeping customer satisfaction at the forefront of everything we do. Whether you're here to discover new arrivals, find great deals, or explore our blog for tips and inspiration, we aim to exceed your expectations every step of the way.</p>

            <div>
              <h3>Why Choose Us?</h3>
              <ul>
                <li>Wide range of carefully curated products</li>
                <li>Fast and reliable shipping</li>
                <li>Dedicated customer support team</li>
                <li>Secure and seamless online shopping experience</li>
              </ul>
            </div>
            </div>

          </div>
        </div>
    </Layout>
  )
}

export default About
