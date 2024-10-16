import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { login } from "../../api/user";
import Progress from "react-progress";
import loginbrand from "../../assets/images/loginImage/download.jpg"
import { HOME } from "../../utils/Navigateconstant";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import '@fortawesome/fontawesome-free/js/all.js';
import { useSelector, useDispatch } from 'react-redux';
import { setToken, setRoleId, setUserName, setUserId } from '../../redux/actions/userActions';
import "./Styles.css"

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [percent, setPercent] = useState(0);
  const [progressbar, setProgressbar] = useState("none")
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);
  const [modal, setModal] = useState(false);
  const navigate = useNavigate();
  const toggleModal = () => setModal(!modal);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const LoginUser = async (event) => {
    event.preventDefault();
    setProgressbar("block");

    if (!isValidEmail(email)) {
      setError("Email is invalid");
      setProgressbar("none");
      return;
    }

    if (!isValidPassword(password)) {
      setError("Password should be at least 6 characters long");
      setProgressbar("none");
      return;
    }

    let progress = 0;
    setShowError(true);

    const intervalId = setInterval(async () => {
      progress += 25;

      if (progress > 100) {
        clearInterval(intervalId);

        login(email, password)
          .then((res) => {
            var userdetails = res;
            localStorage.setItem("userDetails", JSON.stringify(userdetails));
            localStorage.setItem("name", userdetails.name);
            localStorage.setItem("email", userdetails.email);
            localStorage.setItem("id", userdetails.id);
            localStorage.setItem("RoleId", userdetails.roleId);
            localStorage.setItem("token", userdetails.token);
            dispatch(setToken(userdetails.token));
            dispatch(setRoleId(userdetails.roleId));
            dispatch(setUserId(userdetails.id));
            dispatch(setUserName(userdetails.name));

            if (userdetails.roleId === 1) {
              navigate(HOME);
            } else if (userdetails.roleId === 2) {
              navigate("/AdminHome");
            } else {
              alert("Unknown role!");
            }
          })
          .catch((err) => {
            setModal(true);
          });
      } else {
        setPercent(progress);
      }
    }, 500);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleChange = event => {
    const trimmedEmail = event.target.value.trim();
    if (!isValidEmail(trimmedEmail)) {
      setError('Email is invalid');
    } else {
      setError(null);
    }
    setEmail(trimmedEmail);
  };

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }

  function isValidPassword(password) {
    return password.length >= 5;
  }

  function forgot() {
    navigate("./forgot")
  }

  return (
    <>
      <Progress style={{ display: progressbar }} color="rainbow" percent={percent} height={3} />
      <div className="image-loginform">
        <img alt="header" src="https://static.uacdn.net/production/_next/static/images/home-illustration.svg?q=75&auto=format%2Ccompress&w=1200" width="480" height="333" decoding="async" data-nimg="future" className="css-fz77qc-Style Next Image e1n3w55p0" loading="eager" style={{ float: "right" }} />
        <div className="app">
          <div className="login-form">
            <div className="imgcontainer">
              <img src={loginbrand}
                alt="Avatar" className="avatar" />
            </div>
            <div className="title-lg font-xl">Hi, Welcome</div>
            <div className="title-md font-md">Enter your Credential to continue</div>
            <div className="title-sm font-sm">Log-in with Email Address</div>
            <div className="form">
              <form onSubmit={LoginUser}>
                <div className="input-container">
                  <label className="font-sm" id="email" style={{ marginRight: "240px", fontWeight: "600" }}>Email</label>

                  <input
                    placeholder="Enter your Email"
                    style={{ marginTop: "-10px", fontSize: "14px", height: "50px", borderColor: "#9BA4B5" }}
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="input-container" style={{ position: 'relative' }}>
                  <label className="font-sm" id="password" style={{ marginTop: "5px", fontWeight: "600" }}>Password</label>
                  <input
                    placeholder="Enter your Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    style={{ marginTop: "-6px", fontSize: "14px", height: "50px", borderColor: "#9BA4B5" }}
                  />

                  <FontAwesomeIcon
                    style={{ position: 'absolute', top: '72%', transform: 'translateY(-50%)', right: '10px' }}
                    className="password-toggle-icon"
                    icon={showPassword ? faEye : faEyeSlash}
                    onClick={togglePasswordVisibility}
                  />
                </div>
                <div style={{ textAlign: "end", marginRight: "10px" }}>
                  <a className="font-sm" onClick={forgot} style={{ textDecoration: "none", color: "#007bff", cursor: "pointer", fontWeight: "600", fontFamily: "Poppins" }}>
                    Forgot Password?
                  </a>
                </div>
                <div className="centered">
                  <button className="button-container primaryBlue font-sm" type="submit" style={{ width: "100%", height: "50px" }}>Log In</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Error During Log-in</ModalHeader>
        <ModalBody>
          Please enter correct Credential
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Login;
