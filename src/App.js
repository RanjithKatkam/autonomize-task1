import React, { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import "./App.css";

const App = () => {
    const [todosList, setTodosList] = useState([]);
    const [currentTodoId, setCurrentTodoId] = useState();
    const [inputValue, setInputValue] = useState("");
    const [method, setMethod] = useState(true);

    const onClickAddTodo = () => {
        let value = 1;
        let statement = "";
        const inputs = inputValue.split(" ");
        for (let i = 0; i < inputs.length; i++) {
            if (!isNaN(parseInt(inputs[i]))) {
                value = parseInt(inputs[i]);
            } else {
                statement = statement + inputs[i] + " ";
            }
        }
        for (let j = 0; j < value; j++) {
            if (inputValue.length > 0) {
                const id1 = Math.floor(Math.random() * 100);
                const id2 = Math.floor(Math.random() * 100);
                setTodosList((prevTodos) => [
                    ...prevTodos,
                    {
                        id: inputValue + id1 + id2,
                        name: statement,
                        updated: 0,
                    },
                ]);
                setInputValue("");
            }
        }
    };

    const onClickUpdate = (i, name) => {
        setInputValue(name);
        setMethod(false);
        setCurrentTodoId(i);
    };
    const onClickUpdateTodo = () => {
        setTodosList((prevTodos) =>
            prevTodos.map((todo) => (todo.id === currentTodoId ? { ...todo, name: inputValue, updated: todo.updated + 1 } : todo))
        );
        setMethod(true);
        setInputValue("");
    };

    const onClickDeleteTodo = (id) => {
        const sorted = todosList.filter((each) => each.id !== id);
        setTodosList(sorted);
    };

    return (
        <div className="main-container">
            <div className="container">
                <h1>Day Goals</h1>
                <input
                    type="text"
                    className="input"
                    placeholder="Enter todo here"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                {method ? (
                    <button className="button" onClick={onClickAddTodo}>
                        Add Todo
                    </button>
                ) : (
                    <button className="button" onClick={onClickUpdateTodo}>
                        Update Todo
                    </button>
                )}
                <ul className="items-container">
                    {todosList?.map((each, index) => (
                        <li className="listitems" key={index}>
                            <p className="item">{`${each.name} (updated ${each.updated} times)`}</p>
                            <div className="icons">
                                <FaPencilAlt className="update" onClick={() => onClickUpdate(each.id, each.name)} />
                                <MdDelete className="delete" onClick={() => onClickDeleteTodo(each.id)} />
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default App;
