import React from "react";
import loginbrand from "../../assets/images/loginImage/download.jpg";
import { useState } from "react";
import { Modal, ModalHeader, ModalFooter, Button } from 'reactstrap';
import { useNavigate } from "react-router";
import { forgotpassword } from "../../api/user";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Styles.css"

function Forgot() {
  const [email, setEmail] = useState("");
  const [modal, setModal] = useState(false);
  const toggleModal = () => setModal(!modal);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };
  const handleResetPassword = (event) => {
    event.preventDefault();
    if(isValidEmail(email)){
    setLoading(true);
    forgotpassword(email)
      .then((response) => {
        setModal(true);
        navigate("/");
      })
      .catch((error) => {
        toast.error("Error");
      })
      .finally(() => {
        setLoading(false);
      });
    }
  };
  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
  }
  function handleChange(event) {
    setEmail(event.target.value);
  }

  function toLogin() {
    navigate("/")
  }
  return (
    <>
    <ToastContainer />
      <div className="image-loginform">
        <img
          alt="header"
          src="https://static.uacdn.net/production/_next/static/images/home-illustration.svg?q=75&auto=format%2Ccompress&w=1200"
          width="480"
          height="333"
          decoding="async"
          data-nimg="future"
          className="css-fz77qc-Style Next Image e1n3w55p0"
          loading="eager"
          style={{ float: "right" }}
        />
        <div className="app">
          <div className="login-form">
            <div className="imgcontainer">
              <img src={loginbrand} alt="Avatar" className="avatar" />
            </div>
            <div className="title-lg font-xl">Forgot Password?</div>
            <div className="title-md font-md">We'll send you new password</div>
            <div className="title-sm font-sm">Please enter your email</div>
            <div className="form">
              <form>
                <div className="input-container">
                  <label className="font-sm" id="email" style={{ marginRight: "240px", fontWeight: "600"}}>
                    Email
                  </label>
                  <input
                    placeholder="Enter your mail"
                    style={{ marginTop: "-11px", fontSize: "14px", height: "50px", borderColor: "#9BA4B5" }}
                    type="text"
                    name="email"
                    id="email"
                    value={email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div style={{ textAlign: "end", marginRight: "10px" }}>
                  <a
                  className="font-sm"
                    onClick={toLogin}
                    style={{ textDecoration: "none", color: "#007bff", cursor: "pointer", fontWeight: "600", fontFamily: "Poppins" }}
                  >
                    Already have an account?
                  </a>
                </div>
                <div className="centered">
                  <button
                    className="button-container primaryBlue font-sm"
                    onClick={handleResetPassword}
                    type="submit"
                    style={{width: "100%", height: "50px"}}
                  >
                    {" "}
                    {loading ? "Loading..." : "Reset Password"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Modal isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>Password sent successfully</ModalHeader>
        <ModalFooter>
          <Button color="primary" onClick={toggleModal}>
            OK
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
}

export default Forgot;
