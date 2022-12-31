import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.expense_type}</td>
      <td>{contact.expense_desc}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.expense_id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;