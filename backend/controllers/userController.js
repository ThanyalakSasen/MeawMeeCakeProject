const UserModel = require("../models/usersModel");
//ให้ตรวจสอบ ObjectId
const mongoose = require("mongoose");

/* ===================== HELPER ===================== */
//ฟังก์ชันช่วยเช็คว่า id ที่ส่งมาถูกต้องตามรูปแบบของ MongoDB หรือไม่
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id);

/* ===================== CREATE CUSTOMER ===================== */
exports.createCustomer = async (req, res) => {
  try {
    const {
      user_fullname,
      email,
      password,
      user_birthdate,
      user_phone,
      user_img,
      user_allergies
    } = req.body;

    const existEmail = await UserModel.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const customer = new UserModel({
      user_fullname,
      email,
      password,
      provider: "Customer",
      user_birthdate,
      user_phone,
      user_img,
      user_allergies
    });

    await customer.save();

    const result = customer.toObject();
    delete result.password;

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===================== CREATE EMPLOYEE ===================== */
exports.createEmployee = async (req, res) => {
  try {
    const {
      user_fullname,
      email,
      password,
      user_birthdate,
      user_phone,
      user_img,
      employee_position,
      start_working_date,
      employment_type,
      employee_salary,
      employee_status
    } = req.body;

    const existEmail = await UserModel.findOne({ email });
    if (existEmail) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const employee = new UserModel({
      user_fullname,
      email,
      password,
      provider: "Employee",
      user_birthdate,
      user_phone,
      user_img,
      employee_position,
      start_working_date,
      employment_type,
      employee_salary,
      employee_status
    });

    await employee.save();

    const result = await UserModel.findById(employee._id)
      .populate("employee_position")
      .select("-password");

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===================== GET EMPLOYEE BY ID ===================== */
exports.getEmployeeById = async (req, res) => {
  try {
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const employee = await UserModel.findOne({
      _id: req.params.id,
      provider: "Employee",
      isActive: true
    })
      .populate("employee_position")
      .select("-password");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===================== GET CUSTOMER BY ID ===================== */
exports.getCustomerById = async (req, res) => {
  try {
    //ตรวจว่า id เป็นรูปแบบ ObjectId ของ MongoDB หรือไม่
    if (!isValidObjectId(req.params.id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const customer = await UserModel.findOne({
      _id: req.params.id,
      provider: "Customer",
      isActive: true
    }).select("-password");

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===================== GET ALL EMPLOYEES (Pagination) ===================== */
exports.getAllEmployee = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1; //defualt เป็น 1
    const limit = Number(req.query.limit) || 10; //defualt เป็น 10
    const skip = (page - 1) * limit;
    //แสดงพนักงานทีละหน้า
    //ดึงเฉพาะพนักงานที่ยัง active

    const employees = await UserModel.find({
      provider: "Employee",
      isActive: true
    })
      .populate("employee_position")
      .select("-password")
      .skip(skip)
      .limit(limit);

      //นับจำนวนพนักงานทั้งหมด
    const total = await UserModel.countDocuments({
      provider: "Employee",
      isActive: true
    });

    //res.redirect
    res.status(200).json({
      total,
      page,
      limit,
      data: employees
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===================== UPDATE CUSTOMER ===================== */
exports.updateCustomer = async (req, res) => {
  try {
    delete req.body.password;

    const customer = await UserModel.findOneAndUpdate(
      { _id: req.params.id, provider: "Customer" },
      req.body,
      { new: true }
    ).select("-password");

    if (!customer) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.status(200).json(customer);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===================== UPDATE EMPLOYEE ===================== */
exports.updateEmployee = async (req, res) => {
  try {
    delete req.body.password;

    const employee = await UserModel.findOneAndUpdate(
      { _id: req.params.id, provider: "Employee" },
      req.body,
      { new: true }
    )
      .populate("employee_position")
      .select("-password");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===================== SOFT DELETE EMPLOYEE ===================== */
exports.softDeleteEmployee = async (req, res) => {
  try {
    const employee = await UserModel.findOneAndUpdate(
      { _id: req.params.id, provider: "Employee" },
      { isActive: false, deletedAt: new Date() },
      { new: true }
    ).select("-password");

    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===================== RESTORE EMPLOYEE ===================== */
exports.restoreEmployee = async (req, res) => {
  try {
    const employee = await UserModel.findOneAndUpdate(
      { _id: req.params.id, provider: "Employee" },
      { isActive: true, deletedAt: null },
      { new: true }
    ).select("-password");

    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===================== HARD DELETE EMPLOYEE ===================== */
exports.deleteEmployee = async (req, res) => {
  try {
    const employee = await UserModel.findOneAndDelete({
      _id: req.params.id,
      provider: "Employee"
    });

    res.status(200).json(employee);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
