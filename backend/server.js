const express = require("express");
const cors = require("cors");
require("dotenv").config();
const liftRoutes = require("./routes/liftRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("Smart Lift Tracking Backend Running");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

const connectDB = require("./config/db");

connectDB();

app.use("/api/lifts", liftRoutes);