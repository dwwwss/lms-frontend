import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Row, Col, CardImg, Badge, CardImgOverlay } from 'reactstrap';
import CountUp from "react-countup";
import { countapi } from "../../api/user";
import { useNavigate } from "react-router";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Common/Styles.css';

const AdminHome = () => {
    const [count, setCount] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        async function callapi() {
            try {
                const response = await countapi();
                setCount(response);
            } catch (error) {
                toast.error("Error");
            }
        }
        callapi();
    }, []);


    const userPage = () => {
        navigate('/AdminAddUser')
    }
    const coursePage = () => {
        navigate('/AdminAddCourse')
    }
    const TPPage = () => {
        navigate('/AdminAddRole')
    }

    return (
        <div className="admin-dashboard caliber-font" style={{marginTop: "25px"}}>
            <ToastContainer />
            <h1 className="dashboard-title">Admin Dashboard</h1>
            <div className="summary-container">
                <Card className="summary-card">
                    <CardBody>
                        <p className="summary-content">
                            Welcome to the Admin Dashboard. Manage and track your learning resources efficiently. Gain insights into courses, users, and training plans.
                        </p>
                    </CardBody>
                </Card>
            </div>

            <Row className="mt-4">
                <Col md="4">
                    <Card className="counting-item">
                        <CardBody>
                            <CardTitle style={{ fontWeight: "bold" }}>Total Users</CardTitle>
                            <div className="counting-number">
                                <Badge color="primary">
                                    <CountUp start={0} end={count.userCount} duration={3} delay={0.5} />
                                </Badge>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="4">
                    <Card className="counting-item">
                        <CardBody>
                            <CardTitle style={{ fontWeight: "bold" }}>Total Courses</CardTitle>
                            <div className="counting-number">
                                <Badge color="success">
                                    <CountUp start={0} end={count.courseCount} duration={3} delay={0.5} />
                                </Badge>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
                <Col md="4">
                    <Card className="counting-item">
                        <CardBody>
                            <CardTitle style={{ fontWeight: "bold" }}>Total Training Plans</CardTitle>
                            <div className="counting-number">
                                <Badge color="warning">
                                    <CountUp start={0} end={count.trainingPlanCount} duration={3} delay={0.5} />
                                </Badge>
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <div className="quick-actions-container mt-4" >
                <h2 className="dashboard-title">Quick Actions</h2>
                <Row>
                    <Col md="4">
                        <Card onClick={userPage} className="quick-action-card">
                            <CardImg top width="100%" src="https://img.freepik.com/premium-vector/programmer-engineering-development-coding-web-development-website-design-developer-vector_199064-126.jpg?size=626&ext=jpg&ga=GA1.2.1123810163.1681367198&semt=sph" alt="User Image" style={{ opacity: 0.5 }} />
                            <CardImgOverlay style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <CardTitle className="quick-action-title" style={{ fontWeight: "bolder", marginTop: "-30%" }}>Manage User</CardTitle>
                                <i className="fa-regular fa-square-plus"  style={{ cursor: 'pointer', color: '#000', fontSize: '84px', marginTop: "-20px" }}></i>
                            </CardImgOverlay>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card onClick={coursePage} className="quick-action-card">
                            <CardImg top width="100%" src="https://img.freepik.com/premium-vector/new-idea-generation-flat-style-illustration-vector-design_538610-373.jpg?size=626&ext=jpg&ga=GA1.1.1026530707.1684471886&semt=ais" alt="Course Image" style={{ opacity: 0.5 }} />
                            <CardImgOverlay style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <CardTitle className="quick-action-title" style={{ fontWeight: "bolder", marginTop: "-30%" }}>Manage Course</CardTitle>
                                <i className="fa-regular fa-square-plus"  style={{ cursor: 'pointer', color: '#000', fontSize: '84px', marginTop: "-20px" }}></i>
                            </CardImgOverlay>
                        </Card>
                    </Col>
                    <Col md="4">
                        <Card onClick={TPPage} className="quick-action-card">
                            <CardImg top width="100%" src="https://img.freepik.com/free-vector/online-education-background_52683-7795.jpg?size=626&ext=jpg&ga=GA1.1.1026530707.1684471886&semt=ais" alt="Another Image" style={{ opacity: 0.5 }} />
                            <CardImgOverlay style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-evenly' }}>
                                <CardTitle className="quick-action-title" style={{ fontWeight: "bolder", marginTop: "-30%" }}>Manage Role</CardTitle>
                                <i className="fa-regular fa-square-plus"  style={{ cursor: 'pointer', color: '#000', fontSize: '84px', marginTop: "-20px" }}></i>
                            </CardImgOverlay>
                        </Card>
                    </Col>
                </Row>
            </div>
        </div>
    );
};

export default AdminHome;
