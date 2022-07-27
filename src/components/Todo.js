import React, { useState, useEffect } from "react";
import "./Todo.css";
import { FaPlus, FaTrashAlt, FaEdit } from "react-icons/fa";
import { v4 as uuidv4 } from "uuid";

const getLocaldata = () => {
  const list = localStorage.getItem("mytodolist");
  if (list) {
    return JSON.parse(list);
  } else {
    return [];
  }
};
const Todo = () => {
  const [inputData, setInputData] = useState("");

  const myNewInputdata = {
    id: uuidv4(),
    name: inputData,
  };

  const [buttonData, setButtonData] = useState(getLocaldata());
  const [editItem, setEditItem] = useState("");
  const [toggleButton, settoggleButton] = useState(false);

  const inputHandler = (event) => {
    setInputData(event.target.value);
  };
  const addbtnHandler = () => {
    if (!inputData) {
      alert("Please Add Something that You Want to Add");
    } else if (inputData && toggleButton) {
      setButtonData(
        buttonData.map((curElem) => {
          if (curElem.id === editItem) {
            return { ...curElem, name: inputData };
          }
          return curElem;
        })
      );
      setInputData("");
      setEditItem();
      settoggleButton(false);
    } else {
      setButtonData([...buttonData, myNewInputdata]);
      setInputData("");
    }
  };
  const editHandler = (index) => {
    const itemEdited = buttonData.find((curElem) => {
      return curElem.id === index;
    });
    setInputData(itemEdited.name);
    setEditItem(index);
    settoggleButton(true);
  };
  const deleteHandler = (index) => {
    if (window.confirm("Are You Sure Want to Delete")) {
      const updatedItems = buttonData.filter((curElem) => {
        return curElem.id !== index;
      });

      setButtonData(updatedItems);
    }
  };

  const removeAllHandler = () => {
    setButtonData([]);
  };

  useEffect(() => {
    localStorage.setItem("mytodolist", JSON.stringify(buttonData));
  }, [buttonData]);
  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="./images/todo.jpg" alt="" />
            <figcaption>Add Your Todo Here</figcaption>
          </figure>
          <div className="addIems">
            <input
              type="text"
              placeholder="✍️Add Todo"
              className="form-control"
              value={inputData}
              onChange={inputHandler}
            />
            {toggleButton ? (
              <FaEdit className="fa fa-edit add-btn" onClick={addbtnHandler} />
            ) : (
              <FaPlus className="fa fa-plus add-btn" onClick={addbtnHandler} />
            )}
          </div>
          <div className="showItes">
            {buttonData.map((curElem) => {
              return (
                <div className="eachItem" key={curElem.id}>
                  <h3>{curElem.name}</h3>
                  <div className="todo-btn">
                    <FaEdit
                      className="fa fa-edit add-btn"
                      onClick={() => editHandler(curElem.id)}
                    />
                    <FaTrashAlt
                      className="fa fa-trash-alt add-btn"
                      onClick={() => deleteHandler(curElem.id)}
                    />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItem">
            <button className="btn" onClick={removeAllHandler}>
              <span>Remove All</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todo;
