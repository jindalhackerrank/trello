import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import Board from "./Board";
import WrapperList from "./WrapperList";
import { appendNewItem } from "./utils";
import AssignUser from "./AssignUser";
import Home from "./Home";


function App() {
  return (
    <div className="App">
      <Home users={users} setUsers={setUsers}/>
    </div>
  );
}

export default App;
