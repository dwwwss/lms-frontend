import React, { useState, useEffect } from "react";
import { Button, Card, CardBody, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Input } from "reactstrap";
import { Table } from "@mui/material";
import { PencilFill, TrashFill } from "react-bootstrap-icons";
import { role, deleteRole } from "../../api/user";
import { useNavigate } from "react-router";
import { Search } from 'react-bootstrap-icons';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../Common/Styles.css';

const AdminViewRole = () => {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteID, setDeleteID] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [apiData, setApiData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [manualSearchQuery, setManualSearchQuery] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await role();
        setApiData(result);
        setFilteredData(result);
      } catch (error) {
        toast.error("Error");
      }
    }
    fetchData();
  }, []);

  const navigate = useNavigate();

  const handleEdit = (actionType, roleId) => {
    if (actionType === "add") {
      navigate("/AdminAddRole", { state: { actionType } });
    } else if (actionType === "edit") {
      navigate("/AdminAddRole", { state: { actionType, roleId } });
    }
  };

  const toggleDeleteModal = (index) => {
    setDeleteID(index);
    setShowDeleteModal(!showDeleteModal);
  };

  const handleDelete = async () => {
    try {
      const deletedRoleId = deleteID;
      await deleteRole(deletedRoleId);
      const updatedApiData = apiData.filter((role) => role.id !== deletedRoleId);
      setApiData(updatedApiData);
      const updatedFilteredRoles = updatedApiData.filter((role) =>
        role.DesignationName.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(updatedFilteredRoles);
    } catch (error) { }
    setShowDeleteModal(false);
  };

  const handleSearch = () => {
    const query = manualSearchQuery.trim();
    setSearchQuery(query);
    const filteredRoles = apiData.filter((role) =>
      role.roleName.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredData(filteredRoles);
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
          <h4 className="title-lg font-xl" style={{ marginTop: "12px" }}>Roles</h4>
          <div style={{ display: "flex", justifyContent: "space-between", width: "200px" }}>
            <button
              onClick={() => handleEdit("add")}
              className="primaryBlue font-md"
              style={{ width: "100%", height: "50px", marginRight: "10px", marginTop: "0px" }}
            >
              Add new role
            </button>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Input
            style={{ flex: "1", height: "40px", marginRight: "10px" }}
            type="text"
            name="search"
            id="search"
            placeholder="Search by designation name"
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
                      <div className="table-left">Role</div>
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
                  {filteredData.map((role, i) => (
                    <tr key={role.id} style={{ borderBottom: "1px solid #ddd" }}>
                      <th scope="row">{i + 1}</th>
                      <td style={{ paddin: "5px" }}>
                        <div className="table-left">{role.roleName}</div>
                      </td>
                      <td style={{ paddin: "5px" }}>
                        <div className="table-left">{role.description}</div>
                      </td>
                      <td style={{ display: "flex", padding: "5px" }}>
                        <Button
                          onClick={() => handleEdit("edit", role.id)}
                          color="primary"
                          className="me-2"
                        >
                          <PencilFill />
                        </Button>
                        <Button
                          onClick={() => toggleDeleteModal(role.id)}
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
        <ModalHeader toggle={toggleDeleteModal}>Delete Role</ModalHeader>
        <ModalBody>Are you sure you want to delete this Role?</ModalBody>
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

export default AdminViewRole;
