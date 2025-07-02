const multer=require('multer');
const path=require('path');
const fs=require('fs');

const uploadPath=path.join(__dirname,'../upload');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const ext = path.extname(file.originalname); 
    cb(null, 'user-' + uniqueSuffix + ext);      
  }
});

const upload = multer({ storage });

module.exports = upload;