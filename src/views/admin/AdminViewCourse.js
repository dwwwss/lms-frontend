import React from "react";
import { Card, CardBody, CardTitle, Button, Row, Col, Modal, ModalHeader, CardSubtitle, ModalBody, ModalFooter, Input } from "reactstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { getcourse, deletecourse } from "../../api/user";
import { Search } from 'react-bootstrap-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Common/Styles.css';

const AdminViewCourse = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [apiData, setApiData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [manualSearchQuery, setManualSearchQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function callApi() {
            try {
                const apiResult = await getcourse();
                setApiData(apiResult);
                setFilteredData(apiResult);
            } catch (error) {
                toast.error("Error");
            }
        }
        callApi();
    }, []);

    const toggleDeleteModal = (index) => {
        setDeleteIndex(index);
        setShowDeleteModal(!showDeleteModal);
    };

    const handleDelete = async () => {
        try {
            const deletedCourseId = filteredData[deleteIndex].id;
            await deletecourse(deletedCourseId);
            setApiData(apiData.filter((course) => course.id !== deletedCourseId));
            setFilteredData(filteredData.filter((course) => course.id !== deletedCourseId));
            
        } catch (error) {
            toast.error("Error");
        }
        setShowDeleteModal(false);
    };

    const handleEdit = (actionType, courseId) => {
        if (actionType === "add") {
            navigate("/AdminAddCourse", { state: { actionType } });
        } else if (actionType === "edit") {
            navigate("/AdminAddCourse", { state: { actionType, courseId } });
        }
    };

    const handleSearch = () => {
        const query = manualSearchQuery.trim();
        setSearchQuery(query);
        const filteredCourses = apiData.filter((course) =>
            course.title.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filteredCourses);
    };

    useEffect(() => {
        if (manualSearchQuery === "") {
            setFilteredData(apiData);
        }
    }, [manualSearchQuery, apiData]);

    function showdetail(course) {
        navigate("/Coursedetail", { state: course })
    }
    return (
        <div style={{ marginTop: "15px" }}>
            <ToastContainer />
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                    <h4 className="title-lg font-xl" style={{ marginTop: "12px" }}>Courses</h4>
                    <div style={{ width: "200px" }}>
                        <button
                            onClick={() => handleEdit("add")}
                            className="primaryBlue font-md"
                            style={{ width: "100%", height: "50px", marginTop: "0px" }}
                        >
                            Add Course
                        </button>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <Input
                        style={{ flex: "1", height: "40px", marginRight: "5px" }}
                        type="text"
                        name="search"
                        id="search"
                        placeholder="Search by name"
                        value={manualSearchQuery}
                        onChange={(e) => setManualSearchQuery(e.target.value)}
                    />
                    <Button
                        className="btn btn-primary caliber-font"
                        style={{ height: "40px" }}
                        onClick={handleSearch}
                    >
                        <Search size={20} />
                    </Button>
                </div>
            </div>
            <Row style={{ marginTop: "5px" }}>
                {filteredData && filteredData.map((course, index) => (
                    <Col sm="6" lg="6" xl="3" key={index} style={{ padding: "10px" }}>
                        <Card className="Card caliber-font" style={{ padding: "10px" }} >
                            <LazyLoadImage onClick={() => showdetail(course)}
                                loading="lazy"
                                src={course.featuredImage}
                                effect="blur"
                                placeholderSrc={course.featuredImage}
                                style={{
                                    width: "100%",
                                    height: "250px",
                                    objectFit: "cover",
                                    borderRadius: "5px"
                                }}
                            />
                            <CardBody className="Paddings" style={{ height: "100%" }}>
                                <CardTitle className="Card-title caliber-font" tag="h5">{course.title}</CardTitle>
                                <CardSubtitle style={{ height: "40px" }}>{course.description.length > 40
                                    ? `${course.description.slice(0, 40)}...`
                                    : course.description}</CardSubtitle>
                            </CardBody>
                            <div className="Paddings" style={{ display: "flex", justifyContent: "space-between" }}>
                                <button onClick={() => handleEdit("edit", course.id)}
                                    className="button-container primaryBlue font-sm" type="submit"
                                    style={{ width: "100%", height: "50px", marginRight: "10px" }}>Edit</button>
                                <button onClick={() => toggleDeleteModal(index)}
                                    className="button-container primaryRed font-sm" type="submit"
                                    style={{ width: "100%", height: "50px" }}>Delete</button>
                            </div>
                        </Card>
                    </Col>
                ))}
            </Row>
            <Modal isOpen={showDeleteModal} toggle={toggleDeleteModal}>
                <ModalHeader toggle={toggleDeleteModal}>Delete Course</ModalHeader>
                <ModalBody>Are you sure you want to delete this course?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button color="secondary" onClick={toggleDeleteModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default AdminViewCourse;