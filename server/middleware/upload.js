import multer from "multer";

// store in memory (we will later upgrade to cloud)
const storage = multer.memoryStorage();

const upload = multer({ storage });

export default upload;