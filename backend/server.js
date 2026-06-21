const express = require("express");
const cors = require("cors");
require("dotenv").config();
const errorHandler=
require("./middleware/errorHandler");

const connectDB = require("./config/db");

const liftRoutes = require("./routes/liftRoutes");
const requestRoutes = require("./routes/requestRoutes");

const { startScheduler } = require("./scheduler/Scheduler");

const app = express();
const activityLogRoutes = require("./routes/activityLogRoutes");
const notificationRoutes = require("./routes/notificationRoutes");
const analyticsRoutes = require("./routes/analyticsRoutes");
const maintenanceRoutes = require("./routes/maintenanceRoutes");

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/lifts", liftRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/activity-logs", activityLogRoutes);

app.use("/api/notifications", notificationRoutes);

app.use("/api/analytics", analyticsRoutes);
app.use("/api/maintenance", maintenanceRoutes);

// Health Check
app.get("/", (req, res) => {
    res.send("Smart Lift Tracking Backend Running");
});

const PORT = process.env.PORT || 5000;
app.use(errorHandler);

// Start Server
const startServer = async () => {
    try {
        // Connect Database
        await connectDB();

        // Start Lift Scheduler
        startScheduler();

        // Start Express Server
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });

    } catch (error) {
        console.error("Failed to start server:", error);
        process.exit(1);
    }
};

startServer();