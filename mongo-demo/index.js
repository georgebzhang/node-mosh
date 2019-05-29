const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
	.then(() => console.log('Connected to MongoDB'))
	.catch(err => console.log('Could not connect to MongoDB: ', err));

const courseSchema = new mongoose.Schema({
	name: { type: String, required: true },
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
		// name: 'Angular Course',
		author: 'Mosh',
		// tags: ['node', 'backend'],
		tags: ['angular', 'frontend'],
		isPublished: true
	});

	try {
		// await course.validate(); // returns promise void, not boolean
		const result = await course.save();
		console.log(result);
	} catch (err) {
		console.log(err.message);
	}
	
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
	// const result = await Course.update({ _id: id }, {
	// 	$set: {
	// 		author: 'Another Author',
	// 		isPublished: false
	// 	}
	// }); // update first
	
	const course = await Course.findByIdAndUpdate(id, { // update and return document
		$set: {
			author: 'Jason',
			isPublished: false
		}
	}, { new: true });

	
	// const course = await Course.findById(id); // query first

	// if (!course) return;

	// course.set({
	// 	author: 'Another Author',
	// 	isPublished: true
	// });

	// const result = await course.save();

	console.log(course);
}

async function removeCourse(id) {
	// const result = await Course.deleteOne({ _id: id });
	const course = await Course.findByIdAndRemove(id);
	console.log(course);
}

createCourse();
// removeCourse('5cedf2a7fd288b49305a0648');