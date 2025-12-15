const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

const http = require('http');
const { Server } = require('socket.io');
const User = require('./models/User');

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:5173", // Startup frontend URL
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Socket.io Logic
io.on('connection', (socket) => {
    console.log('New client connected:', socket.id);

    socket.on('register', async (firebaseUid) => {
        if (!firebaseUid) return;
        try {
            // Find user by firebaseUid since that's what the client sends
            const user = await User.findOne({ firebaseUid });
            if (user) {
                user.isOnline = true;
                await user.save();

                // Broadcast using Mongo ID so frontend can map easily
                io.emit('user_status_changed', { userId: user._id, isOnline: true });

                // Store Mongo ID in socket for disconnect handling
                socket.userId = user._id;
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    });

    socket.on('disconnect', async () => {
        console.log('Client disconnected:', socket.id);
        if (socket.userId) {
            try {
                await User.findByIdAndUpdate(socket.userId, {
                    isOnline: false,
                    lastSeen: new Date()
                });
                io.emit('user_status_changed', { userId: socket.userId, isOnline: false });
            } catch (error) {
                console.error('Error updating status on disconnect:', error);
            }
        }
    });
});

app.get('/', (req, res) => {
    res.send('CuriousMind API is running...');
});

app.get('/api/health', (req, res) => {
    res.json({ message: 'Connected' });
});

// Routes
app.use('/api/auth', require('./routes/authRoutes'));

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
