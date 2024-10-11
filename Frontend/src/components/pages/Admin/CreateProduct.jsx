import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import AdminMenu from '../../Layout/AdminMenu'
import axios from 'axios';
import { toast } from 'react-toastify';
import { Select } from 'antd'
import { useNavigate } from 'react-router-dom';
const { Option } = Select

const CreateProduct = () => {

    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");


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

    const handleCreate = async (e) => {
        e.preventDefault();

        try {
            const productData = new FormData();
            productData.append("name", name);
            productData.append("description", description);
            productData.append("price", price);
            productData.append("quantity", quantity);
            productData.append("photo", photo);
            productData.append("category", category);
            console.log(productData);
            const { data } = await axios.post(`${import.meta.env.VITE_API_URL}/api/v1/product/create-product`, productData)
            // console.log(data);
            if (data?.success) {
                toast.success("Product created successfully");
                setTimeout(() => {
                    navigate("/dashboard/admin/products");
                }, 1000);
            }
            else {
                
                toast.error(data?.message)
            }
        } catch (error) {
            console.log(error);
            toast.error("Something went wrong");
        }
    }

    return (
        <Layout title="Dashboard - Create Product">
            <div className="container-fluid m-3 p-3">

                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1>Create Product</h1>
                        <div className="m-1 w-75">
                            <Select bordered={false} placeholder="Select a category" size='large' showSearch className='form-select mb-3' onChange={(value) => { setCategory(value) }}>
                                {categories?.map((c) => (
                                    <Option key={c._id} value={c._id}>
                                        {c.name}
                                    </Option>
                                ))}
                            </Select>

                            <div className="mb-3">
                                <label className='btn btn-outline-secondary col-md-12'>
                                    <input type="file" name='photo' id='' hidden="true" accept='images/*' onChange={(e) => { setPhoto(e.target.files[0]) }} />
                                    {photo ? photo.name : "Upload Photo"}
                                </label>
                            </div>
                            <div className="mb-3">
                                {photo && (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)} alt="product_photo" height={"200px"} className='img img-responsive' />
                                    </div>
                                )}
                            </div>

                            <div className="mb-3">
                                <input type="text" value={name} placeholder='Enter a name' className='form-control' onChange={(e) => setName(e.target.value)} />
                            </div>
                            <div className="mb-3">

                                <textarea type="textarea" value={description} placeholder='Enter description' className='form-control' onChange={(e) => setDescription(e.target.value)} />
                            </div>


                            <div className="mb-3">
                                <input type="number" value={price} placeholder='Enter Price' className='form-control' onChange={(e) => setPrice(e.target.value)} />
                            </div>
                            <div className="mb-3">
                                <input type="number" value={quantity} placeholder='Enter quantity' className='form-control' onChange={(e) => setQuantity(e.target.value)} />
                            </div>
                            <div className="mb-3">

                                <Select
                                    className='form-select mb-3' bordered={false} size="large"
                                    placeholder="select shipping" showSearch onChange={(value) => setShipping(value)} value={shipping || undefined}>
                                    <Option value="0">No</Option>
                                    <Option value="1">Yes</Option>
                                </Select>
                            </div>
                            <button className='btn btn-primary' onClick={handleCreate}>Create Product</button>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default CreateProduct
