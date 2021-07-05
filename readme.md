# ClassiCube NPM library!

This has a function that you can get a player's information with!  
Next from there, you can use the session given from the function to use /api/servers and other endpoints!

## .getAccount
Get a account information.

### Params:
username: string  
password: string

### Returns: 
```json
{
	"username": "lukeacat",
	"session": ".eheyNy7xdmE5hellofahsfF36Wyg5bruhc3mercURY",
	"token": "aiosfjhasoigjag"
}
```

### Example:
```js
	const { CookieJar } = require("tough-cookie")
	const classicube = require("classicube")
	const got = require("got");

	async function getServers() {
		const account = await classicube.getAccount("lukeacat", "mYPASwORDd")
		
		const cj = new CookieJar();

		cj.setCookieSync(`session=${account.session}`, 'http://www.classicube.net')

    	const servers = await got("http://www.classicube.net/api/servers/", {
			cookieJar: cj
		}).json();

		// you now have access to all servers, and their mppass'es so you can join them!

	}

	getServers()
```
