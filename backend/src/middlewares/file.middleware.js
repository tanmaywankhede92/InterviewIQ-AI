const multer = require("multer");

const storage = multer.memoryStorage({
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});

exports.upload = multer({ storage });
