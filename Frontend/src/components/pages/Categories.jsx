import React from 'react'
import Layout from '../Layout/Layout'
import { useCategory } from '../../hooks/useCategory'
import { Link } from 'react-router-dom';

const Categories = () => {
    const categories = useCategory();
    return (
        <Layout title='All Categories'>
            
            <div className="container h-100 w-100 d-flex justify-content-evenly flex-wrap">
                <div className="row">
                    {
                        categories.map((c) => (
                            <div className="col-md-6 mt-5 mb-3 gx-3 d-flex  justify-content-center align-items-center" key={c._id}>

                                    <Link to={`/category/${c.slug}`} className='btn btn-outline-secondary category-btn p-4 text-capitalize'>{c.name}</Link>
                            </div>
                        ))
                    }
                </div>
            </div>
        </Layout>
    )
}

export default Categories
