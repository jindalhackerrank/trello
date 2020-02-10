import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import GetInput from "./GetInput";
import { appendNewItem, updateListItem } from "./utils";

function List({ list }) {
    const [items, setItems] = useState(list.items);
    const [name, setName] = useState(list.name);
    const [mode, setMode] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const onAdd = (name) => {
        if (!name) {
            alert("item name cannot be blank");
            return;
        } else {
            appendNewItem(items, {
                text: name,
            }, (list) => {
                setItems(list);
                setMode(null);
            })
        }
    }

    return (
        <div className="App">
            <div>{name}</div>
            <div onClick={() => setMode("create")}>Add new item</div>
            {mode === "create" ? <GetInput placeholder="item name" onDone={onAdd} /> : ""}
            <ul>
                {items.map((item, index) => <li key={item.id}>
                    {editItem === index ? <div>
                        <GetInput placeholder="item name" onDone={(text) => {
                            items[index].text = text;
                            updateListItem(items, index, item, setItems)
                        }} initialValue={item.text} />
                    </div> : <div>
                            <div>{item.text}</div>
                            <div onClick={() => {
                                setMode("edit")
                                setEditItem(index);
                            }}>Edit</div>
                            <div>Delete</div>
                        </div>}

                </li>)}
            </ul>
        </div>
    );
}

export default List;
