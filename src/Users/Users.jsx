import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useEffect, useState } from "react";
import axios from "axios";
import { Dialog } from "primereact/dialog";
import ViewUsers from "./ViewUsers";
import AddUser from "./AddUser";
import EditUser from "./EditUser";
import { ConfirmDialog } from "primereact/confirmdialog";
import { confirmDialog } from "primereact/confirmdialog";
import { toast } from "react-toastify";

const Users = () => {
  const [users, setUsersList] = useState([]);
  const [showViewMode, setShowViewMode] = useState(false);
  const [showAddMode, setShowAddMode] = useState(false);
  const [showEditMode, setShowEditMode] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    getAllUsers();
  }, []);

  const getAllUsers = async () => {
    try {
      const response = await axios.get("http://localhost:3000/users");
      if (response) {
        setUsersList(response.data);
      }
    } catch (e) {
      console.log(e);
    }
  };

  const actionsTemplate = (rowDate) => {
    return (
      <div className="actions-btns">
        <button
          className="btn btn-success"
          onClick={() => {
            setSelectedUserId(rowDate.id);
            setShowViewMode(true);
          }}
        >
          <i className="pi pi-eye"></i>
        </button>
        <button
          className="btn btn-primary"
          onClick={() => {
            setSelectedUserId(rowDate.id);
            setShowEditMode(true);
          }}
        >
          <i className="pi pi-file-edit"></i>
        </button>
        <button
          className="btn btn-danger"
          onClick={() => deleteUserConfirm(rowDate.id)}
        >
          <i className="pi pi-trash"></i>
        </button>
      </div>
    );
  };

  const deleteUserConfirm = (userId) => {
    confirmDialog({
      message: "Are you sure you want to delete this user?",
      header: "Confirmation",
      icon: "pi pi-trash",
      accept: () => deleteUser(userId),
    });
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        "http://localhost:3000/users/" + userId
      );
      if (response) {
        getAllUsers();
        toast.success("User deleted successfully");
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="container">
      <div className="users-page">
        <h1>Users Dashboard</h1>

        <div className="users-list">
          <div className="addNewUser">
            <button
              className="btn btn-success"
              onClick={() => setShowAddMode(true)}
            >
              Add New User <i className="pi pi-plus"></i>
            </button>
          </div>
          <DataTable value={users}>
            <Column field="id" header="ID"></Column>
            <Column field="name" header="Name"></Column>
            <Column field="username" header="Username"></Column>
            <Column field="email" header="Email"></Column>
            <Column field="phone" header="Phone"></Column>
            <Column field="website" header="Website"></Column>
            <Column header="Actions" body={actionsTemplate}></Column>
          </DataTable>
        </div>
      </div>
      <Dialog
        header="View User Data"
        visible={showViewMode}
        style={{ width: "70vw" }}
        onHide={() => setShowViewMode(false)}
      >
        <ViewUsers userId={selectedUserId} />
      </Dialog>

      <Dialog
        header="Add New User"
        visible={showAddMode}
        style={{ width: "70vw" }}
        onHide={() => setShowAddMode(false)}
      >
        <AddUser
          setUserAdded={() => {
            setShowAddMode(false);
            getAllUsers();
          }}
        />
      </Dialog>

      <Dialog
        header="Edit Exist User"
        visible={showEditMode}
        style={{ width: "70vw" }}
        onHide={() => setShowEditMode(false)}
      >
        <EditUser
          userId={selectedUserId}
          setUserEdited={() => {
            setShowEditMode(false);
            getAllUsers();
          }}
        />
      </Dialog>

      <ConfirmDialog />
    </div>
  );
};

export default Users;
