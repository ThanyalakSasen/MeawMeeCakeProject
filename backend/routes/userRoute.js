const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Customer
router.post("/customer", userController.createCustomer);
router.get("/customer/:id", userController.getCustomerById);
router.put("/customer/:id", userController.updateCustomer);

// Employee
router.post("/employee", userController.createEmployee);
router.get("/employee", userController.getAllEmployee);
router.get("/employee/:id", userController.getEmployeeById);
router.put("/employee/:id", userController.updateEmployee);
router.delete("/employee/:id", userController.deleteEmployee);

module.exports = router;
