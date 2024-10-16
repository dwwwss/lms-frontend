import React, { useState, useEffect } from "react";
import { Card } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { addDesignation, updateDesignation, designationsById } from "../../api/user";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Common/Styles.css';
import { Link } from 'react-router-dom';

const AdminAddDesignation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [designationName, setDesignationName] = useState("");
  const [description, setDescription] = useState("");
  const [formErrors, setFormErrors] = useState({
    designationName: "",
    description: "",
  });

  const actionType = location.state?.actionType;
  let designationId = location.state.designationId;

  useEffect(() => {
    if (actionType === "edit") {
      designationsById(designationId)
        .then((response) => {
          const designation = response;
          setDesignationName(designation.designationName);
          setDescription(designation.description);
        })
        .catch((error) => {
          toast.error("Error");
        });
    }
  }, [actionType, location, designationId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.values(validationErrors).some((error) => error !== "")) {
      setFormErrors(validationErrors);
      return;
    }

    if (actionType === "edit") {
      updateDesignation(designationId, designationName.trim(), description)
        .then((response) => {
          navigate("/AdminViewDesignation");
        })
        .catch((error) => {
          toast.error("Error");
        });
    } else if (actionType === "add") {
      addDesignation(designationName.trim(), description)
        .then((response) => {
          navigate("/AdminViewDesignation");
        })
        .catch((error) => {
          toast.error("Error");
        });
    }
  };

  const handleCancel = () => {
    navigate("../AdminViewDesignation");
  };

  const validateForm = () => {
    let errors = {
      designationName: "",
      description: "",
    };

    if (!designationName.trim()) {
      errors.designationName = "Designation Name is required";
    }

    if (!description.trim()) {
      errors.description = "Description is required";
    }
    return errors;
  };

  function Breadcrumbs() {
    const location = useLocation();

    return (
      <nav >
        <Link to="/AdminViewDesignation"
          className={location.pathname === "/AdminViewDesignation" ? "breadcrumb-active" : "breadcrumb-not-active"}
        >
          Designation
        </Link>
        <span className="breadcrumb-arrow">&gt;</span>
        <Link to="/AdminAddDesignation"
          className={location.pathname.startsWith("/AdminAddDesignation") ? "breadcrumb-active" : "breadcrumb-not-active"}
        >
          {actionType === "edit" ? "Edit Designation" : "Add Designation"}
        </Link>
      </nav>
    );
  }

  return (
    <>
    <div className="breadcrumb">{Breadcrumbs()}</div>
    
    <div className="user-form-container caliber-font">
      <ToastContainer />
      <form onSubmit={handleSubmit} className="user-form">
        <h2 className="title-lg font-xl">
          {actionType === "edit" ? "Edit Designation" : "Add Designation"}
        </h2>
        <Card className="Card" style={{ padding: "15px" }}>
          <div className="form-group">
            <label className="font-sm" htmlFor="designationName" style={{width: "200px"}}>Designation Name:</label>
            <input
              type="text"
              id="designationName"
              className={`form-input ${formErrors.designationName && "input-error"}`}
              value={designationName}
              onChange={(e) => setDesignationName(e.target.value)}
              placeholder="Enter designation name"
              required
              style={{ marginTop: "-6px", fontSize: "14px", height: "50px", borderColor: "#9BA4B5" }}
            />
            {formErrors.designationName && <div className="error-message">{formErrors.designationName}</div>}
          </div>
          <div className="form-group">
            <label className="font-sm" htmlFor="description">Description:</label>
            <textarea
              id="description"
              className={`form-input ${formErrors.description && "input-error"}`}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter description"
              required
              style={{ marginTop: "-6px", fontSize: "14px", height: "100px", borderColor: "#9BA4B5" }}
            />
            {formErrors.description && <div className="error-message">{formErrors.description}</div>}
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
    </div>
    </>
  );
};

export default AdminAddDesignation;
