import React, { useState, useEffect } from "react";
import { Card, Form } from "reactstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { myaccount, myaccountprofile, updatepassword, designationById, UploadProfilePic, myProfilePic } from "../../api/user";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';
import './Styles.css';

const Profile = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [profilePic, setProfilePic] = useState("");
    const [id, setId] = useState();
    const [designation, setDesignation] = useState("");
    const [showPasswordPopup, setShowPasswordPopup] = useState(false);
    const [showPopup, setShowPopup] = useState(false);
    const [bothPopup, setBothPopup] = useState(false);
    const [PWUpadetePopup, setPWUpadetePopup] = useState(false);
    const [NotMatchPopup, setNotMatchPopup] = useState(false);
    const [errorPopup, setErrorPopup] = useState(false);
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [isPasswordValid, setIsPasswordValid] = useState(true);

    const userID = useSelector((state) => state.user.userId);

    useEffect(() => {
        async function callApi() {
            try {
                const apiResult = await myaccount(userID);
                const fkDesignationId = apiResult.fkDesignationId;
                const designationResult = await designationById(fkDesignationId);
                setDesignation(designationResult.designationName);
                setName(apiResult.name);
                setEmail(apiResult.email);
                setPassword(apiResult.password);
                setId(apiResult.id);

                const profilePicResult = await myProfilePic(userID);
                setProfilePic(profilePicResult.imageUrl);
            } catch (error) {
                toast.error("Error");
            }
        }
        callApi();
    }, [userID]);

    const handleSubmit = (event) => {
        event.preventDefault();
        myaccountprofile(id, name, email, password)
            .then((response) => {
                setShowPopup(true);
            })
            .catch((error) => {
                setErrorPopup(true)
            });
    };

    const handlePasswordChangeClick = () => {
        setShowPasswordPopup(true);
    };

    const handlePasswordChangeSubmit = (event) => {
        event.preventDefault();

        if (!currentPassword || !newPassword || !confirmNewPassword) {
            setBothPopup(true);
            return;
        }

        if (newPassword !== confirmNewPassword) {
            setNotMatchPopup(true);
            return;
        }
    
        if (!isPasswordValid) {
            return;
        }
    
        const userpassword = {
            id: userID,
            newPassword: newPassword,
            currentPassword: currentPassword,
        };
    
        updatepassword(userpassword)
            .then((response) => {
                setPWUpadetePopup(true);
            })
            .catch((error) => {
                setErrorPopup(true);
            });
    
        setShowPasswordPopup(false);
    };

    const handleProfilePicChange = async (event) => {
        const file = event.target.files[0];
        setProfilePic(URL.createObjectURL(file));

        const formData = new FormData();
        formData.append("ProfilePic", file);

        try {
            await UploadProfilePic(userID, formData);
            toast.success("Profile picture uploaded");
        } catch (error) {
            toast.error("Error uploading profile picture");
        }
    };

    const validatePassword = (password) => {
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        return passwordRegex.test(password);
    };

    const handlePasswordInputChange = (event) => {
        const newPassword = event.target.value;
        setNewPassword(newPassword);

        const isValid = validatePassword(newPassword);
        setIsPasswordValid(isValid);
    };

    return (
        <div className="user-form-container caliber-font" >
            <ToastContainer />
            <form className="user-form">
                <h4 className="title-lg font-xl">My Account Settings</h4>
                <Card className="Card caliber-font" style={{ padding: "15px" }}>
                    <div className="form-group-btn text-center">
                        <div className="centered">
                            <input
                                type="file"
                                accept="image/*"
                                className="d-none centered"
                                onChange={handleProfilePicChange}
                                id="profilePicInput"
                            />
                            <label htmlFor="profilePicInput">
                                <img
                                    src={profilePic || "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"}
                                    alt="avatar"
                                    className="rounded-circle"
                                    style={{ width: "100px", height: "100px", marginLeft: "100%" }}
                                />
                            </label>
                        </div>
                        <div>
                            <p className="text-muted mb-1 caliber-font">{designation}</p>
                            <p className="text-muted mb-1 caliber-font">Indore, India</p>
                        </div>
                    </div>

                    <div className="form-group-btn">
                        <label htmlFor="fullName" className="font-sm">Name</label>
                        <input
                            className="form-input font-sm"
                            value={name}
                            onChange={(event) => setName(event.target.value)}
                            type="text"
                            id="fullName"
                            placeholder="Enter full name"
                            style={{ fontSize: "14px", height: "50px", borderColor: "#9BA4B5" }}
                        />
                    </div>
                    <div className="form-group-btn">
                        <label htmlFor="email" className="font-sm">Email</label>
                        <input
                            className="form-input font-sm"
                            value={email}
                            disabled
                            onChange={(event) => setEmail(event.target.value)}
                            type="email"
                            id="email"
                            placeholder="Enter email"
                            style={{ fontSize: "14px", height: "50px", borderColor: "#9BA4B5" }}
                        />
                    </div>
                    <div className="form-group-btn">
                        <button className="popup-button secondaryBlue font-sm" onClick={handleSubmit} style={{ width: "100%", height: "50px" }}>
                            Save Changes
                        </button>

                    </div>
                    <div className="form-group-btn">
                        <button className="popup-button secondaryBlue font-sm" onClick={handlePasswordChangeClick} style={{ width: "100%", height: "50px" }}>
                            Change Password
                            <FontAwesomeIcon icon={faAngleRight} style={{ fontSize: "18px", marginLeft: "22%", marginRight: "-30%" }} />
                        </button>
                    </div>
                </Card>
            </form>
            {showPasswordPopup && (
                <div className="password-popup text-center caliber-font">
                    <Form onSubmit={handlePasswordChangeSubmit}>
                        <label for="inp" class="inp">
                            <input
                                type="password"
                                id="inp"
                                value={currentPassword}
                                onChange={(event) => setCurrentPassword(event.target.value)}
                                placeholder="&nbsp;"
                            />
                            <span class="label">Current Password:</span>
                            <span class="focus-bg"></span>
                        </label>
                        <label for="inp" class="inp">
                            <input
                                type="password"
                                id="inp"
                                value={newPassword}
                                onChange={handlePasswordInputChange}
                                placeholder="&nbsp;"
                            />
                            <span class="label">New Password:</span>
                            <span class="focus-bg"></span>
                        </label>
                        <label for="inp" class="inp">
                            <input
                                type="password"
                                id="inp"
                                value={confirmNewPassword}
                                onChange={(event) => setConfirmNewPassword(event.target.value)}
                                placeholder="&nbsp;"
                            />
                            <span class="label">Confirm New Password:</span>
                            <span class="focus-bg"></span>
                        </label>
                        <button className="popup-button" disabled={!isPasswordValid}>
                            Change
                        </button>
                        <button
                            className="popup-button cancel-button"
                            onClick={() => setShowPasswordPopup(false)}
                        >
                            Cancel
                        </button>
                    </Form>
                </div>
            )}
            {showPopup && (
                <div className="password-popup text-center caliber-font">
                    <Form>
                        <p>Changes Saved</p>
                        <button
                            className="popup-button cancel-button"

                            onClick={() => setShowPopup(false)}
                        >
                            Ok
                        </button>
                    </Form>
                </div>
            )}
            {bothPopup && (
                <div className="password-popup text-center caliber-font">
                    <Form>
                        <p>Please enter both new password and confirm password</p>
                        <button
                            className="popup-button cancel-button"

                            onClick={() => setBothPopup(false)}
                        >
                            Ok
                        </button>
                    </Form>
                </div>
            )}
            {PWUpadetePopup && (
                <div className="password-popup text-center caliber-font">
                    <Form>
                        <p>Password Updated successfully</p>
                        <button
                            className="popup-button cancel-button"

                            onClick={() => setPWUpadetePopup(false)}
                        >
                            Ok
                        </button>
                    </Form>
                </div>
            )}
            {NotMatchPopup && (
                <div className="password-popup text-center caliber-font">
                    <Form>
                        <p>Passwords do not match</p>
                        <button
                            className="popup-button cancel-button"

                            onClick={() => setNotMatchPopup(false)}
                        >
                            Ok
                        </button>
                    </Form>
                </div>
            )}
            {errorPopup && (
                <div className="password-popup text-center caliber-font">
                    <Form>
                        <p>Error in Changing</p>
                        <button
                            className="popup-button cancel-button"

                            onClick={() => setErrorPopup(false)}
                        >
                            Ok
                        </button>
                    </Form>
                </div>
            )}
        </div>
    );
};

export default Profile;
