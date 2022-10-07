// const multer = require("multer");

// // const uploadDirectory = path.join('uploads');

// const maxSizeFile = 2 * 1024 * 1024;

// const storage = multer.memoryStorage({
//   // destination: function (req, file, cb) {
//   //   cb(null, uploadDirectory)
//   // },

//   filename: function(req, file, cb) {
//     const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
//     cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
//   }
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: function (req, file, cb) {
//     if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//       cb(null, true)
//     } else {
//       cb('format file for the image must be png, jpg, or jpeg', false);
//     }
//   },

//   limits: { fileSize: maxSizeFile }
// }).single('image')

// module.exports = upload;

const multer = require("multer");

// Mendefinisikan gimana cara nyimpen file-nya
const storage = multer.memoryStorage();

// Membuat upload middleware
module.exports = multer({ storage });

