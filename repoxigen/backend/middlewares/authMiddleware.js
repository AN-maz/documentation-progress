import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // console.log("Headers diterima:", req.headers);
  // console.log("Auth Header:", authHeader);

  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({
      status: false,
      message: "Akses ditolak! kamu belum login (Token tidak ada)",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({
        status: false,
        message: "Token tidak valid atau kadaluarsa",
      });
    }

    req.user = decoded;
    next();
  });
};

export const onlyAdmin = (req, res, next) => {
  const allowedRoles = ["super_admin", "adminDivisi", "bph"];

  if (!allowedRoles.includes(req.user.role)) {
    return res.status(403).json({
      status: false,
      message: "Akses ditolak! Area Admin Only!",
    });
  }
  next();
};
