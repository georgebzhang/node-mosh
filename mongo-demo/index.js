const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.log('Could not connect to MongoDB: ', err));

const courseSchema = new mongoose.Schema({
	name: String,
	author: String,
	tags: [ String ],
	date: { type: Date, default: Date.now },
	isPublished: Boolean
});

const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
	const pageNumber = 2;
	const pageSize = 10;

	const course = new Course({
		// name: 'Node.js Course',
		name: 'Angular Course',
		author: 'Mosh',
		// tags: ['node', 'backend'],
		tags: ['angular', 'frontend'],
		isPublished: true
	});

	const result = await course.save();
	console.log(result);
}

async function getCourses() {
	const courses = await Course
		.find({ author: 'Mosh', isPublished: true })
		.skip((pageNumber - 1) * pageSize)
		.limit(pageSize)
		.sort({ name: 1 })
		.select({ name: 1, tags: 1 });
		// .count();
	console.log(courses);
}

async function updateCourse(id) {
	const course = await Course.findById(id);
	if (!course) return;

	// course.author = 'Another Author'
	// course.isPublished = true;
	course.set({
		author: 'Another Author',
		isPublished: true
	});

	const result = await course.save();
	console.log(result);
}

updateCourse('5cedf2a7fd288b49305a0648');