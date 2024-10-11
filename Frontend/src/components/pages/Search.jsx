import React from 'react'
import Layout from '../Layout/Layout'
import { useSearch } from '../context/Search'

const Search = () => {
    const [values, setValues] = useSearch();
    return (
        <div>
            <Layout title={"Search Results"}>
                <div className="container">
                    <div className="text-center">
                        <h1>Search Results</h1>
                        <h6>
                            {values?.results.length < 1
                                ? "No Products Found"
                                : `Found ${values?.results.length} products`}
                        </h6>

                        <div className="d-flex flex-wrap mt-5">
                            {values?.results.map((p, index) => (

                                <div className="card m-2" style={{ width: "18rem" }} key={p._id}>
                                    <img src={`${import.meta.env.VITE_API_URL}/api/v1/product/product-photo/${p._id}`} className="card-img-top product-photo" alt={p.name} />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text"> {p.description.substring(0, 25)}...</p>
                                        <p className="card-text"> ${p.price}</p>
                                        <button className='btn btn-primary ms-1'>More Details</button>
                                        <button className='btn btn-secondary ms-1'>Add to cart</button>
                                    </div>
                                </div>

                            )
                            )}
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
    );
}

export default Search;
