const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
console.log(" data.gender data.gender", data.gender,data)
  // Convert empty fields to an empty string so we can use validator functions
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  // data.dateofbirth = !isEmpty(data.dateofbirth) ? data.dateofbirth : "";
  data.gender = !isEmpty(data.gender) ? data.gender : "";

  //Name checks
  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }
  //   Date Of Birth check
  // if (Validator.isEmpty(data.dateofbirth)) {
  //   errors.dateofbirth = "Date Of Birth field is required";
  // }

  // Gender Check
  if (Validator.isEmpty(data.gender)) {
    errors.gender = "Gender field is required";
  }
  //Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  //Password checks
  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }
  // Password Length Check
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
