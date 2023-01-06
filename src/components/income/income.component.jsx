import React, { useState, Fragment,useEffect } from "react";
import { nanoid } from "nanoid";
import "./income.styles.css";
import ReadOnlyRow from "./readOnlyRow.component.jsx";
import EditableRow from "./editableRow.component.jsx";
import Axios from "axios";

const Income = () => {

const user_id = localStorage.getItem("user_id");
  const [contacts, setContacts] = useState([]);
  const [addFormData, setAddFormData] = useState({
    income_name: "",
    income_amount: "",
    uid: user_id,
  });


  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      await Axios.post(`http://localhost:8080/expense_track/income`, {
        id: user_id
      }).then(
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
    income_name: "",
    income_amount: "",
    uid: user_id,
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
      income_id: nanoid(),
      income_name: addFormData.income_name,
      income_amount: addFormData.income_amount,
      uid: user_id,
    };
    const newContacts = [...contacts, newContact];
    setContacts(newContacts);
    console.log(newContacts);
    Axios.post(`http://localhost:8080/expense_track/income/${user_id}`, {
        income_id: 0,
        income_name: addFormData.income_name,
        income_amount: addFormData.income_amount,
        uid: user_id,
    }).then((response) => {
      console.log(response);
      if (response.data === "Expected expense already exists") alert(response.data);
      else alert("Expected expense registered succesfully");
    });
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();

    const editedContact = {
      income_id: editContactId,
      income_name: editFormData.income_name,
      income_amount: editFormData.income_amount,
    };

    const newContacts = [...contacts];

    const index = contacts.findIndex((contact) => contact.income_id === editContactId);

    newContacts[index] = editedContact;

    setContacts(newContacts);
    Axios.put(`http://localhost:8080/expense_track/expense_type/${user_id}`, {
        income_id: editContactId,
        income_name: editFormData.income_name,
        income_amount: editFormData.income_amount,
    }).then((response) => {
      console.log(response);
      if (response.data === "User already exists") alert(response.data);
      else alert("User updated succesfully");
    });
    setEditContactId(null);
  };

  const handleEditClick = (event, contact) => {
    event.preventDefault();
    setEditContactId(contact.income_id);

    const formValues = {
        income_name: contact.income_name,
        income_amount: contact.income_amount,
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

    Axios.delete(`http://localhost:8080/expense_track/income/${user_id}/${contactId}`).then(
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
              <th>income_name</th>
              <th>Expense_amount</th>
            </tr>
          </thead>
          <tbody>
            {contactss.map((contact) => (
              <Fragment>
                {editContactId === contact.income_id ? (
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
          name="income_name"
          required="required"
          placeholder="Enter income name..."
          onChange={handleAddFormChange}
        />
        <input
          type="text"
          name="income_amount"
          required="required"
          placeholder="Enter income amount..."
          onChange={handleAddFormChange}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export {Income};