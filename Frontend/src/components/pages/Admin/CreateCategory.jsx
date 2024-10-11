import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import AdminMenu from '../../Layout/AdminMenu'
import { toast } from 'react-toastify';
import axios from 'axios';
import CategoryForm from '../../Form/CategoryForm';
import { Modal } from 'antd'
const CreateCategory = () => {
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState("");
    // handle Form
    const [selected, setSelected] = useState(null);
    const [updatedName, setUpdatedName] = useState("");
    const [visible, setVisible] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/category/create-category`, { name })
            if (res.data?.success) {
                toast.success(`${name} is created`)
                getAllCategory();
                setName("");
            }
            else {
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error('Something went wrong in input form')
        }
    }

    const getAllCategory = async () => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/category/get-category`)
            if (res.data?.success) {
                setCategories(res.data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong in category");
        }
    }
    useEffect(() => {
        getAllCategory();
    }, [])

    //  update category
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            // console.log(e); 
            const res = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/category/update-category/${selected._id}`, { name: updatedName })
            if (res.data.success) {
                toast.success(`${updatedName} is updated`);
                setSelected(null);
                setUpdatedName("");
                setVisible(false);
                getAllCategory();
            }
            else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("error")
        }
    }
    // delete category
    const handleDelete = async (pId) => {
        
        try {
            // console.log(e); 
            const res = await axios.delete(`${import.meta.env.VITE_API_URL}/api/v1/category/delete-category/${pId}`, { name: updatedName })
            if (res.data.success) {
                toast.success(`Category is deleted`);
                getAllCategory();
            }
            else{
                toast.error(res.data.message);
            }
        } catch (error) {
            console.log(error);
            toast.error("error")
        }
    }
    return (
        <Layout title="Dashboard - Create Category">
            <div className="container-fluid m-3 p-3">

                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1> Manage category</h1>
                        <div className='p-3'>
                            <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName} />
                        </div>
                        <div className='w-75'>
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">S.No</th>
                                        <th scope="col">Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {categories?.map((c, index) => (
                                        <tr key={c._id}>

                                            <th scope="row">{index + 1}</th>
                                            <td>{c.name}</td>
                                            <td>
                                                <button className='btn btn-primary ms-2' onClick={() => { setVisible(true); setUpdatedName(c.name); setSelected(c) }}>Edit</button>
                                                <button className='btn btn-danger ms-2' onClick={()=> handleDelete(c._id)}>Delete</button>
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Modal onCancel={() => setVisible(false)} footer={null} visible={visible}>
                        <CategoryForm handleSubmit={handleUpdate} value={updatedName} setValue={setUpdatedName} />
                    </Modal>
                </div>
            </div>
        </Layout>
    )
}

export default CreateCategory
