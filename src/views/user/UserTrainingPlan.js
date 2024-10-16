import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, CardSubtitle, Row, Col, Progress } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { assignedTrainingPlan, GetProgressTP } from "../../api/user";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import { useSelector } from 'react-redux';
import "../Common/Styles.css";

const UserTrainingPlan = () => {
    const [apiData, setApiData] = useState([]);
    const [apiData1, setApiData1] = useState([]);
    const [isError, setIsError] = useState("");
    const id = useSelector((state) => state.user.userId);

    useEffect(() => {
        async function callApi() {
            try {
                const response = await assignedTrainingPlan(id);
                const response1 = await GetProgressTP(id);
                setApiData(response);
                setApiData1(response1);
            } catch (error) {
                setIsError(error.message);
            }
        }
        callApi();
    }, []);

    const navigate = useNavigate();

    function ShowPage(blg) {
        navigate("/UserTrainingCard", { state: { id: blg.trainingPlanId, trainingPlanName: blg.trainingPlanName } });
        localStorage.setItem("trainingPlanId", blg.trainingPlanId);
    }

    return (
        <div style={{ marginTop: "25px" }}>
            <h4 className="title-lg font-xl" style={{ marginBottom: "0px" }}>My Training Plans</h4>
            <Row>
                {apiData ? (
                    apiData
                        .filter((blg) => blg.statusTP)
                        .map((blg, index) => {
                            return (
                                <Col sm="6" lg="6" xl="3" key={index} style={{ padding: "10px" }}>
                                    <Card className="Card caliber-font" style={{ padding: "10px" }} >
                                        <LazyLoadImage
                                            loading="lazy"
                                            src={blg.featuredImage}
                                            effect="blur"
                                            placeholderSrc={blg.featuredImage}
                                            style={{
                                                width: "100%",
                                                height: "250px",
                                                objectFit: "cover",
                                                borderRadius: "5px"
                                            }}
                                        />
                                        <CardBody className="Paddings" style={{ height: "100%" }}>
                                            <CardTitle className="Card-title caliber-font" tag="h5">{blg.trainingPlanName}</CardTitle>
                                            <CardSubtitle style={{ height: "60px" }}>{blg.description.length > 40 ? `${blg.description.slice(0, 40)}...` : blg.description}</CardSubtitle>
                                            {
                                                apiData1.map((data) => (
                                                    data.trainingPlanId === blg.trainingPlanId &&
                                                    <Progress key={data.trainingPlanId} value={data.progressPercentage} style={{ marginBottom: "5px" }}>{`${data.progressPercentage}%`}</Progress>
                                                ))
                                            }
                                        </CardBody>
                                        <div className="centered Paddings">
                                            <button onClick={() => ShowPage(blg)}
                                                className="button-container primaryBlue font-sm" type="submit"
                                                style={{ width: "100%", height: "50px" }}>Enroll</button>
                                        </div>
                                    </Card>
                                </Col>
                            );
                        })) : (
                    <h4 className="font-sm" style={{ padding: "10px", marginTop: "5%", marginLeft: "42%", width: "200px" }}>
                        No Trining Plan Assigned
                    </h4>
                )}
            </Row>
        </div>
    );
};

export default UserTrainingPlan;
