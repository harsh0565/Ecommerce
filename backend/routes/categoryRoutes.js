import express from "express"
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";
import { categoryController, createCategoryController, deleteCategoryController, singleCategoryController, updateCategoryController } from "../controllers/categoryController.js";
const router = express.Router();




router.post("/create-category" , requiredSignIn , isAdmin , createCategoryController );

router.put("/update-category/:id" , requiredSignIn ,isAdmin ,updateCategoryController )

router.get("/get-category" , categoryController)
router.get("/single-category/:slug" , singleCategoryController)
router.delete("/delete-category/:id" , requiredSignIn ,isAdmin ,deleteCategoryController )

export default router;