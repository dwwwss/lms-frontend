import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useNavigate } from "react-router";
import { deletertrainingplan, gettrainingplan } from "../../api/user";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Common/Styles.css';

const AdminViewTrainingPlan = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteIndex, setDeleteIndex] = useState(null);
    const [apiData, setApiData] = useState([]);

    useEffect(() => {
        async function fetchTrainingPlans() {
            try {
                const apiResult = await gettrainingplan();
                setApiData(apiResult);
            } catch (error) {
                toast.error("Error");
            }
        }
        fetchTrainingPlans();
    }, []);

    const toggleDeleteModal = (index) => {
        setDeleteIndex(index);
        setShowDeleteModal(!showDeleteModal);
    };

    const handleDelete = async () => {
        try {
            const deletedUserId = apiData[deleteIndex].id;
            await deletertrainingplan(deletedUserId);
            setApiData(apiData.filter((course) => course.id !== deletedUserId));
        } catch (error) {
            toast.error("Error");
        }
        setShowDeleteModal(false);
    };

    const navigate = useNavigate();

    const handleEdit = (actionType, courseId) => {
        if (actionType === "add") {
            navigate("/AdminAddTrainingPlan", { state: { actionType } });
        } else if (actionType === "edit") {
            navigate("/AdminAddTrainingPlan", { state: { actionType, courseId } });
        }
    };
    function ShowPage(course) {
        navigate("/AdminTrainingCard", { state: { id: course.id, trainingPlanName: course.trainingPlanName } });
    }

    return (
        <div style={{ marginTop: "15px" }}>
            <ToastContainer />
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <h4 className="title-lg font-xl" style={{ marginTop: "12px" }}>Training Plans</h4>
                    <div style={{ width: "200px" }}>
                        <button
                            onClick={() => handleEdit("add")}
                            className="primaryBlue font-md"
                            style={{ width: "100%", height: "50px", marginTop: "0px" }}
                        >
                            Add Plan
                        </button>
                    </div>
                </div>
            </div>
            <Row style={{ marginTop: "5px" }}>
                {apiData.map((course, index) => (
                    <Col sm="6" lg="6" xl="3" key={index} style={{ padding: "10px" }}>
                        <Card className="Card caliber-font" style={{ padding: "10px" }} >
                            <LazyLoadImage onClick={() => ShowPage(course)}
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

                                <CardTitle className="Card-title caliber-font" tag="h5">{course.trainingPlanName}</CardTitle>
                                <CardSubtitle style={{ height: "40px" }}>
                                    {course.description && course.description.length > 40
                                        ? course.description.slice(0, 40) + "..."
                                        : course.description}
                                </CardSubtitle>
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
                <ModalHeader toggle={toggleDeleteModal}>Delete Training Plan</ModalHeader>
                <ModalBody>Are you sure you want to delete this Training Plan?</ModalBody>
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

export default AdminViewTrainingPlan;