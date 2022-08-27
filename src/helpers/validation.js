const loginCheck = /^[0-9A-Za-z]{6,}$/;
const passwordCheck = /^.*(?=.{6,})(?=.*\d)(?=.*[a-z]).*$/;

export const checkLogin = (login) => {
  return loginCheck.test(login);
}

export const checkPassword = (password) => {
  return passwordCheck.test(password);
}