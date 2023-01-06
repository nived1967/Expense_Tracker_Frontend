import React, { useState, Fragment,useEffect } from "react";
import { nanoid } from "nanoid";
import "./expenses.styles.css";
import ReadOnlyRow from "./readOnlyRow.component.jsx";
import EditableRow from "./editableRow.component.jsx";
import Axios from "axios";

const Expense = () => {

const user_id = localStorage.getItem("user_id");
  const [contacts, setContacts] = useState([]);
  const [addFormData, setAddFormData] = useState({
    expense_name: "",
    expense_amount: "",
    user_id: user_id,
  });


  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      await Axios.get(`http://localhost:8080/expense_track/expense/${user_id}`).then(
      (response) => {
        if(response.data.length > 0)
        setContacts(response.data);
      }
    );
    }
    fetchData()
      .catch(console.error);
}, []);

  const [editFormData, setEditFormData] = useState({
    expense_name: "",
    expense_amount: "",
    user_id: user_id,
  });

  const [editContactId, setEditContactId] = useState(null);

  const handleAddFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;
    const newFormData = { ...addFormData };
   
    newFormData[fieldName] = fieldValue;
   
    setAddFormData(newFormData);
  };

  const handleEditFormChange = (event) => {
    event.preventDefault();

    const fieldName = event.target.getAttribute("name");
    const fieldValue = event.target.value;

    const newFormData = { ...editFormData };
    newFormData[fieldName] = fieldValue;

    setEditFormData(newFormData);
  };

  const handleAddFormSubmit = (event) => {
    event.preventDefault();
    console.log("Hello" + user_id);
    const newContact = {
      expense_id: nanoid(),
      expense_name: addFormData.expense_name,
      expense_amount: addFormData.expense_amount,
      user_id: user_id,
    };
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
    console.log(newContacts);
    Axios.post(`http://localhost:8080/expense_track/expense/${user_id}`, {
        expense_id: 0,
        expense_name: addFormData.expense_name,
        expense_amount: addFormData.expense_amount,
        user_id: user_id,
    }).then((response) => {
      console.log(response);
      if (response.data === "Expected expense already exists") alert(response.data);
      else alert("Expected expense registered succesfully");
    });
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      expense_id: editContactId,
      expense_name: editFormData.expense_name,
      expense_amount: editFormData.expense_amount,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.expense_id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    Axios.put(`http://localhost:8080/expense_track/expense_type/${user_id}`, {
        expense_id: editContactId,
        expense_name: editFormData.expense_name,
        expense_amount: editFormData.expense_amount,
    }).then((response) => {
      console.log(response);
      if (response.data === "User already exists") alert(response.data);
      else alert("User updated succesfully");
    });
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.expense_id);

    const formValues = {
        expense_name: contact.expense_name,
        expense_amount: contact.expense_amount,
    };

    setEditFormData(formValues);
  };

  const handleCancelClick = () => {
    setEditContactId(null);
  };

  const handleDeleteClick = (contactId) => {
    const newContacts = [...contacts];
    console.log(contactId)
    const index = contacts.findIndex((contact) => contact.expense_id === contactId);

    newContacts.splice(index, 1);
    console.log(index)
    setContacts(newContacts);

    Axios.delete(`http://localhost:8080/expense_track/expense/${user_id}/${contactId}`).then(
        (response) => {
            console.log(response);
            if (response.data === "User already exists") alert(response.data);
            else alert("User deleted succesfully");
            }
        );
  };

  const contactss = Object.values(contacts);
  return (
    <div className="app-container">
      <form onSubmit={handleEditFormSubmit}>
        <table>
          <thead>
            <tr>
              <th>Expense_name</th>
              <th>Expense_amount</th>
            </tr>
          </thead>
          <tbody>
            {contactss.map((contact) => (
              <Fragment>
                {editContactId === contact.expense_id ? (
                  <EditableRow
                    editFormData={editFormData}
                    handleEditFormChange={handleEditFormChange}
                    handleCancelClick={handleCancelClick}
                  />
                ) : (
                  <ReadOnlyRow
                    contact={contact}
                    handleEditClick={handleEditClick}
                    handleDeleteClick={handleDeleteClick}
                  />
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </form>

      <h2>Add an Expense Type</h2>
      <form onSubmit={handleAddFormSubmit}>
        <input
          type="text"
          name="expense_name"
          required="required"
          placeholder="Enter expense name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="expense_amount"
          required="required"
          placeholder="Enter expected amount..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export {Expense};