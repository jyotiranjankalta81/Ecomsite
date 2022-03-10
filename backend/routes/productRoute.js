const express = require("express");
const router = express.Router();
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require("../controller/productController");
const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");

router.route("/products").get(isAuthenticatedUser, getAllProducts);
router.route("/products/new").post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);
router.route("/product/:id").put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct).delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct).get(getProductDetails);


module.exports = router