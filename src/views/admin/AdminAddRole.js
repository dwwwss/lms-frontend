import React, { useState, useEffect } from "react";
import { Card } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { addRole, updateRole, roleById } from "../../api/user";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Common/Styles.css';
import { Link } from 'react-router-dom';

const AdminAddRole = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [roleName, setRoleName] = useState("");
  const [description, setDescription] = useState("");
  const [formErrors, setFormErrors] = useState({
    roleName: "",
    description: "",
  });

  const actionType = location.state?.actionType;
  let roleId = location.state?.roleId;

  useEffect(() => {
    if (actionType === "edit") {
      roleById(roleId)
        .then((response) => {
          const role = response;
          setRoleName(role.roleName);
          setDescription(role.description);
        })
        .catch((error) => {
          toast.error("Error");
        });
    }
  }, [actionType, roleId]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationErrors = validateForm();
    if (Object.values(validationErrors).some((error) => error !== "")) {
      setFormErrors(validationErrors);
      return;
    }

    if (actionType === "edit") {
      updateRole(roleId, roleName.trim(), description)
        .then((response) => {
          navigate("/AdminViewRole");
        })
        .catch((error) => {
          toast.error("Error");
        });
    } else if (actionType === "add") {
      addRole(roleName.trim(), description)
        .then((response) => {
          navigate("/AdminViewRole");
        })
        .catch((error) => {
          toast.error("Error");
        });
    }
  };

  const handleCancel = () => {
    navigate("../AdminViewRole");
  };

  const validateForm = () => {
    let errors = {
      roleName: "",
      description: "",
    };

    if (!roleName.trim()) {
      errors.roleName = "Role Name is required";
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
        <Link to="/AdminViewRole"
          className={location.pathname === "/AdminViewRole" ? "breadcrumb-active" : "breadcrumb-not-active"}
        >
          Role
        </Link>
        <span className="breadcrumb-arrow">&gt;</span>
        <Link to="/AdminAddRole"
          className={location.pathname.startsWith("/AdminAddRole") ? "breadcrumb-active" : "breadcrumb-not-active"}
        >
          {actionType === "edit" ? "Edit Role" : "Add Role"}
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
            {actionType === "edit" ? "Edit Role" : "Add Role"}
          </h2>
          <Card className="Card" style={{ padding: "15px" }}>
            <div className="form-group">
              <label className="font-sm" htmlFor="roleName">New Role:</label>
              <input
                type="text"
                id="roleName"
                className={`form-input ${formErrors.roleName && "input-error"}`}
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
                placeholder="Enter Role name"
                required
                style={{ marginTop: "-6px", fontSize: "14px", height: "50px", borderColor: "#9BA4B5" }}
              />
              {formErrors.roleName && <div className="error-message">{formErrors.roleName}</div>}
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

export default AdminAddRole;
