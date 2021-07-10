/* eslint-disable prefer-destructuring */
const axios = require('axios');
const { CookieJar } = require('tough-cookie');
const querystring = require('querystring');
const fs = require('fs');
const os = require('os');
const path = require('path');

class ClassiCube {
  constructor(file, doCache = true) {
    this.file = path.join(os.tmpdir(), file);
    this.caching = doCache;
  }

  async login(username, password) {
    if (this.checkCache()) return;

    const first = await axios.get('http://www.classicube.net/api/login');

    this.jar = new CookieJar();

    this.jar.setCookieSync(first.headers['set-cookie'][0].split(';')[0], 'http://www.classicube.net/');

    this.session = first.headers['set-cookie'][0].split(';')[0];

    const second = await axios.post('http://www.classicube.net/api/login', querystring.stringify({
      username,
      password,
      token: first.data.token,
    }), {
      headers: {
        Cookie: this.jar.getCookieStringSync('http://www.classicube.net/'),
      },
    });

    this.session = second.headers['set-cookie'][0].split(';')[0];
    this.username = second.data.username;

    this.jar.setCookieSync(this.session, 'http://www.classicube.net/');
    if (this.caching) {
      fs.writeFileSync(this.file, JSON.stringify({
        session: second.headers['set-cookie'][0],
      }));
    }
  }

  checkCache() {
    if (fs.existsSync(this.file) && this.caching) {
      const account = JSON.parse(fs.readFileSync(this.file));

      this.session = account.session;

      this.jar = new CookieJar();
      this.jar.setCookieSync(account.session, 'http://www.classicube.net/');
      return true;
    }

    return false;
  }

  getUsername() {
    return this.username;
  }

  async getServers() {
    const resp = await axios.get('http://www.classicube.net/api/servers', {
      headers: {
        Cookie: this.jar.getCookieStringSync('http://www.classicube.net/'),
      },
    });
    return resp.data;
  }
}

module.exports = ClassiCube;
