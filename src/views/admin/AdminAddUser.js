import React, { useState, useEffect } from "react";
import { Card, Form } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { myaccount } from "../../api/user";
import { updateuser } from "../../api/user";
import { adduser, userapi, role as fetchRoles, designation as fetchDesignations } from "../../api/user";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Common/Styles.css';
import { Link } from 'react-router-dom';

const AdminAddUser = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [showPopup, setShowPopup] = useState(false);
    const [roleId, setRoleId] = useState("");
    const [designation, setDesignation] = useState("");
    const [formErrors, setFormErrors] = useState({
        name: "",
        email: "",
        roleId: "",
        designation: "",
    });
    const [roles, setRoles] = useState([]);
    const [designations, setDesignations] = useState([]);

    const actionType = location.state?.actionType;
    let userId = location.state?.userId;

    useEffect(() => {

        fetchRoles()
            .then((response) => {
                setRoles(response);
            })
            .catch((error) => {
                toast.error("Error fetching roles");
            });

        fetchDesignations()
            .then((response) => {
                setDesignations(response);
            })
            .catch((error) => {
                toast.error("Error fetching designations");
            });

        if (actionType === "edit") {
            myaccount(userId)
                .then((response) => {
                    const user = response;
                    setName(user.name);
                    setEmail(user.email);
                    setRoleId(user.roleId);
                    setDesignation(user.designation);
                })
                .catch((error) => {
                    toast.error("Error");
                });
        }
    }, [actionType, location, userId]);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (actionType === "add") {
            const isEmailExists = await checkEmailExists(email.trim());

            if (isEmailExists) {
                setShowPopup(true)
                return;
            }
        }

        const validationErrors = validateForm();
        if (Object.values(validationErrors).some((error) => error !== "")) {
            setFormErrors(validationErrors);
            return;
        }

        if (actionType === "edit") {
            updateuser(userId, name.trim(), email.trim(), roleId, designation)
                .then((response) => {
                    navigate("/AdminViewUser");
                })
                .catch((error) => {
                    toast.error("Error");
                });
        } else if (actionType === "add") {
            adduser(name.trim(), email.trim(), roleId, designation)
                .then((response) => {
                    navigate("/AdminViewUser");
                })
                .catch((error) => {
                    toast.error("Error");
                });
        }
    };
    const checkEmailExists = async (emailToCheck) => {
        try {
            const users = await userapi();
            return users.some((user) => user.email === emailToCheck);
        } catch (error) {
            toast.error("Error");
            return false;
        }
    };

    const handleCancel = () => {
        navigate("../AdminViewUser");
    };

    const validateForm = () => {
        let errors = {
            name: "",
            email: "",
            roleId: "",
            designation: "",
        };

        if (!name.trim()) {
            errors.name = "Name is required";
        }

        if (!email.trim()) {
            errors.email = "Email is required";
        } else if (!isValidEmail(email)) {
            errors.email = "Email is invalid";
        }

        if (!roleId) {
            errors.roleId = "Role ID is required";
        }

        if (!designation) {
            errors.designation = "Designation is required";
        }

        return errors;
    };

    const isValidEmail = (email) => {
        return /\S+@\S+\.\S+/.test(email);
    };

    function Breadcrumbs() {
        const location = useLocation();

        return (
            <nav >
                <Link to="/AdminViewUser"
                    className={location.pathname === "/AdminViewUser" ? "breadcrumb-active" : "breadcrumb-not-active"}
                >
                    Users
                </Link>
                <span className="breadcrumb-arrow">&gt;</span>
                <Link to="/AdminAddUser"
                    className={location.pathname.startsWith("/AdminAddUser") ? "breadcrumb-active" : "breadcrumb-not-active"}
                >
                    {actionType === "edit" ? "Edit User" : "Add User"}
                </Link>
            </nav>
        );
    }

    return (
        <>
            <div className="breadcrumb">{Breadcrumbs()}</div>
            <div className="user-form-container caliber-font">
                <ToastContainer />
                <form onSubmit={handleSubmit} className="user-form ">
                    <h2 className="title-lg font-xl">
                        {actionType === "edit" ? "Edit User" : "Add User"}
                    </h2>
                    <Card className="Card" style={{ padding: "15px" }}>
                        <div className="form-group">
                            <label className="font-sm" htmlFor="name">Name:</label>
                            <input
                                type="text"
                                id="name"
                                className={`form-input ${formErrors.name && "input-error"}`}
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                placeholder="Enter name"
                                required
                                style={{ marginTop: "-6px", fontSize: "14px", height: "50px", borderColor: "#9BA4B5" }}
                            />
                            {formErrors.name && <div className="error-message">{formErrors.name}</div>}
                        </div>
                        <div className="form-group">
                            <label className="font-sm" htmlFor="email">Email:</label>
                            <input
                                type="email"
                                id="email"
                                className={`form-input ${formErrors.email && "input-error"}`}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="Enter email"
                                required
                                style={{ marginTop: "-6px", fontSize: "14px", height: "50px", borderColor: "#9BA4B5" }}
                            />
                            {formErrors.email && <div className="error-message">{formErrors.email}</div>}
                        </div>
                        <div className="form-group">
                            <label className="font-sm" htmlFor="roleId">Role ID:</label>
                            <select
                                style={{ marginTop: "-6px", fontSize: "14px", height: "50px", borderColor: "#9BA4B5" }}
                                id="roleId"
                                className={`form-input ${formErrors.roleId && "input-error"}`}
                                value={roleId}
                                onChange={(e) => setRoleId(e.target.value)}
                            >
                                <option value="">Select Role</option>
                                {roles.map((role) => (
                                    <option key={role.id} value={role.roleName}>{role.roleName}</option>
                                ))}
                            </select>
                            {formErrors.roleId && <div className="error-message">{formErrors.roleId}</div>}
                        </div>
                        <div className="form-group">
                            <label className="font-sm" htmlFor="designation">Designation:</label>
                            <select
                                style={{ marginTop: "-6px", fontSize: "14px", height: "50px", borderColor: "#9BA4B5" }}
                                id="designation"
                                className={`form-input ${formErrors.designation && "input-error"}`}
                                value={designation}
                                onChange={(e) => setDesignation(e.target.value)}
                            >
                                <option value="">Select Designation</option>
                                {designations.map((designation) => (
                                    <option key={designation.id} value={designation.designationName}>{designation.designationName}</option>
                                ))}
                            </select>
                            {formErrors.designation && <div className="error-message">{formErrors.designation}</div>}
                        </div>
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button className="button-container primaryBlue font-sm" type="submit" style={{ width: "100%", height: "50px", marginRight: "10px" }}>
                                {actionType === "edit" ? "Save" : "Add"}
                            </button>
                            <button className="button-container primaryRed font-sm" type="button" style={{ width: "100%", height: "50px" }} onClick={handleCancel}>
                                Cancel
                            </button>
                        </div>
                    </Card>
                </form>
                {showPopup && (
                    <div className="password-popup text-center caliber-font">
                        <Form>
                            <p>Email already exist. Try Using different Email</p>
                            <button
                                className="popup-button cancel-button"

                                onClick={() => setShowPopup(false)}
                            >
                                Ok
                            </button>
                        </Form>
                    </div>
                )}
            </div>
        </>
    );
};

export default AdminAddUser;
