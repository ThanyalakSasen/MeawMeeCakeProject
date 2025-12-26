const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");

const userSchema = new Schema({
    user_fullname : {type: String, require},
    email: { type:String, require },
    password: { type: String | null, require },
    googleId: { type: String | null, require },
    provider: { type: String, Enum: "Owner"|"Customer"|"Employee", require },
    user_birthdate: { type:Date },
    user_phone: { type: String, require },
    user_img: { type: String | null},
    user_allergies: { type: Array | null },
    //employee_position: { type: String, require},
    employee_position: {
      type: Schema.Types.ObjectId,
      ref: "Positions",
      required: function () {
        return this.provider === "Employee";
      }
    },    
    start_working_date: { type: Date, require },
    last_working_date: { type: Date | null, require },
    employment_type: { type: String, Enum: "Full-time" | "Part-time", require  },
    employee_salary: { type: Number, require},
    employee_status: { type: String, Enum: "Active" | "Probation" | "Resigned" | "Terminated" },
    // "Active"  ทำงาน| "Probation"  ทดลองงาน| "Resigned" ลาออก | "Terminated" เลิกจ้าง
    isActive : { type: Boolean, default: true }, //เอาไว้ SoftDelete
    deletedAt : { type: Date, default: null },
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