const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { convertToPdf } = require("./converters/libreoffice");

const app = express();
const PORT = process.env.PORT || 3001;

// Configure Multer for file uploads
const upload = multer({ dest: "uploads/" });

// Use CORS middleware to allow frontend to access the backend
app.use(cors({
  origin: 'https://doc2pdf-frontend.onrender.com', // Allow only your frontend URL to access
}));

app.use(express.json());

// API Endpoint: Convert Word Document to PDF
app.post("/convert", upload.single("file"), async (req, res) => {
  try {
    const file = req.file;

    if (!file) {
      return res.status(400).send("No file uploaded.");
    }

    // Ensure the uploaded file is a .doc or .docx
    const allowedExtensions = [".doc", ".docx"];
    const fileExtension = path.extname(file.originalname).toLowerCase();
    if (!allowedExtensions.includes(fileExtension)) {
      return res.status(400).send("Only .doc and .docx files are supported.");
    }

    // Convert the Word document to PDF
    const pdfPath = await convertToPdf(file.path);

    // Send the converted PDF to the client
    res.download(pdfPath, "converted.pdf", (err) => {
      if (err) console.error(err);

      // Clean up temporary files
      fs.unlinkSync(file.path);
      fs.unlinkSync(pdfPath);
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error converting file.");
  }
});

// Health Check Endpoint
app.get("/", (req, res) => {
  res.send("Word-to-PDF converter backend is running.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
