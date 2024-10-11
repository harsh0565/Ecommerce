import React from 'react'
import { Link } from 'react-router-dom';

const AdminMenu = () => {
    return (
        <>
            <div className='text-center'>
                <div className="list-group mt-4">
                    <h4>Admin Panel</h4>
                    <Link to={"/dashboard/admin/create-category"} type="button" className="list-group-item list-group-item-action">Create Category</Link>
                    <Link to={"/dashboard/admin/create-product"} type="button" className="list-group-item list-group-item-action">Create Product</Link>
                    <Link to={"/dashboard/admin/products"} type="button" className="list-group-item list-group-item-action">Products</Link>
                    <Link to={"/dashboard/admin/orders"} type="button" className="list-group-item list-group-item-action">Orders</Link>
                </div>
            </div>
        </>
    )
}

export default AdminMenu
