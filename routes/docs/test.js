const markup = `
<html>
<body>

<h1>Login test - OPP BFF 0.1.0</h1>
<form action="/api/v1/users/login" method="POST">
  <input type="text" name="email" />
  <br />
  <input type="password" name="password" />
  <br />
  <button type="submit">Log in</button>
</form>

</body>
</html>
`;


function docsTestPageHandler(request, h) {
  return markup;
}

module.exports = docsTestPageHandler;
