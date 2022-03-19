const Order = require("../models/orderModel");
const Product = require("../models/productModels");
const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const { populate } = require("../models/orderModel");


exports.newOrder = catchAsyncErrors(async (req, res, next) => {
    const { shippingInfo, orderItems, paymentInfo, itemsPrice, taxPrice, shippingPrice, totalPrice, } = req.body;

    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    });
    res.status(201).json({
        sucess: true,
        order,
    });
});

// get Single Order
exports.getSingleOrder = catchAsyncErrors(async (req, res, next) => {

    // populate give user name and mail id by using the user id
    const order = await Order.findById(req.params.id).populate("user", "name email");

    if (!order) {
        return next(new ErrorHander("Order not found with the Id", 404));
    }

    res.status(200).json({
        sucess: true,
        order,
    });
});

// get Logged in Order
exports.myOrders = catchAsyncErrors(async (req, res, next) => {

    // populate give user name and mail id by using the user id
    const orders = await Order.find({ user: req.user._id });

    res.status(200).json({
        sucess: true,
        orders,
    });
});

// get all Order --> admin
exports.getAllOrders = catchAsyncErrors(async (req, res, next) => {

    // populate give user name and mail id by using the user id
    const orders = await Order.find();

    let totalAmount = 0;

    orders.forEach(orders => {
        totalAmount += orders.totalPrice;
    });

    res.status(200).json({
        sucess: true,
        totalAmount,
        orders,
    });
});

// update Order Status --Admin
exports.updateOrder = catchAsyncErrors(async (req, res, next) => {

    // populate give user name and mail id by using the user id
    const order = await Order.findById(req.params.id);

    if (!order) {
        return next(new ErrorHander("Order not found with this id", 404));

    }

    if (order.orderStatus === "Delivered") {
        return next(new ErrorHander("You have already delivered this order", 400));
    }

    order.orderItems.forEach(async (order) => {
        await updateStock(order.Product, order.quantity);
    });

    order.orderStatus = req.body.status;

    if (req.body.status == "Delivered") {
        order.deliveredAt = Date.now();

    }

    await order.save({ validateBeforeSave: false });

    res.status(200).json({
        sucess: true,
        order,
    });
});

async function updateStock(id, quantity) {
    const product = await Product.findById(id);

    product.Stock = quantity;
    await product.save({ validateBeforeSave: false });

}

// delete Order --Admin
exports.deleteOrder = catchAsyncErrors(async (req, res, next) => {

    // populate give user name and mail id by using the user id
    const orders = await Order.findById(req.params.id);

    if (!orders) {
        return next(new ErrorHander("Order not found with this id", 404));

    }

    await orders.remove();

    res.status(200).json({
        sucess: true,
        orders,
    });
});