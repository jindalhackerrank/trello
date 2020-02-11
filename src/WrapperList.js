import React, { useState, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { appendNewItem, updateListItem } from "./utils";
import GetInput from "./GetInput";

const WrapperList = (listName, ChildElem, title, extraDOM, draggable = false, droppable = false) => {
    class wrapperList extends Component {
        constructor(props) {
            super(props);
            this.state = {
                list: [],
                mode: null,
                editMode: []
            }
            this.onAdd = this.onAdd.bind(this);
            this.onEdit = this.onEdit.bind(this);
            this.saveEdit = this.saveEdit.bind(this);
            this.onDrag = this.onDrag.bind(this);
            this.onDrop = this.onDrop.bind(this);
        }

        onEdit(index, e) {
            this.stopPropagation(e);
            let edits = this.state.editMode.slice();
            edits.push(index);
            this.setState({ editMode: edits });
        }

        saveEdit(index, value, listItem) {
            updateListItem(this.state.list, index, { text: value, list: listItem.list }, (list) => {
                let edits = this.state.editMode.slice();
                edits.splice(index, 1);
                this.setState({ list: list, editMode: edits })
            })
        }

        onAdd(name) {
            appendNewItem(this.state.list, typeof name === "object" ? name : { text: name, list: [] }, (list) => {
                this.setState({ list: list, mode: null })
            })
        }

        onDelete(index, e) {
            if (e) this.stopPropagation(e);
            let l = JSON.parse(JSON.stringify(this.state.list));
            l.splice(index, 1);
            this.setState({ list: l });
        }

        onDrag(ev, obj, index) {
            this.stopPropagation(ev);
            if (!window.dragData) {
                window.dragData = obj;
                window.onDrop = this.onDelete.bind(this, index)
            }

        }

        onDrop(ev) {
            this.stopPropagation(ev);
            var data = window.dragData;
            if (window.onDrop) {
                this.onAdd(window.dragData);
                delete window.dragData;
                window.onDrop();
                delete window.onDrop;
            }
        }

        stopPropagation(ev) {
            ev.preventDefault();
            ev.cancelBubble = true;
        }

        render() {
            return (
                <div className="App">
                    {`${title}(${this.state.list.length})`}
                    <ul onDrop={this.onDrop} onDragOver={this.stopPropagation}>
                        {this.state.list.map((listItem, index) => <li key={listItem.id} className="listItem">
                            {this.state.editMode.indexOf(index) === -1 ? <div>
                                <div className="bold">{listItem.text}</div>
                                <div onClick={(e) => this.onEdit(index, e)}>Edit</div>
                                <div onClick={(e) => this.onDelete(index, e)}>Delete</div>
                                {extraDOM}
                            </div> : <GetInput initialValue={listItem.text} placeholder={`${listName} name`} s onDone={(value) => this.saveEdit(index, value, listItem)} />}
                            <div draggable={draggable} onDrag={(e) => this.onDrag(e, listItem, index)}>
                                <ChildElem list={listItem} />
                            </div>
                        </li>)}
                    </ul>
                    {this.state.mode === "create" ? <GetInput placeholder={`${listName} name`} onDone={this.onAdd} /> : <div onClick={() => this.setState({ mode: "create" })}>{`Add new ${listName}`}</div>}
                </div>
            );
        }
    }
    return wrapperList;
}

export default WrapperList;
