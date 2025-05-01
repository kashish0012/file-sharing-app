const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/database');
const fileRoute = require('./routes/fileRoute');

const app = express();
dotenv.config();    

//DB connection
const mongoUrl = process.env.MONGODB_URL;
connectDB(mongoUrl);

// Middleware
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use(express.static('public'));

// Routes
app.use('/', fileRoute);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port http://localhost:${PORT}`);
});