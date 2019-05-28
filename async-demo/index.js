console.log('Before');

getUser(1, displayUser);

console.log('After');

function getUser(id, callback) {
	setTimeout(() => {
		console.log('Reading a user from a database...');
		callback({id: id, githubUsername: 'george'});
	}, 2000);
}

function getRepositories(username, callback) {
	setTimeout(() => {
		console.log('Calling GitHub API...');
		callback(['repo1', 'repo2', 'repo3']);
	}, 2000);
}

function displayRepositories(repos) {
	console.log(repos);
}

function displayUser(user) {
	console.log('User', user);
	getRepositories(user.githubUsername, displayRepositories);
}