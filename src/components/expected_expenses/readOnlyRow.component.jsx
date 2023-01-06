import React from "react";

const ReadOnlyRow = ({ contact, handleEditClick, handleDeleteClick }) => {
  return (
    <tr>
      <td>{contact.expense_name}</td>
      <td>{contact.expected_amount}</td>
      <td>
        <button
          type="button"
          onClick={(event) => handleEditClick(event, contact)}
        >
          Edit
        </button>
        <button type="button" onClick={() => handleDeleteClick(contact.expenses_id)}>
          Delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;