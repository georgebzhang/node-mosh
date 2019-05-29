console.log('Before');

getUser(1)
	.then(user => getRepositories(user.githubUsername))
	.then(repos => console.log('Repositories: ', repos))
	.catch(err => console.log('Error', err));

console.log('After');

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
			resolve(['repo1', 'repo2', 'repo3']);
		}, 2000);
	});
}