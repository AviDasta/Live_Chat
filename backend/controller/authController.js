const formidable = require("formidable");
const registerModel = require("../models/authModel");
const fs = require("fs");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validatePassword, emailValidate } = require("../utils/validator");

module.exports.userRegister = (req, res) => {
  const form = formidable();

  form.parse(req, async (err, fileds, files) => {
    const { userName, email, password, confirmPassword } = fileds;
    const { image } = files;
    let error = [];
    if (!userName) {
      error.push(" הקש בבקשה את שם המשתמש שלך");
    }
    const emailValid = emailValidate(email);
    if (emailValid) {
      error.push(emailValid);
    }
    const passwordError = validatePassword(password, confirmPassword);
    if (passwordError) {
      console.log("pass", passwordError);
      error.push(passwordError);
    }

    if (Object.keys(files).length === 0) {
      error.push("אנא הכנס תמונת משתמש");
    }
    if (error.length > 0) {
      res.status(400).json({
        error: {
          errorMessage: error,
        },
      });
    } else {
      const getImageName = files.image.originalFilename;
      const randNumber = Math.floor(Math.random() * 99999);
      const newImageName = randNumber + getImageName;
      files.image.originalFilename = newImageName;
      const newPath =
        __dirname +
        `../../../frontend/public/image/${files.image.originalFilename}`;

      try {
        const checkUser = await registerModel.findOne({
          email: email,
        });
        if (checkUser) {
          res.status(400).json({
            error: {
              errorMessege: ["האימייל הזה כבר קיים במערכת"],
            },
          });
        } else {
          fs.copyFile(files.image.filepath, newPath, async (error) => {
            if (!error) {
              const userCreate = await registerModel.create({
                userName,
                email,
                password: await bcrypt.hash(password, 10),
                image: files.image.originalFilename,
              });

              const token = jwt.sign(
                {
                  id: userCreate._id,
                  email: userCreate.email,
                  userName: userCreate.userName,
                  image: userCreate.image,
                  registerTime: userCreate.createdAt,
                },
                process.env.SECRET,
                {
                  expiresIn: process.env.TOKEN_EXP,
                }
              );
              const options = {
                expires: new Date(
                  Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
                ),
              };
              res.status(201).cookie("authToken", token, options).json({
                successMessage: "You Registered Successfully",
                token,
              });
            } else {
              res.status(500).json({
                error: {
                  errorMessage: ["Internal Server Error"],
                },
              });
            }
          });
        }
      } catch (error) {
        res.status(500).json({
          error: {
            errorMessage: ["Internal Server Error"],
          },
        });
      }
    }
  }); // סוף של פורמידבל
};

module.exports.userLogin = async (req, res) => {
  const error = [];
  const { email, password } = req.body;
  console.log(req.body);
  if (!email) {
    error.push(" הקש בבקשה את האימייל שלך");
  }
  if (!password) {
    error.push(" הקש בבקשה את הסיסמא שלך");
  }
  if (email && !validator.isEmail(email)) {
    error.push("הקש בבקשה את האימייל העדכני שלך");
  }
  if (error.length > 0) {
    res.status(400).json({
      error: {
        errorMessage: error,
      },
    });
  } else {
    try {
      const checkUser = await registerModel
        .findOne({
          email: email,
        })
        .select("+password");
      if (checkUser) {
        const matchPassword = await bcrypt.compare(
          password,
          checkUser.password
        );

        if (matchPassword) {
          const token = jwt.sign(
            {
              id: checkUser._id,
              email: checkUser.email,
              userName: checkUser.userName,
              image: checkUser.image,
              registerTime: checkUser.createdAt,
            },
            process.env.SECRET,
            {
              expiresIn: process.env.TOKEN_EXP,
            }
          );
          const options = {
            expires: new Date(
              Date.now() + process.env.COOKIE_EXP * 24 * 60 * 60 * 1000
            ),
          };
          res.status(200).cookie("authToken", token, options).json({
            successMessage: "ההרשמה הוצלחה",
            token,
          });
        } else {
          res.status(400).json({
            error: {
              errorMessege: ["הסיסמא שלך לא זמינה"],
            },
          });
        }
      } else {
        res.status(400).json({
          error: {
            errorMessege: ["האימייל לא קיים במערכת"],
          },
        });
      }
    } catch {
      res.status(404).json({
        error: {
          errorMessege: ["קיימת בעיה בשרת"],
        },
      });
    }
  }
};
