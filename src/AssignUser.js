import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import GetInput from "./GetInput";

function AssignUser() {
    const [selectedUser, setSelectedUser] = useState(false);
    let users = localStorage.getItem("users") || "[]";
    users = JSON.parse(users);
    return (
        <div className="AssignUser">
            <div className="bold">User in list item</div>
            <div className="bold" onClick={() => setSelectedUser(false)}>{selectedUser || `Assign User`}</div>
            {!selectedUser ? <div>
                <GetInput placeholder={`Add user`} onDone={(value) => {
                    users.push(value);
                    localStorage.setItem("users", JSON.stringify(users));
                    setSelectedUser(value);
                }} />
                <ul>
                    {users.map(value => <li onClick={() => {
                        setSelectedUser(value)
                    }}>{value}</li>)}
                </ul>
            </div> : ""}
        </div>
    );
}

export default AssignUser;
