import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { useLocation, useNavigate} from "react-router-dom";
import { gettrainingbyid } from "../../api/user";
import CourseCard from "../Common/Card";
import "../Common/Styles.css";

function AdminTrainingCard() {
  const location = useLocation();
  const navigate = useNavigate();
  var id = location.state.id;
  var trainingPlan = location.state.trainingPlanName;
  const [apiData, setApiData] = useState("");

  useEffect(() => {
    async function callApi() {
      const apiResult = await gettrainingbyid(id) 
      setApiData(apiResult.trainingPlanCourses);
    }
    callApi();
  }, [id]);

  const showUrl = (blg) => {
    navigate('/Coursedetail', { state: blg});
  };

  return (
    <div style={{ marginTop: "25px" }}>
      <Row>
        <h4 className="title-lg font-xl" style={{ marginBottom: "0px" }}>{trainingPlan}</h4>
        {apiData && apiData.map((apiDetails, index) => (
          <Col sm="6" lg="6" xl="3" key={index} style={{ padding: "10px" }}>
            <CourseCard
              id={apiDetails.id}
              title={apiDetails.courseTitle}
              description={apiDetails.courseDescription}
              featuredImage={apiDetails.featuredImage}
              videoLink={apiDetails.cideoLink}
              onClick={(data) => showUrl(data)}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
}
export default AdminTrainingCard;

