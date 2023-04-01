import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../store/actions/authAction";
import { useAlert } from "react-alert";
import { ERROR_CLEAR, SUCCESS_MESSAGE_CLEAR } from "../store/types/authType";

const Register = () => {
  const navigate = useNavigate();
  const alert = useAlert();

  const { loading, authenticate, error, successMessage, myInfo } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  const [state, setState] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: "",
  });

  const [loadImage, setLaodImage] = useState("");
  const inputHendle = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };

  const fileHendle = (e) => {
    if (e.target.files.length !== 0) {
      setState({
        ...state,
        [e.target.name]: e.target.files[0],
      });
    }
    const reader = new FileReader();
    reader.onload = () => {
      setLaodImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const register = (e) => {
    const { userName, email, password, image, confirmPassword } = state;
    e.preventDefault();

    const formData = new FormData();
    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("confirmPassword", confirmPassword);
    formData.append("image", image);
    dispatch(userRegister(formData));
  };

  useEffect(() => {
    if (authenticate) {
      navigate("/");
    }
    if (successMessage) {
      alert.success(successMessage);
      dispatch({ type: SUCCESS_MESSAGE_CLEAR });
    }
    if (error) {
      error.map((err) => alert.error(err));
      dispatch({ type: ERROR_CLEAR });
    }
  }, [successMessage, error]);

  return (
    <div className="register">
      <div className="card">
        <div className="card-header">
          <h3>הרשמה</h3>
        </div>
        <div className="card-body">
          <form onSubmit={register}>
            <div className="form-group">
              <label htmlFor="username">שם משתמש</label>
              <input
                type="text"
                onChange={inputHendle}
                name="userName"
                value={state.userName}
                className="form-control"
                placeholder="שם משתמש"
                id="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">אימייל</label>
              <input
                onChange={inputHendle}
                name="email"
                value={state.email}
                type="email"
                className="form-control"
                placeholder="אימייל"
                id="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">סיסמא</label>
              <input
                type="password"
                onChange={inputHendle}
                name="password"
                value={state.password}
                className="form-control"
                placeholder="סיסמא"
                id="password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">אשר סיסמה</label>
              <input
                type="password"
                onChange={inputHendle}
                name="confirmPassword"
                value={state.confirmPassword}
                className="form-control"
                placeholder="אשר סיסמה"
                id="confirmPassword"
              />
            </div>
            <div className="form-group">
              <div className="file-image">
                <div className="image">
                  {loadImage ? <img src={loadImage} alt="img" /> : ""}
                </div>
                <div className="file">
                  <label htmlFor="image">בחר תמונה</label>
                  <input
                    type="file"
                    onChange={fileHendle}
                    name="image"
                    className="form-control"
                    id="image"
                  />
                </div>
              </div>
            </div>
            <div className="form-group">
              <input type="submit" value="הירשם" className="btn" />
            </div>
            <div className="form-group">
              <span>
                <Link to="/messenger/login">התחבר לחשבון שלך</Link>
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
