console.log('Before');

// Promise approach
getUser(1)
	.then(user => getRepositories(user.githubUsername))
	.then(repos => console.log('Repositories: ', repos))
	.catch(err => console.log('Error', err.message));

// async/await approach
async function displayRepositories() {
	try {
		const user = await getUser(1);
		const repos = await getRepositories(user.githubUsername);
		console.log('Repositories: ', repos);
	} catch (err) {
		console.log('Error', err.message);
	}
}
displayRepositories();

console.log('After');

//functions
function getUser(id) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Reading a user from a database...');
			resolve({id: id, githubUsername: 'george'});
		}, 2000);
	});
}

function getRepositories(username) {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			console.log('Calling GitHub API...');
			// resolve(['repo1', 'repo2', 'repo3']);
			reject(new Error('Could not get repos'));
		}, 2000);
	});
}