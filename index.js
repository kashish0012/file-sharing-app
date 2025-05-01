const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const multer = require('multer');
const bcrypt = require('bcryptjs');
const File = require('./models/File');

const app = express();
dotenv.config();    

//DB connection
const mongoUrl = process.env.MONGODB_URL;
const connectDB = async () => {
    try {
        await mongoose.connect(mongoUrl);
        console.log('MongoDB connected...');
    } catch (error) {
        console.error('MongoDB connection error:', error);
    }
}
connectDB();

// Middleware
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/uploads', express.static('uploads'));
app.use(express.static('public'));

//Multer setup
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 1000000 * 100 }, // 100MB
});

// Routes
app.get('/', (req, res) => {
    res.render('index', { error: false });
});

app.post('/upload', upload.single('file'), async (req, res) => {
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
});

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

app.route("/file/:id")
    .get(handleDownload)
    .post(handleDownload);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});