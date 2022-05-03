const Order = require("../models/orderModel");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utiles/errorhandler");
const Product = require("../models/productModel");




// Create New Order
exports.newOrder = catchAsyncErrors(async (req, res, next) => {

    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body;

    const order = await Order.create({ shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, paidAt: Date.now(), user: req.user._id });

    res.status(201).json({
        success: true,
        order,
    })


})







// Get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {


    const order = await Order.findById(req.params.id).populate("user", "name email")

    if (!order) {
        return next(new ErrorHandler("Order Not Found with this Id", 404))
    }

    res.status(200).json({
        success: true,
        order,
    })


})








// Get Login User Order
exports.myOrders = catchAsyncErrors(async (req, res, next) => {


    const orders = await Order.find({ user: req.user._id })

    res.status(200).json({
        success: true,
        orders
    })


})







// Get All Orders  --Admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {


    const orders = await Order.find()

    let totalAmount = 0;
    orders.forEach(order => {
        totalAmount += order.totalPrice;
    })

    res.status(200).json({
        success: true,
        totalAmount,
        orders,
    })


})







// Update Order Status --Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {


    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order Not Found with this Id", 404))
    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHandler("You have already delivered this Order", 400))
    }

    if (req.body.status === "Shipped") {
    order.orderItems.forEach(async (order) => {
        await updateStock(order.product, order.quantity)
    });
    }

    order.orderStatus = req.body.status;

    order.deliveredAt = Date.now();

    if (req.body.status === "Delivered") {
        order.deliveredAt = Date.now();

    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        order,
    })


})

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.stock = product.stock - quantity;

    await product.save({ validateBeforeSave: false });

}







// Delete Order  --Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {


    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHandler("Order Not Found with this Id", 404))
    }

    await order.remove()
    res.status(200).json({
        success: true
    })


})

