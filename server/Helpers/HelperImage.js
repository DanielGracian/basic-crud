const multer = require( 'multer');

exports.fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, '../images');
  },
  filename: (req, file, cb) => {
      data = new Date().toISOString().split('T')[0] + '_' + file.originalname;
      cb(null, data);
    }
});

exports.fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' ) {
      cb(null, true);
  } else {
      cb(null, false);
  }
};

exports.postimage = (req, res, next) => {
  try {
    res.status(200).json({
      data: data,
      img: 'https:' + path.join(__dirname, 'images')
    });
  } catch (err) {
    const error = 'Malformed path postimage!';
    next(error);
  }
};