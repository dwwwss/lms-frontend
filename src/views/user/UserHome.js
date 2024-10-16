import React, { useState, useEffect } from "react";
import { Card, CardBody, CardTitle } from "reactstrap";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  FormControl,
  Select,
  MenuItem,
  Checkbox
} from "@mui/material";
import { statusUpdate, priorityUpdate, assignedTrainingPlan } from "../../api/user";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector } from "react-redux";
import "../Common/Styles.css";

const UserHome = () => {
  const [apiData, setApiData] = useState([]);
  const [expandedTrainingPlan, setExpandedTrainingPlan] = useState(null);
  const id = useSelector((state) => state.user.userId);
  const userName = useSelector((state) => state.user.userName);
  const [defaultStatusId, setDefaultStatusId] = useState(1);
  const [defaultPriorityId, setDefaultPriorityId] = useState(2);

  useEffect(() => {
    async function fetchData() {
      try {
        const assignedTrainingData = await assignedTrainingPlan(id);
        setApiData(assignedTrainingData);

        // Set default status and priority from the API response
        const defaultStatus = assignedTrainingData[0]?.trainingPlanCourses[0]?.assigncoursestatus_id;
        const defaultPriority = assignedTrainingData[0]?.trainingPlanCourses[0]?.assigncoursepriority_id;

        setDefaultStatusId(defaultStatus || 2);
        setDefaultPriorityId(defaultPriority || 2);
      } catch (error) {
        toast.error("Error fetching training data");
      }
    }

    fetchData();
  }, [id]);

  const toggleTrainingPlan = (trainingPlanId) => {
    setExpandedTrainingPlan((prev) => (prev === trainingPlanId ? null : trainingPlanId));
  };

  const handleStatusChange = async (event, courseId, trainingPlanId) => {
    const statusIdMap = {
      "Incomplete": 1,
      "InProgress": 2,
      "Completed": 3,
    };
    const statusId = statusIdMap[event.target.value];

    const updatedTrainingData = apiData.map((trainingPlan) => {
      if (trainingPlan.trainingPlanId === trainingPlanId) {
        const updatedCourses = trainingPlan.trainingPlanCourses.map((course) => {
          if (course.courseId === courseId) {
            return { ...course, status: event.target.value };
          }
          return course;
        });

        return { ...trainingPlan, trainingPlanCourses: updatedCourses };
      }
      return trainingPlan;
    });

    setApiData(updatedTrainingData);

    try {
      const currentCourse = updatedTrainingData
        .find((plan) => plan.trainingPlanId === trainingPlanId)
        .trainingPlanCourses.find((course) => course.courseId === courseId);

      const response = await statusUpdate(
        id,
        courseId,
        trainingPlanId,
        statusId,
        currentCourse.assigncoursepriority_id || defaultPriorityId
      );

      toast.success("Status Updated");
    } catch (error) {
      toast.error("Error updating status");
    }
  };

  const handlePriorityChange = async (event, courseId, trainingPlanId) => {
    const priorityIdMap = {
      High: 3,
      Medium: 2,
      Low: 1,
    };

    const priorityId = priorityIdMap[event.target.value];

    const updatedTrainingData = apiData.map((trainingPlan) => {
      if (trainingPlan.trainingPlanId === trainingPlanId) {
        const updatedCourses = trainingPlan.trainingPlanCourses.map((course) => {
          if (course.courseId === courseId) {
            return { ...course, priority: event.target.value };
          }
          return course;
        });

        return { ...trainingPlan, trainingPlanCourses: updatedCourses };
      }
      return trainingPlan;
    });

    setApiData(updatedTrainingData);

    try {
      const currentCourse = updatedTrainingData
        .find((plan) => plan.trainingPlanId === trainingPlanId)
        .trainingPlanCourses.find((course) => course.courseId === courseId);

      const response = await priorityUpdate(
        id,
        courseId,
        trainingPlanId,
        priorityId,
        currentCourse.assigncoursestatus_id || defaultStatusId,
      );

      toast.success("Priority Updated");
    } catch (error) {
      toast.error("Error updating priority");
    }
  };

  return (
    <>
      <ToastContainer />
      <div style={{ marginTop: "20px" }} className="maincontainer caliber-font">
        <div className="d-flex justify-content-start">
          <div className="title-lg font-xl">Welcome {userName}</div>
        </div>

        <TableContainer component={Card} style={{ marginBottom: "15px" }}>
          <CardBody>
            <CardTitle className="title-lg font-lg mt-2" tag="h5">
              Your Training Course Status
            </CardTitle>
            <Table>
              <TableBody>
                {apiData ? (
                  apiData
                    .filter((trainingPlan) => trainingPlan.statusTP)
                    .map((trainingPlan, index) => (
                      <React.Fragment key={index}>
                        <TableRow
                          className="table-info"
                          style={{
                            borderBottom: "1px solid #ddd",
                            borderRadius: "50%",
                          }}
                        >
                          <TableCell className="table-paddings">
                            <Checkbox
                              checked={trainingPlan.trainingPlanId === expandedTrainingPlan}
                              onChange={() => toggleTrainingPlan(trainingPlan.trainingPlanId)}
                            />
                          </TableCell>
                          <TableCell className="table-paddings">
                            <div
                              onClick={() => toggleTrainingPlan(trainingPlan.trainingPlanId)}
                              style={{ cursor: "pointer" }}
                            >
                              <div className="ms-2">
                                <h4 style={{marginBottom: "0px"}} className="font-sm">
                                  {trainingPlan.trainingPlanName}
                                </h4>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell style={{color: "white"}}>Course Status</TableCell>
                          <TableCell style={{color: "white"}}>Course Priority</TableCell>
                          <TableCell colSpan={3}></TableCell>
                        </TableRow>
                        {expandedTrainingPlan === trainingPlan.trainingPlanId && (
                          <React.Fragment>
                            <TableRow >
                              <TableCell className="table-paddings" style={{ fontWeight: "bold" }}>
                                S. No.
                              </TableCell>
                              <TableCell className="table-paddings" style={{ fontWeight: "bold" }}>
                                Course Name
                              </TableCell>
                              <TableCell className="table-paddings" style={{ fontWeight: "bold"}}>
                              <div className="d-flex align-items-center justify-content-center">
                                Status
                              </div>
                              </TableCell>
                              <TableCell className="table-paddings" style={{ fontWeight: "bold" }}>
                              <div className="d-flex align-items-center justify-content-center">
                                Priority
                              </div>
                              </TableCell>
                            </TableRow>
                            {trainingPlan.trainingPlanCourses.map((tdata, courseIndex) => (
                              <TableRow
                                key={`${index}-${courseIndex}`}
                                className="table-info"
                                style={{
                                  borderBottom: "1px solid #ddd",
                                  borderRadius: "50%",
                                }}
                              >
                                <TableCell className="table-paddings" >
                                  <h6 className="table-gaps">{courseIndex + 1}</h6>
                                </TableCell>
                                <TableCell className="table-paddings">
                                  <div className="d-flex align-items-center">
                                    <div className="ms-2">
                                      <h6 className="font-sm" >
                                        {tdata.courseTitle}
                                      </h6>
                                    </div>
                                  </div>
                                </TableCell>
                                <TableCell className="font-sm">
                                <div className="d-flex align-items-center justify-content-center">
                                  <FormControl >
                                    <Select
                                      className="font-sm"
                                      value={tdata.status}
                                      onChange={(event) => handleStatusChange(event, tdata.courseId, trainingPlan.trainingPlanId)}
                                      style={{
                                        maxHeight: "25px",
                                        minWidth: "100px",
                                        borderRadius: "20px",
                                        background:
                                          tdata.status === "Completed" ? "#00ff00" : tdata.status === "InProgress" ? "#46bdc6" : "#ff6d01",
                                      }}
                                    >
                                      <MenuItem className="font-sm" value="Incomplete">
                                        Incomplete
                                      </MenuItem>
                                      <MenuItem className="font-sm" value="InProgress">
                                      InProgress
                                      </MenuItem>
                                      <MenuItem className="font-sm" value="Completed">
                                        Completed
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                  </div>
                                </TableCell>
                                <TableCell className="font-sm">
                                <div className="d-flex align-items-center justify-content-center">
                                  <FormControl>
                                    <Select
                                      className="font-sm"
                                      value={tdata.priority}
                                      onChange={(event) => handlePriorityChange(event, tdata.courseId, trainingPlan.trainingPlanId)}
                                      style={{
                                        minWidth: "100px",
                                        maxHeight: "25px",
                                        borderRadius: "20px",
                                        background:
                                          tdata.priority === "High" ? "#ff6d01" : tdata.priority === "Medium" ? "#FFD700" : "#16FF00",
                                      }}
                                    >
                                      <MenuItem className="font-xs" value="High">
                                        High
                                      </MenuItem>
                                      <MenuItem className="font-xs" value="Medium">
                                        Medium
                                      </MenuItem>
                                      <MenuItem className="font-xs" value="Low">
                                        Low
                                      </MenuItem>
                                    </Select>
                                  </FormControl>
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </React.Fragment>
                        )}
                      </React.Fragment>
                    ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={5}>
                      <h4 className="font-sm" style={{ padding: "10px", marginLeft: "40%", width: "200px" }}>
                        No Data Available
                      </h4>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardBody>
        </TableContainer>
      </div>
    </>
  );
};

export default UserHome;
