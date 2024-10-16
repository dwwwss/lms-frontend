import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { Table } from "@mui/material";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { userapi, deleteuser } from "../../api/user";
import { useNavigate } from "react-router";
import { Search } from 'react-bootstrap-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Common/Styles.css';

const AdminViewUser = () => {
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteID, setDeleteID] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");
    const [apiData, setApiData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [manualSearchQuery, setManualSearchQuery] = useState("");
    const usersPerPage = 10;

    useEffect(() => {
        setCurrentPage(1);
    }, [filteredData]);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = filteredData && filteredData.slice(indexOfFirstUser, indexOfLastUser);

    const totalPages = Math.ceil(filteredData.length / usersPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    useEffect(() => {
        async function fetchData() {
            try {
                const result = await userapi();
                setApiData(result);
                setFilteredData(result);
            } catch (error) {
                toast.error("Error");
            }
        }
        fetchData();
    }, []);


    const navigate = useNavigate();

    const handleEdit = (actionType, userId) => {
        if (actionType === "add") {
            navigate("/AdminAddUser", { state: { actionType } });
        } else if (actionType === "edit") {
            navigate("/AdminAddUser", { state: { actionType, userId } });
        }
    };
    const AssignTrainingPlan = () => {
        navigate("/AdminAssignTrainingPlan");
    };

    const toggleDeleteModal = (index) => {
        setDeleteID(index);
        setShowDeleteModal(!showDeleteModal);
    };

    const handleDelete = async () => {
        try {
            const deletedUserId = deleteID;
            await deleteuser(deletedUserId);
            const updatedApiData = apiData.filter((user) => user.id !== deletedUserId);
            setApiData(updatedApiData);

            const updatedFilteredUsers = updatedApiData.filter((user) =>
                user.name.toLowerCase().includes(searchQuery.toLowerCase())
            );
            setFilteredData(updatedFilteredUsers);
        } catch (error) {
            toast.error("Error");
        }
        setShowDeleteModal(false);
    };

    const handleSearch = () => {
        const query = manualSearchQuery.trim();
        setSearchQuery(query);
        const filteredUsers = apiData.filter((user) =>
            user.name.toLowerCase().includes(query.toLowerCase())
        );
        setFilteredData(filteredUsers);
    };

    useEffect(() => {
        if (manualSearchQuery === "") {
            setFilteredData(apiData);
        }
    }, [manualSearchQuery, apiData]);

    return (
        <div style={{ marginTop: "15px" }}>
            <ToastContainer />
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "15px" }}>
                    <h4 className="title-lg font-xl" style={{ marginTop: "12px" }}>Users</h4>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "400px" }}>
                        <button
                            onClick={() => handleEdit("add")}
                            className="primaryBlue font-md"
                            style={{ width: "100%", height: "50px", marginRight: "10px", marginTop: "0px" }}
                        >
                            Add new user
                        </button>
                        <button
                            onClick={() => AssignTrainingPlan()}
                            className="primaryBlue font-md"
                            style={{ width: "100%", height: "50px", marginTop: "0px" }}
                        >
                            Assign TP
                        </button>
                    </div>
                </div>
                <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
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
            </div>
            <Row>
                <Col lg="12">
                    <Card style={{ marginTop: "15px" }}>
                        <CardBody className="caliber-font">
                            <Table >
                                <thead>
                                    <tr style={{ borderBottom: "1px solid #ddd" }}>
                                        <th>#</th>
                                        <th>
                                            <div className="table-left">Name</div>
                                        </th>
                                        <th>
                                            <div className="table-head-left">Email</div>
                                        </th>
                                        <th>
                                            <div className="table-left">Actions</div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentUsers.map((user, i) => (
                                        <tr key={user.id} style={{ borderBottom: "1px solid #ddd" }}>
                                            <th scope="row">{indexOfFirstUser + i + 1}</th>
                                            <td style={{ paddin: "5px" }}>{user.name}</td>
                                            <td style={{ padding: "5px" }}>{user.email}</td>
                                            {
                                                user.fkRoleId === 1 ?
                                                    <td style={{ display: "flex", padding: "5px" }}>
                                                        <Button
                                                            onClick={() => handleEdit("edit", user.id)}
                                                            color="primary"
                                                            className="me-2"
                                                        >
                                                            <PencilFill />
                                                        </Button>
                                                        <Button
                                                            onClick={() => toggleDeleteModal(user.id)}
                                                            color="danger"
                                                        >
                                                            <TrashFill />
                                                        </Button>
                                                    </td>
                                                    :
                                                    <p style={{ padding: "15px" }}></p>
                                            }
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                            <div className="pagination" style={{ marginTop: "5px" }}>
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <Button
                                        key={index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                        color={currentPage === index + 1 ? "primary" : "secondary"}
                                    >
                                        {index + 1}
                                    </Button>
                                ))}
                            </div>
                        </CardBody>
                    </Card>
                </Col>
            </Row>
            <Modal isOpen={showDeleteModal} toggle={toggleDeleteModal}>
                <ModalHeader toggle={toggleDeleteModal}>Delete User</ModalHeader>
                <ModalBody>Are you sure you want to delete this User?</ModalBody>
                <ModalFooter>
                    <Button color="danger" onClick={handleDelete}>
                        Delete
                    </Button>
                    <Button color="secondary" onClick={toggleDeleteModal}>
                        Cancel
                    </Button>
                </ModalFooter>
            </Modal>
        </div>
    );
};

export default AdminViewUser;
