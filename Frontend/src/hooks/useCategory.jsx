import axios from 'axios';
import React, { useEffect, useState } from 'react'

export const useCategory = () => {
    const [categories,setCategories] = useState([]);
    const getCategories = async()=>{
        try {
            const {data} = await axios.get(`${import.meta.env.VITE_API_URL}/api/v1/category/get-category`)
            setCategories(data?.category);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(()=>{
        getCategories();
    },[])
    return categories
}

