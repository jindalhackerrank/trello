import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import List from "./List";
import { appendNewItem } from "./utils";

function Board() {
    const [lists, setLists] = useState([]);
    return (
        <div className="App">
            <div onClick={() => {
                appendNewItem(lists, {
                    name: "New list",
                    items: []
                }, setLists)
            }}>Add new List</div>
            <ul>
                {lists.map(list => <li key={list.id}>
                    <List list={list} />
                </li>)}
            </ul>
        </div>
    );
}

export default Board;
