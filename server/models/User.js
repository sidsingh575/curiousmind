const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        enum: ['student', 'tutor', 'admin'],
        default: 'student',
    },
    firebaseUid: {
        type: String,
        required: true,
        unique: true,
    },
    avatar: {
        type: String,
        default: '',
    },
    isOnline: {
        type: Boolean,
        default: false,
    },
    lastSeen: {
        type: Date,
        default: Date.now,
    },
    // Tutor specific fields
    subject: { type: String, default: '' },
    hourlyRate: { type: String, default: '' },
    university: { type: String, default: '' },
    experience: { type: String, default: '' },
    description: { type: String, default: '' },
    bio: { type: String, default: '' }, // Short bio
    qualification: { type: String, default: '' },
    teachingLevels: [{ type: String }],
    languages: [{ type: String }], // New field for languages spoken

    // Student specific fields
    studentSubjects: [{ type: String }],
    learningMode: {
        type: String,
        enum: ['online', 'offline', 'both', ''],
        default: ''
    },

    // Common fields
    availability: { type: String, default: '' }, // e.g. "Weekdays 4pm-8pm"
    tags: [{ type: String }],

    // New fields for search
    location: { type: String, default: '' },
    rating: { type: Number, default: 0 },
    reviewsCount: { type: Number, default: 0 },
    isVerified: { type: Boolean, default: false },
    classGrade: { type: String, default: '' }, // e.g., "K-12", "College"
}, {
    timestamps: true,
});

module.exports = mongoose.model('User', userSchema);
