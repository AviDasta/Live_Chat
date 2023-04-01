
const validatePassword = (password, confirmPassword) => {
  if (!password) {
    return " הקש בבקשה את הסיסמא שלך";
  }
  if (!confirmPassword) {
    return " הקש בבקשה את הסיסמא שלך שוב";
  }
  if (password && confirmPassword && password !== confirmPassword) {
    return "הסיסמא שהזנת ואישור הסיסמא שהזנת אינם תואמים ";
  }
  if (password && password.length < 6) {
    return "הסיסמא חייבת לכלול לפחות 6 תוים";
  }
  return null;
};

// const emailValidate = (email) => {
//   console.log("isEmail", validator.isEmail(email));
//   if (!email) {
//     return " הקש בבקשה את האימייל שלך";
//   }
//   if (!email && validator.isEmail(email)) {
//     return "הקש בבקשה את האימייל העדכני שלך";
//   }
//   return null;
// };

module.exports = { validatePassword };
