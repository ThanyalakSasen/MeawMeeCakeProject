const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({

    
    isActive: { type: Boolean, default: true },
    deletedAt: { type: Date, default: null }, // เริ่มต้นเป็น null
  },
  {
    timestamps: true, // ช่วยสร้าง createdAt และ updatedAt ให้โดยอัตโนมัติ
  }
);

// Middleware สำหรับ Hash Password ก่อนบันทึก
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

module.exports = mongoose.model("users", userSchema);