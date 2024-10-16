import React from "react";
import { useLocation} from "react-router-dom";
import CourseDetailComponent from "../Common/CourseDetail";
import "../Common/Styles.css";

function UserCourseDetail(props) {
    const location = useLocation();
    const { title, description, videoLink } = location.state;

    return <CourseDetailComponent title={title} description={description} videoLink={videoLink} navigateBackPath="/AdminViewCourse" />;
}
export default UserCourseDetail;
