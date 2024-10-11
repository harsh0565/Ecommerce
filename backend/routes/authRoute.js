import express from "express";
import { AllOrderController, forgotPasswordController, loginController, orderController, orderStatusController, registerController, testController, updateProfileController } from "../controllers/authController.js";
import { isAdmin, requiredSignIn } from "../middlewares/authMiddleware.js";


const router = express.Router();

router.post("/register" , registerController);
router.post("/login",loginController);

router.post("/forgot-password" , forgotPasswordController);

router.get("/test", requiredSignIn,isAdmin,testController);
router.get("/user-auth" , requiredSignIn, (req,res)=>{
    res.status(200).send({
        ok: true
    })
})

router.get("/admin-auth", requiredSignIn , isAdmin , (req,res)=>{
    res.status(200).send({
        ok:true
    })
})

router.put("/profile" , requiredSignIn , updateProfileController)

router.get("/orders" , requiredSignIn, orderController);

router.get("/all-orders" , requiredSignIn,isAdmin, AllOrderController);

router.put("/order-status/:orderId" , requiredSignIn , isAdmin ,orderStatusController  )

export default router;