# 📁 File Sharing Application

A simple and secure file-sharing application built using **Node.js**, **Express**, **MongoDB**, **Multer**, **Bcrypt**, and **EJS**. This app allows users to upload files, optionally protect them with a password, and share download links securely.

---

## 🚀 Features

- Upload files with optional password protection
- Password-encrypted file downloads
- Track download count for each file
- Simple and responsive UI using EJS templates
- Input validation and error handling

---

## 🛠️ Technologies Used

- **Node.js** – Runtime environment
- **Express.js** – Web framework
- **MongoDB** – Database for file metadata
- **Mongoose** – MongoDB ODM
- **Multer** – Middleware for handling file uploads
- **Bcrypt** – Password hashing
- **EJS** – Templating engine

---

## 📦 Installation

```bash
git clone https://github.com/your-username/file-sharing-app.git
cd file-sharing-app
npm install
```
## ⚙️ Environment Setup

```env
PORT=ENTER PORT
MONGODB_URI=ENTER YOUR DB URL
```

## 🔧 Running the App

```bash
npm start
```
App will run on: `http://localhost:3000`

## 🧪 How It Works

- Upload a file through the UI.
- Optionally set a password for the file.
- A shareable link is generated.
- Clicking the link:
    -- Prompts for a password if required
    -- Validates it and starts the download
- Download count is updated.

## 📁 Project Structure

```bash
file-sharing-app/
│
├── uploads/                # Uploaded files stored here
├── views/                  # EJS templates
│   ├── index.ejs
│   ├── success.ejs
│   ├── password.ejs
│   └── error.ejs
├── public/                 # Static assets (CSS, etc.)
│   └── styles.css
├── models/
│   └── File.js             # Mongoose schema for files
├── .env
├── index.js                # Main server file
└── README.md
```

## 🛡️ Security

- Passwords are hashed with Bcrypt before storing
- Password prompts are handled securely
- Input data is validated
- Errors are handled gracefully

## 🤝 Contributing

Feel free to fork the repo and submit PRs. Suggestions and improvements are always welcome!