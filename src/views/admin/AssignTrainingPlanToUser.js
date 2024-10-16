import React, { useState, useEffect } from "react";
import { Card } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { userapi } from "../../api/user";
import { AssignTPtoUser, assignedTrainingPlan } from "../../api/user";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Common/Styles.css';
import { Link, useLocation } from 'react-router-dom';

const AdminAssignTrainingPlan = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [userTrainingPlans, setUserTrainingPlans] = useState([]);
    const [formErrors, setFormErrors] = useState({
        user: "",
    });

    useEffect(() => {
        userapi()
            .then((response) => setUsers(response))
            .catch((error) => toast.error("Error"));
    }, []);

    useEffect(() => {
        if (selectedUser) {
            assignedTrainingPlan(selectedUser)
                .then((response) => setUserTrainingPlans(response))
                .catch((error) => toast.error("Error"));
        }
    }, [selectedUser]);

    const handleToggleTrainingPlan = async (trainingPlanId) => {
        const updatedUserTrainingPlans = userTrainingPlans.map((plan) => {
            if (plan.trainingPlanId === trainingPlanId) {
                // Toggle the status locally
                const updatedPlan = { ...plan, statusTP: !plan.statusTP };
                // Update the UI state
                setUserTrainingPlans((prevUserTrainingPlans) => [
                    ...prevUserTrainingPlans.filter((p) => p.trainingPlanId !== trainingPlanId),
                    updatedPlan,
                ]);
                // Call the API to update the server
                AssignTPtoUser(selectedUser, trainingPlanId, !plan.statusTP)
                    .then((response) => {
                        console.log("TT01: Training plan Updated:", response);
                    })
                    .catch((error) => {
                        // Handle errors if needed
                        console.error("Error updating training plan status:", error);
                    });
                return updatedPlan;
            }
            return plan;
        });
        setUserTrainingPlans(updatedUserTrainingPlans);
    };
    

    const handleAssign = () => {
        navigate("/AdminViewUser");
    };
    const handleCancel = () => {
        navigate("/AdminViewUser");
    };

    const validateForm = () => {
        let errors = {
            user: "",
        };

        if (!selectedUser) {
            errors.user = "User is required";
        }

        return errors;
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
            <Link to="/AdminAssignTrainingPlan"
              className={location.pathname.startsWith("/AdminAssignTrainingPlan") ? "breadcrumb-active" : "breadcrumb-not-active"}
            >
              Assign TP
            </Link>
          </nav>
        );
      }

    return (
        <>
        <div className="breadcrumb">{Breadcrumbs()}</div>
        <div className="user-form-container caliber-font">
            <ToastContainer />
            <form className="user-form ">
                <h2 className="title-lg font-xl">Assign Training Plan</h2>
                <Card className="Card caliber-font" style={{ padding: "15px" }}>
                    <div className="form-group">
                        <label className="font-sm" htmlFor="user">Select User:</label>
                        <select
                            id="user"
                            style={{ fontSize: "0.8rem" }}
                            className={`form-input ${formErrors.user && "input-error"}`}
                            value={selectedUser}
                            onChange={(e) => {
                                setSelectedUser(e.target.value);
                                setFormErrors({ ...formErrors, user: "" });
                            }}
                        >
                            <option className="font-sm" value="">Select User</option>
                            {users.map((user) => (
                                <option key={user.id} value={user.id}>
                                    {user.name}
                                </option>
                            ))}
                        </select>
                        {formErrors.user && <div className="error-message">{formErrors.user}</div>}
                    </div>
                    {userTrainingPlans.length > 0 && (
                        <div>
                            <h4 className="font-sm">Training Plans:</h4>
                            {userTrainingPlans.map((plan) => (
                                <div style={{ display: "flex", justifyContent: "space-between" }} key={plan.trainingPlanId} className="form-group">
                                    <label className="font-sm" htmlFor={`trainingPlan${plan.trainingPlanId}`}>
                                        {plan.trainingPlanName}
                                    </label>
                                    <input
                                        type="checkbox"
                                        id={`trainingPlan${plan.trainingPlanId}`}
                                        checked={plan.statusTP === true}
                                        onChange={() => handleToggleTrainingPlan(plan.trainingPlanId)}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <button onClick={handleAssign} className="button-container primaryBlue font-sm" type="button" style={{ width: "100%", height: "50px", marginRight: "10px" }}>
                            Assign
                        </button>
                        <button className="button-container primaryRed font-sm" type="button" style={{ width: "100%", height: "50px" }} onClick={handleCancel}>
                            Cancel
                        </button>
                    </div>
                </Card>
            </form>
        </div>
        </>
    );
};

export default AdminAssignTrainingPlan;
