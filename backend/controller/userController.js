const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncError");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");
const crypto = require("crypto");
// const { rawListeners } = require("../models/userModel");
const sendEmail = require("../utils/sendEmail.js");


// Register a User
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;

    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: "this is a sample id",
            url: "profilepicurl",
        },
    });
    sendToken(user, 201, res);
});

// Login User
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHander("Please Enter valid id & Password", 400));
    }

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHander("Invalid email or password", 401));
    }
    const isPasswordMatched = user.comparePassword();

    if (!isPasswordMatched) {
        return next(new ErrorHander("Invalid email or password", 401));

    }

    sendToken(user, 200, res);
});

// Logout User
exports.logout = catchAsyncErrors(async (req, res, next) => {
    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    });


    res.status(200).json({
        sucess: true,
        message: "Logged Out"
    });
});

// forget password
exports.forgetPassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
        return next(new ErrorHander("User not Found", 404));


    }
    // Get resetPassword Token
    const resetToken = user.getResetPasswordToken();

    await user.save({ validateBeforeSave: false })

    const resetPasswordUrl = `${req.protocol}://${req.get("host")}/api/v1/password/reset/${resetToken}`
    const message = `Your password reset token is:- \n\n ${resetPasswordUrl} \n\n if you have not requested this email then,Please ignore it`;


    try {
        await sendEmail({
            email: user.email,
            subject: `Ecommerce Password Recovery`,
            message,

        });

        res.status(200).json({
            sucess: true,
            message: `Email sent to ${user.email} successfully`,
        })


    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({ validateBeforeSave: false });
        return next(new ErrorHander(error.message, 500));

    }
});

// Reset Password
exports.resetPassword = catchAsyncErrors(async (req, res, next) => {
    // creating token hash
    const resetPasswordToken = crypto.createHash("sha256").update(req.params.token).digest("hex");
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() },
    });
    if (!user) {
        return next(new ErrorHander("Reset Password token is invalid or has been expaired", 400));

    }
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHander("Password does not password", 400));

    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res);

});

// Get User Detail
exports.getUserDetails = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id);


    res.status(200).json({
        sucess: true,
        user,
    });
});


// update User password
exports.updatePassword = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select("+password");

    const isPasswordMatched = user.comparePassword(req.body.oldPassword);

    if (!isPasswordMatched) {
        return next(new ErrorHander("Old Password is incorrect", 400));

    }

    if (req.body.newPassword !== req.body.confirmPassword) {
        return next(new ErrorHander("password not match", 400));

    }

    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res);


    res.status(200).json({
        sucess: true,
        user,
    });
});
