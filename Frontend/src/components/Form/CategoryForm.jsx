import React from 'react'

const CategoryForm = (props) => {
    const {handleSubmit , value , setValue} = props;
    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <input type="text" class="form-control" placeholder='Enter new category' value={value} onChange={((e)=> setValue(e.target.value))} />
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default CategoryForm
