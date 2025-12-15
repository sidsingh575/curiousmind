const User = require('../models/User');

// @desc    Register/Sync User from Firebase
// @route   POST /api/auth/sync
// @access  Private (Firebase Token)
const syncUser = async (req, res) => {
    try {
        const {
            name, email, role, firebaseUid, avatar,
            subject, hourlyRate, university, experience, description, bio, tags,
            location, rating, reviewsCount, isVerified, classGrade,
            qualification, teachingLevels, studentSubjects, learningMode, availability, languages
        } = req.body;

        let user = await User.findOne({ firebaseUid });

        if (user) {
            // Update existing user
            user.name = name || user.name;
            user.email = email || user.email;
            user.avatar = avatar || user.avatar;
            // Update other fields if provided
            if (subject) user.subject = subject;
            if (hourlyRate) user.hourlyRate = hourlyRate;
            if (university) user.university = university;
            if (experience) user.experience = experience;
            if (description) user.description = description;
            if (bio) user.bio = bio;
            if (tags) user.tags = tags;
            if (location) user.location = location;
            if (qualification) user.qualification = qualification;
            if (teachingLevels) user.teachingLevels = teachingLevels;
            if (languages) user.languages = languages;
            if (studentSubjects) user.studentSubjects = studentSubjects;
            if (learningMode) user.learningMode = learningMode;
            if (availability) user.availability = availability;
            if (classGrade) user.classGrade = classGrade;

            await user.save();
            return res.json(user);
        }

        // Create new user
        user = await User.create({
            name,
            email,
            role,
            firebaseUid,
            avatar,
            subject: subject || (role === 'tutor' ? 'General' : ''),
            hourlyRate: hourlyRate || (role === 'tutor' ? '$30' : ''),
            university: university || '',
            experience: experience || '',
            description: description || (role === 'tutor' ? 'Enthusiastic tutor ready to help!' : ''),
            bio: bio || '',
            tags: tags || [],
            location: location || '',
            rating: 0,
            reviewsCount: 0,
            isVerified: false,
            classGrade: classGrade || '',
            qualification: qualification || '',
            teachingLevels: teachingLevels || [],
            languages: languages || [],
            studentSubjects: studentSubjects || [],
            learningMode: learningMode || '',
            availability: availability || ''
        });

        if (user) {
            res.status(201).json(user);
        } else {
            res.status(400).json({ message: 'Invalid user data' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all tutors with filtering
// @route   GET /api/auth/tutors
// @access  Public
const getTutors = async (req, res) => {
    try {
        const { search, location, isOnline, subject, classGrade } = req.query;

        // Base query: only tutors and only verified ones
        // Note: For development, if you haven't verified users yet, you might want to comment out isVerified: true temporarily
        // or ensure you seed/update users to be verified.
        let query = {
            role: 'tutor'
            // isVerified: true // Uncomment this when you are ready to enforce verification
        };

        if (isOnline === 'true') {
            query.isOnline = true;
        }

        if (location) {
            query.location = { $regex: location, $options: 'i' };
        }

        if (subject && subject !== 'All') {
            query.subject = { $regex: subject, $options: 'i' };
        }

        if (classGrade) {
            query.classGrade = { $regex: classGrade, $options: 'i' };
        }

        if (search) {
            const searchRegex = { $regex: search, $options: 'i' };
            query.$or = [
                { name: searchRegex },
                { subject: searchRegex },
                { description: searchRegex },
                { tags: { $in: [searchRegex] } }
            ];
        }

        // Sorting
        // 1. Rating (Descending)
        // 2. Experience (Descending) - Note: standard string sort might not be perfect for "5 years", but it's a start.
        // Ideally experience should be stored as flexible number or normalized string.
        const tutors = await User.find(query)
            .select('-firebaseUid')
            .sort({ rating: -1, experience: -1 });

        res.json(tutors);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    syncUser,
    getTutors,
};
