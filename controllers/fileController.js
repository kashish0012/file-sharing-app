const File = require('../models/File');
const bcrypt = require('bcryptjs');

const handleUpload = async (req, res) => {
    const { originalname, path } = req.file;
    const { password } = req.body;

    const fileData = {
        path,
        originalName: originalname,
    };
    if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        fileData.password = hashedPassword;
    }

    const file = await File.create(fileData);
    res.render('download', { fileLink: `${req.headers.origin}/file/${file._id}` });
};

const handleDownload = async (req, res) => {
    const file = await File.findById(req.params.id);
    if (!file) {
        return res.render('error', { message: 'File not found' });
    }

    if (file.password) {
        if (req.method === 'GET') {
            return res.render('password', { fileId: file._id, error: false });
        }

        const isValidPassword = await bcrypt.compare(req.body.password, file.password);
        if (!isValidPassword) {
            return res.render('password', { fileId: file._id, error: true });
        }
    }

    file.downloadCount++;
    await file.save();
    res.download(file.path, file.originalName);
};

module.exports = {
  handleUpload,
  handleDownload
};
