import React from 'react';
import { Table, Input, Button, Card } from "reactstrap";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { getcourse, addTPcourse } from "../../api/user";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Search } from 'react-bootstrap-icons';
import '../Common/Styles.css';

const AdminAddTrainingPlanCourses = () => {
    const location = useLocation();
    const selectedTrainingPlan = location.state.selectedTrainingPlan;
    const [apiData, setApiData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [manualSearchQuery, setManualSearchQuery] = useState("");
    const actionType = location.state?.actionType;
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

    const handleCheckboxChange = (id) => {
        const updatedData = apiData.map((blg) => {
            if (blg.id === id) {
                toast.success("Added");
                blg.isChecked = !blg.isChecked;
                localStorage.setItem(`checkbox_${id}`, blg.isChecked ? "true" : "false");
            }
            return blg;
        });

        setApiData(updatedData);
    };

    const navigate = useNavigate();

    const addCheckedCourses = async () => {
        const checkedCourses = apiData.filter((blg) => blg.isChecked);
        const requests = checkedCourses.map((course) =>
            addTPcourse(selectedTrainingPlan, course.id)
        );

        try {
            await Promise.all(requests);
            if (location.state && location.state.actionType === "edit") {
                navigate("/AdminAddTrainingPlan", { state: { actionType: "edit", history: selectedTrainingPlan } });
            } else {
                navigate("/AdminAddTrainingPlan", { state: { actionType: "add" } });
            }
        } catch (error) {
            toast.error("Error in Adding");
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

    const handleCancel = () => {
        if (actionType === "edit") {
            navigate("/AdminAddTrainingPlan", { state: { actionType: "edit", history: selectedTrainingPlan } });
        } else {
            navigate("/AdminAddTrainingPlan", { state: { actionType: "add" } });
        }
    };

    

    return (
        <>
            <ToastContainer />
            <h4 style={{marginTop: "10px"}} className="title-lg font-xl">Add Training Plan Courses</h4>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "10px" }}>
                <Input
                    style={{ flex: "1", height: "40px", marginRight: "10px" }}
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
            <Card className="Card" style={{ padding: "15px" }}>
                <Table bordered hover className="caliber-font">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Course</th>
                            <th>Manage</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredData.map((blg, i) => (
                            <tr key={i}>
                                <th scope="row">{blg.id}</th>
                                <td>{blg.title}</td>
                                <td>
                                    <input
                                        type="checkbox"
                                        checked={blg.isChecked || false}
                                        onChange={() => handleCheckboxChange(blg.id)}
                                    ></input>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
                <div style={{ display: "flex", justifyContent: "space-between", width: "400px", marginLeft: "25%" }}>
                    <button
                        onClick={addCheckedCourses}
                        type="submit"
                        className="primaryBlue font-md"
                        style={{ width: "100%", height: "50px", marginRight: "10px", marginTop: "0px" }}
                    >
                        Save
                    </button>
                    <button
                        onClick={handleCancel}
                        type="button"
                        className="primaryRed font-md"
                        style={{ width: "100%", height: "50px", marginTop: "0px" }}
                    >
                        Cancel
                    </button>
                </div>
            </Card>
        </>
    );
};

export default AdminAddTrainingPlanCourses;
