import React, { useState, Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { appendNewItem, updateListItem } from "./utils";
import GetInput from "./GetInput";

const WrapperList = (listName, ChildElem, title,extraDOM) => {
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
        }

        onEdit(index) {
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
            appendNewItem(this.state.list, { text: name, list: [] }, (list) => {
                this.setState({ list: list, mode: null })
            })
        }

        onDelete(index){
            let l = JSON.parse(JSON.stringify(this.state.list));
            l.splice(index,1);
            this.setState({list:l});
        }

        render() {
            return (
                <div className="App">
                    {title}
                    {this.state.mode === "create" ? <GetInput placeholder={`${listName} name`} onDone={this.onAdd} /> : <div onClick={() => this.setState({ mode: "create" })}>{`Add new ${listName}`}</div>}
                    <ul>
                        {this.state.list.map((listItem, index) => <li key={listItem.id} className="listItem">
                            {this.state.editMode.indexOf(index) === -1 ? <div>
                                <div className="bold">{listItem.text}</div>
                                <div onClick={() => this.onEdit(index)}>Edit</div>
                                <div onClick={()=>this.onDelete(index)}>Delete</div>
                                {extraDOM}
                            </div> : <GetInput initialValue={listItem.text} placeholder={`${listName} name`}s onDone={(value) => this.saveEdit(index, value, listItem)} />}
                            <div>
                                <ChildElem list={listItem} />
                            </div>
                        </li>)}
                    </ul>
                </div>
            );
        }
    }
    return wrapperList;
}

export default WrapperList;
