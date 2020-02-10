import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { appendNewItem } from "./utils";

function GetInput({ initialValue = "", placeholder, onDone }) {
    const [value, setvalue] = useState(initialValue);
    return (
        <div className="App">
            <input placeholder={placeholder} onChange={(e) => {
                setvalue(e.target.value);
            }} value={value} />
            <div onClick={() => onDone(value)}>Done</div>
        </div>
    );
}

export default GetInput;
