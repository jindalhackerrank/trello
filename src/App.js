import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import WrapperList from "./WrapperList";
import AssignUser from "./AssignUser";

function App() {
  const LabelItem = (listItem) => <div>{listItem.text}</div>;
  const Label = WrapperList("Label Item", LabelItem, "Labels");
  const ListItem = WrapperList("List Item", Label, "ListItems", <AssignUser />);
  const List = WrapperList("List", ListItem, "Lists",null,true,true);
  const Board = WrapperList("Board", List, "Boards");
  return (
    <div className="App">
      <Board />
    </div>
  );
}

export default App;
