import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { Table } from "@mui/material";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { designation, deleteDesignation } from "../../api/user";
import { useNavigate } from "react-router";
import { Search } from 'react-bootstrap-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Common/Styles.css';

const AdminViewDesignation = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [apiData, setApiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [manualSearchQuery, setManualSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await designation();
        setApiData(result);
        setFilteredData(result);
      } catch (error) {
        toast.error("Error");
      }
    }
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleEdit = (actionType, designationId) => {
    if (actionType === "add") {
      navigate("/AdminAddDesignation", { state: { actionType } });
    } else if (actionType === "edit") {
      navigate("/AdminAddDesignation", { state: { actionType, designationId } });
    }
  };

  const toggleDeleteModal = (index) => {
    setDeleteID(index);
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDelete = async () => {
    try {
      const deletedDesignationId = deleteID;
      await deleteDesignation(deletedDesignationId);
      const updatedApiData = apiData.filter((designation) => designation.id !== deletedDesignationId);
      setApiData(updatedApiData);
      const updatedFilteredDesignations = updatedApiData.filter((designation) =>
        designation.DesignationName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(updatedFilteredDesignations);
    } catch (error) {
    }
    setShowDeleteModal(false);
  };

  const handleSearch = () => {
    const query = manualSearchQuery.trim();
    setSearchQuery(query);
    const filteredDesignations = apiData.filter((designation) =>
      designation.designationName && designation.designationName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredDesignations);
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
          <h4 className="title-lg font-xl" style={{ marginTop: "12px" }}>Designations</h4>
          <div style={{ display: "flex", justifyContent: "space-between", width: "200px" }}>
            <button
              onClick={() => handleEdit("add")}
              className="primaryBlue font-md"
              style={{ width: "100%", height: "50px", marginTop: "0px" }}
            >
              Add new designation
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
              <Table>
                <thead>
                  <tr style={{ borderBottom: "1px solid #ddd" }}>
                  <th>#</th>
                    <th>
                      <div className="table-left">Designation</div>
                    </th>
                    <th>
                      <div className="table-head-left-margin">Description</div>
                    </th>
                    <th>
                      <div className="table-left">Actions</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredData.map((designation, i) => (
                    <tr key={designation.id} style={{ borderBottom: "1px solid #ddd" }}>
                      <th style={{ padding: "5px" }} >
                        <div>{i + 1}</div>
                      </th>
                      <td style={{ padding: "5px" }} >
                        <div className="table-left">{designation.designationName}</div>
                      </td>
                      <td style={{ padding: "5px" }} >
                        <div className="table-left">{designation.description}</div>
                      </td>
                      <td style={{ display: "flex", padding: "5px" }}>
                        <Button
                          onClick={() => handleEdit("edit", designation.id)}
                          color="primary"
                          className="me-2"
                        >
                          <PencilFill />
                        </Button>
                        <Button
                          onClick={() => toggleDeleteModal(designation.id)}
                          color="danger"
                        >
                          <TrashFill />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Col>
      </Row>
      <Modal isOpen={showDeleteModal} toggle={toggleDeleteModal}>
        <ModalHeader toggle={toggleDeleteModal}>Delete Designation</ModalHeader>
        <ModalBody>Are you sure you want to delete this Designation?</ModalBody>
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

export default AdminViewDesignation;
