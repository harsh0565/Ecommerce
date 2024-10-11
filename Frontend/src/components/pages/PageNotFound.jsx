import React from 'react'
import Layout from '../Layout/Layout'
import { Link } from 'react-router-dom'

const PageNotFound = () => {
  return (
    <Layout title="Page not Found">
     <div className="pnf">
        <h1 className='pnf-title'>404</h1>
        <h2 className='pnf-heading'>Oops! Page Not Found </h2>
        <Link to="/" className='btn m-3 p-2 border border-1 pnf-btn'>Go Back</Link>
     </div>
    </Layout>
  )
}

export default PageNotFound
