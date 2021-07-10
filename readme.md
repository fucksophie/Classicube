# ClassiCube NPM library!

The ClassiCube NPM library can be used to interact with ClassiCube's API's in a bunch of ways.  
You can player info, you can get servers and most importantly everything can be cached!


### Example:
```js
	const ClassiCube = require("ClassiCube")
  	const cl = new ClassiCube('tmp.json', false);
  	await cl.login('lukeacat', 'password2011');

  	console.log(await cl.getServers());
	console.log(`Logged in account ${cl.getUsername()}!`);
```
