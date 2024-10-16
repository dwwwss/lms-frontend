import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { gettrainingbyid } from "../../api/user";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { Card, CardText, CardBody, CardTitle, Row, Col } from "reactstrap";
import "../Common/Styles.css";

function UserTrainingCard() {
    const location = useLocation();
    var id = location.state.id;
    var trainingPlan = location.state.trainingPlanName;
    const [apiData, setApiData] = useState("");
    useEffect(() => {
        async function callApi() {
            const apiResult = await gettrainingbyid(id);
            setApiData(apiResult.trainingPlanCourses);
        }
        callApi();
    }, [id]);

    const navigate = useNavigate();

    function showurl(blg) {
        navigate('/UserTrainingvideo', { state: blg });
    }

    return (
        <div style={{ marginTop: "25px" }}>
            <h4 className="title-lg font-xl" style={{ marginBottom: "0px" }}>{trainingPlan}</h4>
            <Row>
                {apiData &&
                    apiData.map((apiDetails, index) => (
                        <Col sm="6" lg="6" xl="3" key={index} style={{ padding: "10px" }}>
                            <Card className="Card caliber-font" style={{ padding: "10px" }}>
                                <LazyLoadImage
                                    onClick={() => showurl(apiDetails)}
                                    loading="lazy"
                                    src={apiDetails.featuredImage}
                                    effect="blur"
                                    placeholderSrc={apiDetails.featuredImage}
                                    style={{
                                        width: "100%",
                                        height: "250px",
                                        objectFit: "cover",
                                        borderRadius: "5px"
                                    }}
                                />
                                <CardBody className="Paddings" style={{ paddingBottom: "5px" }}>
                                    <CardTitle className="Card-title caliber-font" tag="h5">{apiDetails.courseTitle}</CardTitle>
                                    <CardText style={{ height: "40px" }}>
                                        {apiDetails.courseDescription.length > 40 ? `${apiDetails.courseDescription.slice(0, 40)}...` : apiDetails.courseDescription}
                                    </CardText>
                                </CardBody>
                            </Card>
                        </Col>
                    ))}
            </Row>
        </div>
    );
}

export default UserTrainingCard;
