const express = require('express');
const app = express();
const cors = require('cors');
const authRouter = require('./routes/index'); // Authentication routes // Product routes
require('dotenv').config(); // Load environment variables
require('./models/Db'); // Database connection
const path = require('path'); // To work with file paths
const PORT = process.env.PORT || 8080;

require('dotenv').config();

const bodyParser = require('body-parser');


app.use(bodyParser.json());
// Middleware
app.use(cors()); // Enable cross-origin requests
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies (form data)

// Routes
app.use('/auth',authRouter); // Authentication routes
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// 404 fallback route for undefined routes
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
