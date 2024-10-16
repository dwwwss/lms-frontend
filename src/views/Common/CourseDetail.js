import React from "react";
import { Card, CardBody, CardTitle, CardText, Col } from "reactstrap";
import { useNavigate } from "react-router-dom";
import "./Styles.css";

function CourseDetailComponent({ title, description, videoLink, navigateBackPath }) {
    const navigate = useNavigate();

    function navigateBack() {
        navigate(navigateBackPath);
    } 
    return (
        <Col sm="12" md="8" lg="6" className="mx-auto mt-4">
            <Card className="custom-card">
                <CardBody>
                    <CardTitle className="title-lg font-xl font-weight-bold">
                        {title}
                    </CardTitle>
                    <CardText className="font-md centered">{description}</CardText>
                    <div className="centered">
                        <iframe
                            title="YouTube video player"
                            className="embed-responsive-item"
                            src={videoLink}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            style={{ width: "400px", height: "240px" }}
                        ></iframe>
                    </div>
                    <div className="Paddings" style={{ paddingLeft: "20px", paddingRight: "20px" }}>
                        <button
                            onClick={navigateBack}
                            className="button-container primaryBlue font-sm"
                            type="submit"
                            style={{ width: "100%", height: "50px" }}
                        >
                            Back
                        </button>
                    </div>
                </CardBody>
            </Card>
        </Col>
    );
}

export default CourseDetailComponent;
