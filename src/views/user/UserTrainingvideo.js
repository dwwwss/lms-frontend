import React from "react";
import { Card, CardBody, Col, CardText, CardTitle } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { useLocation} from "react-router-dom";
import "../Common/Styles.css";

function UserTrainingvideo(props) {
  const location = useLocation();
  const navigate = useNavigate();

  const {cideoLink, courseTitle, courseDescription} = location.state;

  
  function BackTo() {
    navigate("/UserTrainingPlan");
}
 
  return (
    <>
      <Col sm="12" md="8" lg="6" className="mx-auto mt-4">
            <Card className="custom-card">
                <CardBody>
                    <CardTitle className="title-lg font-xl font-weight-bold">
                        {courseTitle}
                    </CardTitle>
                    <CardText className="font-md centered">{courseDescription}</CardText>
                    <div className="centered" >
                        <iframe
                            title="YouTube video player"
                            className="embed-responsive-item"
                            src={cideoLink}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            allowFullScreen
                            style={{ width: "400px", height: "240px" }}
                        ></iframe>
                    </div>
                    <div className="Paddings" style={{paddingLeft: "20px", paddingRight: "20px"}}>
                        <button onClick={() => BackTo()} className="button-container primaryBlue font-sm" type="submit" style={{ width: "100%", height: "50px" }}>Back</button>
                    </div>
                </CardBody>

            </Card>
        </Col>
    </>
  );
}

export default UserTrainingvideo;
