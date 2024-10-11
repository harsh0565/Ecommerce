import slugify from "slugify";
import CategoryModel from "../models/CategoryModel.js";

export const createCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.send({
        success: false,
        message: "name is required",
      });
    }
    const existingCategory = await CategoryModel.findOne({ name });
    if (existingCategory) {
      return res.status(200).send({
        success: true,
        message: "Category already exist",
      });
    }
    const category = await new CategoryModel({
      name,
      slug: slugify(name),
    }).save();
    res.status(201).send({
      success: true,
      message: " new category added",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category",
      error,
    });
  }
};

// update category
export const updateCategoryController = async (req, res) => {
  try {
    const { name } = req.body;
    const { id } = req.params;
    // console.log(name, id);
    const category = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug: slugify(name) },
      { new: true }
    );
    res.status(200).send({
      success: true,
      message: " Category Updated Successfully",
      category,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error in Category",
      error,
    });
  }
};


export const categoryController =async(req,res)=>{
    try {
        const category = await CategoryModel.find({});
        res.status(200).send({
            success: true,
            message: "All Category list",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error while getting Category",
          error,
        });
    }
}

export const singleCategoryController = async(req,res)=>{
    try {
        // const {id} = req.params;
        const category = await CategoryModel.find({slug: req.params.slug});
        res.status(200).send({
            success: true,
            message: "Get single category Successfully",
            category
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Error while getting a single Category",
          error,
        });
    }
}

export const deleteCategoryController =async(req,res)=>{
try {
    const {id} = req.params;
    await CategoryModel.findByIdAndDelete(id);

    res.status(200).send({
        success: true,
        message:"Category Deleted Successfully"
    })
    
} catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error while deleting Category",
      error,
    });
}
}