import React, { useState, useEffect } from "react";
import { Card } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { addtraining, updatetraining, gettrainingbyid } from "../../api/user";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Table } from "reactstrap";
import '../Common/Styles.css';
import { Link } from 'react-router-dom';

const AdminAddTrainingPlan = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [trainingPlanCourses, settrainingPlanCourses] = useState({});
    const [coursesIdData, setCoursesIdData] = useState([]);
    const [apiData, setApiData] = useState("")
    const [featuredImage, setfeaturedImage] = useState("")
    const actionType = location.state?.actionType;
    let courseId = location.state?.courseId;
    let history = location.state.history;
    courseId = history ? history : location.state?.courseId;

    useEffect(() => {
        if (actionType === "edit") {
            gettrainingbyid(courseId)
                .then((response) => {
                    const user = response;
                    setTitle(user.trainingPlanName);
                    setDescription(user.description);
                    settrainingPlanCourses(coursesIdData);
                    setfeaturedImage(user.featuredImage);
                    setApiData(user.trainingPlanCourses);
                    setCoursesIdData(apiData.Id);
                })
                .catch((error) => {
                    toast.error("Error");
                });
        }
    }, [actionType, location]);

    const handleSubmit = (event) => {
        event.preventDefault();

        if (actionType === "edit") {
            updatetraining(courseId, title, description, trainingPlanCourses, featuredImage)
                .then((response) => {
                    navigate("/AdminViewTrainingPlan");
                })
                .catch((error) => {
                    toast.error("Error");
                });

        } else if (actionType === "add") {
            addtraining(title, description, featuredImage)
                .then((response) => {
                    navigate("/AdminViewTrainingPlan");
                })
                .catch((error) => {
                    toast.error("Error");
                });
        }
    };

    const handleCancel = () => {
        navigate("/AdminViewTrainingPlan");
    };

    function addcourse() {
        navigate("/AdminAddTrainingPlanCourses", { state: { selectedTrainingPlan: courseId, actionType: actionType } })
    }
    function Breadcrumbs() {
        const location = useLocation();

        return (
            <nav >
                <Link to="/AdminViewTrainingPlan"
                    className={location.pathname === "/AdminViewTrainingPlan" ? "breadcrumb-active" : "breadcrumb-not-active"}
                >
                    Training Plan
                </Link>
                <span className="breadcrumb-arrow">&gt;</span>
                <Link to="/AdminAddTrainingPlan"
                    className={location.pathname.startsWith("/AdminAddTrainingPlan") ? "breadcrumb-active" : "breadcrumb-not-active"}
                >
                    {actionType === "edit" ? "Edit Training Plan" : "Add Training Plan"}
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
                    <h2 className="title-lg font-xl">
                        {actionType === "edit" ? "Edit Training Plan" : "Add Training Plan"}
                    </h2>
                    <Card className="Card" style={{ padding: "15px" }}>
                        <div className="form-group">
                            <label className="font-sm" htmlFor="Title">Title:</label>
                            <input
                                type="text"
                                id="title"
                                className="form-input  "
                                value={title}
                                placeholder="Enter Title"
                                onChange={(e) => setTitle(e.target.value)}
                                required
                                style={{ marginTop: "-6px", fontSize: "14px", height: "50px", borderColor: "#9BA4B5" }}
                            />
                        </div>
                        <div className="form-group">
                            <label className="font-sm" htmlFor="Description">Description:</label>
                            <input
                                type="text"
                                id="description"
                                className="form-input"
                                value={description}
                                placeholder="Enter Description"
                                onChange={(e) => setDescription(e.target.value)}
                                required
                                style={{ marginTop: "-6px", fontSize: "14px", height: "50px", borderColor: "#9BA4B5" }}
                            />
                        </div>
                        <div className="form-group">
                            <label className="font-sm" htmlFor="Title">Image URL:</label>
                            <input
                                type="text"
                                id="featureImage"
                                className="form-input  "
                                value={featuredImage}
                                placeholder="Enter Image URL"
                                onChange={(e) => setfeaturedImage(e.target.value)}
                                required
                                style={{ marginTop: "-6px", fontSize: "14px", height: "50px", borderColor: "#9BA4B5" }}
                            />
                        </div>

                        {(actionType === "edit") && (

                            <>
                                <div className="form-group">
                                    <label htmlFor="videolink">Courses:</label>
                                    <button className="button-container primaryBlue font-sm" type="button" style={{ width: "100%", height: "50px" }} onClick={addcourse}>
                                        Add Courses
                                    </button>
                                </div>
                                <Table bordered hover >
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Course ID</th>
                                            <th>Course Name</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {Array.isArray(apiData) && apiData.length > 0 ? (
                                            apiData.map((blg, i) => (
                                                <tr key={i}>
                                                    <th scope="row">{i + 1}</th>
                                                    <td>{blg.FkCourseId}</td>
                                                    <td>{blg.courseTitle}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="3">No data available</td>
                                            </tr>
                                        )}

                                    </tbody>
                                </Table>

                            </>
                        )}
                        <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <button className="button-container primaryBlue font-sm" type="submit" style={{ width: "100%", height: "50px", marginRight: "10px" }} onClick={handleSubmit}>
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

export default AdminAddTrainingPlan;
