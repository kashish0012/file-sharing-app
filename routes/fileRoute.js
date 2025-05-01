const express = require('express');
const multer = require('multer');
const { handleUpload, handleDownload } = require('../controllers/fileController');

const router = express.Router();

//Multer setup
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 1000000 * 100 }, // 100MB
});

router.get('/', (req, res) => {
  res.render('index', { error: false });
});

router.post('/upload', upload.single('file'), handleUpload);

router.route('/file/:id')
  .get(handleDownload)
  .post(handleDownload);

module.exports = router;