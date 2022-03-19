const express = require("express");
const { registerUser, loginUser, logout, forgetPassword, resetPassword, getUserDetails, updatePassword, updateProfile, getAllUser, getSingleUser, updateRole, deleteUser } = require("../controller/userController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");
const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/password/forget").post(forgetPassword);
router.route("/password/reset/:token").put(resetPassword);
router.route("/logout").get(logout);
router.route("/me").get(isAuthenticatedUser, getUserDetails);
router.route("/password/update").put(isAuthenticatedUser, updatePassword);
router.route("/me/update").put(isAuthenticatedUser, updateProfile);
router.route("/admin/users").get(isAuthenticatedUser, authorizeRoles("admin"), getAllUser)
router.route("/admin/user/:id").get(isAuthenticatedUser, authorizeRoles("admin"), getSingleUser).put(isAuthenticatedUser, authorizeRoles("admin"), updateRole).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteUser);
// router.route("admin/user/:id").get(isAuthenticatedUser,authorizeRoles("admin"),get)
module.exports = router;