Just like all the millions of other packages on npm that add Promise.seq() functionality, except it does not instantiate any promise in the list until the prior promise successfully resolves, and it fails fast as soon as any promise rejects.  Maybe someone else made a package that works like that but I tried the first 4 that came up and they all sucked so I wrote my own.

```js
var promiseSequence = require("promisedotseq");

var promiseFactories = [
	() => new Promise((resolve, reject) => setTimeout(() => {
		console.log("1!");
		resolve(1);
	}, 5000)),
	() => new Promise((resolve, reject) => setTimeout(() => {
		console.log("2!");
		reject(2);
	}, 5000)),
	() => new Promise((resolve, reject) => setTimeout(() => {
		console.log("3!");
		resolve(3);
	}, 5000))
];

promiseSequence(promiseFactories).then(resolved => {
	console.log(resolved)
}, rejected => {
	console.log(rejected)
})
```
