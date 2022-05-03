const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetail, createProductReview, deleteProductReview, getProductReviews, getAdminProducts } = require('../controllers/productController');
const { isAuthenticatedUser ,authorizeRoles} = require('../middleware/authentication');

const router = express.Router();



router.get("/products", getAllProducts) // Get all Proucts Route
router.get("/admin/products", isAuthenticatedUser,authorizeRoles("admin"),getAdminProducts)
router.post("/admin/product/new", isAuthenticatedUser,authorizeRoles("admin"), createProduct) // Create Product Route -- Admin
router.put("/admin/product/:id", isAuthenticatedUser,authorizeRoles("admin"), updateProduct) // Update product -- Admin
router.delete("/admin/product/:id", isAuthenticatedUser,authorizeRoles("admin"), deleteProduct) // Delete Product -- Admin
router.get("/product/:id", getProductDetail) //Get a single Product Detail 


router.put("/review",isAuthenticatedUser, createProductReview) // Create A Review
router.get("/reviews", getProductReviews) // Get A Porduct Review
router.delete("/reviews",isAuthenticatedUser, deleteProductReview) // Delete A Review



module.exports = router; 