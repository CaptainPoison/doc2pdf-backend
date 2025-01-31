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
  let pdfPath = null;
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
    pdfPath = await convertToPdf(file.path);

    // Send the converted PDF to the client
    res.download(pdfPath, "converted.pdf", (err) => {
      if (err) {
        console.error("Error sending file:", err);
        return;
      }

      // Clean up temporary files after the file is successfully downloaded
      fs.unlink(file.path, (unlinkErr) => {
        if (unlinkErr) console.error(`Failed to delete uploaded file: ${unlinkErr}`);
      });
      fs.unlink(pdfPath, (unlinkErr) => {
        if (unlinkErr) console.error(`Failed to delete PDF: ${unlinkErr}`);
      });
    });
  } catch (err) {
    console.error("Error converting file:", err);
    res.status(500).send("Error converting file.");
  }
});

// Health Check Endpoint
app.get("/", (req, res) => {
  res.send("Word-to-PDF converter backend is running.");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Backend is listening on port ${PORT}`);
});
