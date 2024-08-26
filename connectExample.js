// test.js
const mongoose = require('mongoose');

const connect = () => {
    return mongoose.connect('mongodb://localhost:27017/whatever', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    });
};

// Define the schema with the correct name and casing
const studentSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    favFood: [{ type: String }],
    info: {
        school: {
            type: String,
        },
        shoeSize: {
            type: Number,
        },
    },
});

// Correct the typo in mongoose.model
const Student = mongoose.model('student', studentSchema);

const run = async () => {
    try {
        await connect();
        console.log('Connected to MongoDB');

        // Clean up previous test data
        await Student.deleteMany({ firstName: 'Alice' });
        console.log('Old entries deleted.');

        // Create a new student document
        const student = await Student.create({ firstName: 'Alice' });
        console.log('Student created:', student);

        // Find student by first name
        const found = await Student.find({ firstName: 'Alice' });
        console.log('Students found:', found);

        // Find student by ID
        const foundById = await Student.findById(student._id);
        console.log('Student found by ID:', foundById);

        // Update student by ID
        const updateStudent = await Student.findByIdAndUpdate(
            student._id,
            { firstName: 'Alice Updated' },
            { new: true }
        );
        console.log('Student updated:', updateStudent);

        await mongoose.connection.close();
        console.log('Connection closed');
    } catch (e) {
        console.error('Error:', e.message);
        console.error(e.stack);
    }
};

run();
