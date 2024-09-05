const legitUsers = [
  {
    email: "goodemail@gmail.com",
    password: "$GoodPass200",
  },
  {
    email: "another@gmail.com",
    password: "#$BetterPass200",
  },
  {
    email: "test@test.com",
    password: "tset",
  },
];

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function checkEmailPassword(emailPassword) {
  await sleep(Math.floor(Math.random(5000)) + 1000);
  const { email, password } = emailPassword;
  const foundUser = legitUsers.find((user) => user.email === email);
  if (foundUser) {
    if (foundUser.password === password) {
      return {
        authenticated: true,
        error: false,
      };
    } else {
      return {
        authenticated: false,
        error: "incorrect password",
      };
    }
  }
  return {
    authenticated: false,
    error: "no such user",
  };
}

export default checkEmailPassword;
