import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css"; // Import the CSS file

const API_URL =
  "https://97d29859-841c-4ac1-a8d4-1310ecbdc52d-00-2kki7uj0cyy36.pike.replit.dev/items";

function App() {
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState("");
  const [editItemId, setEditItemId] = useState(null);
  const [editItemName, setEditItemName] = useState("");

  useEffect(() => {
    axios.get(API_URL).then((response) => {
      setItems(response.data);
    });
  }, []);

  const addItem = () => {
    if (!newItem.trim()) {
      alert("Item name cannot be empty");
      return;
    }

    axios.post(API_URL, { name: newItem }).then((response) => {
      setItems([...items, response.data]);
      setNewItem("");
    });
  };

  const updateItem = (id) => {
    axios.put(`${API_URL}/${id}`, { name: editItemName }).then((response) => {
      setItems(items.map((item) => (item._id === id ? response.data : item)));
      setEditItemId(null);
      setEditItemName("");
    });
  };

  const deleteItem = (id) => {
    axios.delete(`${API_URL}/${id}`).then(() => {
      setItems(items.filter((item) => item._id !== id));
    });
  };

  return (
    <div className="app-container">
      <h1>Simple CRUD Student ID Management</h1>

      <h2>Add Student</h2>
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
      />
      <button onClick={addItem}>Add</button>

      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Student Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {items.map((item) => (
            <tr key={item._id}>
              <td>{item._id}</td>
              <td>
                {editItemId === item._id ? (
                  <input
                    type="text"
                    value={editItemName}
                    onChange={(e) => setEditItemName(e.target.value)}
                  />
                ) : (
                  item.name
                )}
              </td>
              <td>
                {editItemId === item._id ? (
                  <button onClick={() => updateItem(item._id)}>Save</button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setEditItemId(item._id);
                        setEditItemName(item.name);
                      }}
                    >
                      Edit
                    </button>{" "}
                    <button onClick={() => deleteItem(item._id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
