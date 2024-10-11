import React from 'react'
import Header from './Header'
import Footer from './Footer'
import { Helmet } from "react-helmet";
import { ToastContainer } from 'react-toastify';

const Layout = (props) => {
    return (
        <div>
            <Helmet>
                <meta charSet="utf-8" />
                <title>{props.title}</title>
            </Helmet>
            <Header />
            <main style={{ minHeight: '80vh' }} >
                <ToastContainer position="top-center"
                    reverseOrder={false} />
                {props.children}</main>
            <Footer />
        </div>
    )
}

export default Layout
