import React, { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../Common/Styles.css";
import { getcourse } from "../../api/user";
import { useNavigate } from "react-router-dom";
import CourseCard from "../Common/Card";
import { Link, useLocation } from 'react-router-dom';

const UserCourses = () => {
  const [apiData, setApiData] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function callApi() {
      try {
        const response = await getcourse();
        setApiData(response);
      } catch (error) {
        toast.error("Error");
      }
    }
    callApi();
  }, []);

  const showDetail = (data) => {
    navigate("/UserCoursesCard", { state: data });
  };

  function Breadcrumbs() {
    const location = useLocation();
  
    return (
      <nav>
        <Link to="/UserCourses"
          className={location.pathname === "/UserCourses" ? "breadcrumb-active" : "breadcrumb-not-active"}
        >
          Courses
        </Link>
      </nav>
    );
  }

  return (
    <div style={{ marginTop: "25px" }}>
      <div>{Breadcrumbs()}</div>
      <ToastContainer />
      <h4 className="title-lg font-xl" style={{ marginBottom: "0px" }}>Courses</h4>
      <Row>
        {apiData &&
          apiData.map((apiDetails, index) => (
            <Col sm="6" lg="6" xl="3" key={index} style={{ padding: "10px" }}>
              <CourseCard
                id={apiDetails.id}
                title={apiDetails.title}
                description={apiDetails.description}
                featuredImage={apiDetails.featuredImage}
                videoLink={apiDetails.videoLink}
                onClick={(data) => showDetail(data)}
              />
            </Col>
          ))}
      </Row>
    </div>
  );
};
export default UserCourses;

