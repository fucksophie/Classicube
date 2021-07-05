const got = require('got');
const FormData = require('form-data');
const { CookieJar } = require('tough-cookie');
const setCookie = require('set-cookie-parser');

module.exports.getAccount = async (username, password) => {
  const cj = new CookieJar();
  const form = new FormData();

  const pre = await got('http://www.classicube.net/api/login/');

  const cookies = setCookie.parse(pre, { decodeValues: true, map: true });

  cj.setCookieSync(`session=${cookies.session.value}`, 'http://www.classicube.net');

  form.append('username', encodeURI(username));
  form.append('password', password);
  form.append('token', encodeURI(JSON.parse(pre.body).token));

  const post = await got.post('http://www.classicube.net/api/login', {
    body: form,
    cookieJar: cj,
  }).json();

  if (post.authenticated) {
    return {
      session: cookies.session.value,
      token: post.token,
      username: post.username,
    };
  }

  throw new Error(`Errors authenicating! ${JSON.stringify(post)}`);
};
