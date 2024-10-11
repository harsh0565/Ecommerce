import express from "express"
import { createProductController, deleteProductController, getProductController, getSingleProductController, paymentController, productCategoryController, productCountController, productFilterController, productListController, productPhotoController, productSearchController, relatedProductController, updateProductController } from "../controllers/productController.js";
import { isAdmin, requiredSignIn } from './../middlewares/authMiddleware.js';
import formidable from "express-formidable"
const router = express.Router();




router.post("/create-product" , requiredSignIn , isAdmin ,formidable(), createProductController );
router.get("/get-product" , getProductController );
router.get("/get-product/:slug" , getSingleProductController );

// get photo
router.get("/product-photo/:pid" , productPhotoController)

router.put("/update-product/:pid" , requiredSignIn , isAdmin ,formidable(), updateProductController );
// delete product
router.delete("/delete-product/:pid" , deleteProductController);


//  filter products
router.post("/product-filters" , productFilterController);

//  product count
router.get("/product-count" , productCountController);
router.get("/product-list/:page" , productListController);
router.get("/search/:keyword" , productSearchController);

// similar product
router.get("/related-product/:pid/:cid" , relatedProductController)

// category wise product

router.get("/product-category/:slug" ,productCategoryController )
router.post("/payment" , requiredSignIn , paymentController);



export default router;