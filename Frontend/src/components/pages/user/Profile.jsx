import React, { useEffect, useState } from 'react'
import Layout from '../../Layout/Layout'
import UserMenu from '../../Layout/UserMenu'
import { useAuth } from '../../context/Auth'
import { toast } from 'react-toastify'
import axios from 'axios'
import { Link } from 'react-router-dom'

const Profile = () => {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    address: "",

  })
  const [auth, setAuth] = useAuth();

  useEffect(() => {

    const { email, name, phone, address } = auth?.user;
    setUser(prevUser => ({
      ...prevUser,
      email,
      name,
      phone,
      address
    }));

  }, [auth?.user]);

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });

  }

  const submitForm = async (e) => {
    e.preventDefault();
    try {

      console.log(user);
      const { data } = await axios.put(`${import.meta.env.VITE_API_URL}/api/v1/auth/profile`, user)
      if (data?.error) {
        toast.error(data?.error);
      }
      else {
          setAuth({...auth ,user:  data?.updatedUser})
          let ls = localStorage.getItem("auth");
          ls = JSON.parse(ls);
          ls.user = data?.updatedUser;
          localStorage.setItem("auth" , JSON.stringify((ls)));
          toast.success("Profile Updated Successfully")
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong")
    }

  }
  return (
    <Layout title="Profile">
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu />
          </div>
          <div className="col-md-9">
            <div className='d-flex align-item-center justify-content-center bg-body-secondary p-2'>

              <form className='border border-primary p-5 m-5 w-50' onSubmit={submitForm}>
                <h1 className='text-center'>User Profile</h1>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input onChange={inputHandler} value={user.name} type="text" className="form-control" name='name' id="name" />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input onChange={inputHandler} value={user.email} type="email" className="form-control"  name='email' id="email" aria-describedby="emailHelp" disabled />
                </div>
                <div className="mb-3">
                  <label htmlFor="phone" className="form-label">Phone</label>
                  <input onChange={inputHandler} value={user.phone} type='number' min={10} maxLength={10}  className="form-control" name='phone' id="phone" aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input onChange={inputHandler} type="password" className="form-control"  name='password' id="password" />
                </div>
                <div className="mb-3">
                  <label htmlFor="address" className="form-label">Address</label>
                  <input onChange={inputHandler} type="text" value={user.address} className="form-control"  name='address' id="address" />
                </div>
                <center> <button type="submit" className="btn btn-primary">Update Profile</button></center>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Profile
