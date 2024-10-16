import React, { useState, useEffect } from "react";
import { Card } from "reactstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addcourse, getcourseid, updatecourse } from "../../api/user";
import '../Common/Styles.css';
import { Link } from 'react-router-dom';

const AdminAddCourse = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [videoLink, setVideoLink] = useState("");
    const [featuredImage, setFeaturedImage] = useState("");
    const actionType = location.state?.actionType;
    const courseId = location.state?.courseId;

    useEffect(() => {
        if (actionType === "edit" && courseId) {
            getCourseData(courseId);
        }
    }, [actionType, courseId]);

    const getCourseData = (courseId) => {
        getcourseid(courseId)
            .then((response) => {
                const course = response;
                setTitle(course.title);
                setDescription(course.description);
                setVideoLink(course.videoLink);
                setFeaturedImage(course.featuredImage);
            })
            .catch((error) => {
                toast.error("Error");
            });
    };

    const handleSubmit = (event) => {
        event.preventDefault();


        if (actionType === "edit") {
            updatecourse(courseId, title, description, videoLink, featuredImage)
                .then((response) => {
                    navigate("/AdminViewCourse");
                })
                .catch((error) => {
                    toast.error("Error updating course");
                });
        }
        else if (actionType === "add") {
            addcourse(title, description, videoLink, featuredImage)
                .then((response) => {
                    navigate("/AdminViewCourse");
                })
                .catch((error) => {
                    toast.error("Error adding course");
                });
        }
    };

    const handleCancel = () => {
        navigate("/AdminViewCourse");
    };
    function Breadcrumbs() {
        const location = useLocation();
    
        return (
          <nav >
            <Link to="/AdminViewCourse"
              className={location.pathname === "/AdminViewCourse" ? "breadcrumb-active" : "breadcrumb-not-active"}
            >
              Course
            </Link>
            <span className="breadcrumb-arrow">&gt;</span>
            <Link to="/AdminAddCourse"
              className={location.pathname.startsWith("/AdminAddCourse") ? "breadcrumb-active" : "breadcrumb-not-active"}
            >
              {actionType === "edit" ? "Edit Course" : "Add Course"}
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
                    {actionType === "edit" ? "Edit Course" : "Add Course"}
                </h2>
                <Card className="Card" style={{ padding: "15px" }}>
                    <div className="form-group">
                        <label className="font-sm" htmlFor="Title">Title:</label>
                        <input
                            type="text"
                            id="title"
                            className="form-input"
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
                        <label className="font-sm" htmlFor="videolink">Video link:</label>
                        <input
                            type="text"
                            id="videolink"
                            className="form-input"
                            value={videoLink}
                            placeholder="Enter Video link"
                            onChange={(e) => setVideoLink(e.target.value)}
                            required
                            style={{ marginTop: "-6px", fontSize: "14px", height: "50px", borderColor: "#9BA4B5" }}
                        />
                    </div>
                    <div className="form-group">
                        <label className="font-sm" htmlFor="featuredImage">Image URL:</label>
                        <input
                            type="text"
                            id="featuredImage"
                            className="form-input"
                            value={featuredImage}
                            placeholder="Enter Image URL"
                            onChange={(e) => setFeaturedImage(e.target.value)}
                            required
                            style={{ marginTop: "-6px", fontSize: "14px", height: "50px", borderColor: "#9BA4B5" }}
                        />
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

export default AdminAddCourse;
