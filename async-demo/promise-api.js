// const p = Promise.resolve({id: 1})
const p = Promise.reject(new Error('Error message'));

p	.then(result => console.log(result))
	.catch(error => console.log(error));