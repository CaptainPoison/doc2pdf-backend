const { exec } = require("child_process");
const path = require("path");

const convertToPdf = (inputPath) => {
  return new Promise((resolve, reject) => {
    const outputPath = path.join("uploads", `${path.basename(inputPath, path.extname(inputPath))}.pdf`);
    console.log(`Converting to: ${outputPath}`);

    // Run LibreOffice in headless mode to convert the file
    const command = `libreoffice --headless --convert-to pdf --outdir uploads ${inputPath}`;
    exec(command, (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return reject("Conversion failed.");
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }

      console.log(`PDF saved to: ${outputPath}`);
      resolve(outputPath);
    });
  });
};

