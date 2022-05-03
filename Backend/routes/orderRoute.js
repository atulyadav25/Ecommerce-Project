const express = require('express');
const { newOrder, myOrders, getSingleOrder, getAllOrders, updateOrder, deleteOrder } = require('../controllers/orderController');
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require('../middleware/authentication');


router.post("/order/new",isAuthenticatedUser,newOrder); // Create A New Order
router.get("/orders/me",isAuthenticatedUser,myOrders); // Get All orders of logged in user
router.get("/order/:id",isAuthenticatedUser,getSingleOrder); //Get Single Order Detail
router.get("/admin/orders",isAuthenticatedUser,authorizeRoles("admin"),getAllOrders)  // Get All Orders -- Admin
router.put("/admin/order/:id",isAuthenticatedUser,authorizeRoles("admin"),updateOrder)  // Update Orders -- Admin
router.delete("/admin/order/:id",isAuthenticatedUser,authorizeRoles("admin"),deleteOrder)  // Delete Orders -- Admin


module.exports = router;