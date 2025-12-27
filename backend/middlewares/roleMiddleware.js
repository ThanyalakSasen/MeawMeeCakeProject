exports.isCustomer = (req, res, next) => {
    if (req.user?.role_type === "customer") {
      return next();
    }
    res.status(403).json({ message: "Customer only" });
  };
  
  exports.isEmployee = (req, res, next) => {
    if (req.user?.role_type === "employee") {
      return next();
    }
    res.status(403).json({ message: "Employee only" });
  };
  
  exports.isOwner = (req, res, next) => {
    if (req.user?.role_type === "employee" && req.user?.refId?.role === "Owner") {
      return next();
    }
    res.status(403).json({ message: "Owner only" });
  };