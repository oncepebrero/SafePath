import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

// Initialize dotenv
dotenv.config();

// Create an instance of express
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.static(path.join(process.cwd(), 'public')));
app.set('view engine', 'ejs');

// Routes
import indexRouter from './routes/index.js';
import reportRouter from './routes/report.js'; 
import adminRoutes from './routes/admin.js'; 
import loginRoutes from './routes/login.js'; 
import feedbackRouter from './routes/feedback.js'; // Adjust the path if necessary
import statusRouter from './routes/status.js'; // Ensure the path is correct

app.use('/', indexRouter); 
app.use('/report', reportRouter); 
app.use('/admin', adminRoutes);
app.use('/', loginRoutes);
app.use('/user', feedbackRouter); 
app.use('/admin/dashboard', statusRouter); // Correct usage of statusRoutes

// API endpoint to report a complaint
app.post('/report', (req, res) => {
    const { complaintId, studentId } = req.body;
    const activity = `New complaint submitted by Student ID ${studentId}. Complaint ID ${complaintId}.`;
    recentActivities.push(activity);
    res.send({ message: 'Complaint reported!', activities: recentActivities });
});

// API endpoint to update complaint status
app.post('/update-status', (req, res) => {
    const { complaintId, status } = req.body;
    const activity = `Complaint ID ${complaintId} status changed to ${status}.`;
    recentActivities.push(activity);
    res.send({ message: 'Status updated!', activities: recentActivities });
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
